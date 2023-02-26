import $ from "jquery"
import { Modal, Dropdown } from "flowbite";
import { Product } from "../../model";
import { ENDPOINT } from "../../utils/const";
import products_html from "./prodotti.html?raw"
import { handleFormSubmit, handleRequest } from "../../utils/requestHandler";

type IProductAppModals = { 
	delete: Modal; 
	product: Modal;
}
let app_modals = {} as IProductAppModals

export function renderProducts(element: JQuery<HTMLDivElement>) {
	element.html(products_html)

	app_modals.product = new Modal($('#productModal')[0], {backdrop: "static"})
	app_modals.delete = new Modal($('#deleteModal')[0], {backdrop: "static"})

	$(function () {
		initProducts()
		initNewProductModal()
		initCloseDeleteModal()
		initCloseProductModal()
		initFilterDropdown()
		initSearchBar()
	})
}

function initProducts() {
	// Clear products table
	$("tbody").html("")

	fetch(ENDPOINT.PRODUCTS_LIST)
		.then((res) => res.json())
		.then((products) => products.forEach((product: Product) => {
			var product_tmpl = $($("#product_template").html());
			
			product_tmpl.find(".updateProductButton").attr("id", `edit_${product._id}`)
			product_tmpl.find(".deleteProductButton").attr("id", `delete_${product._id}`)
			product_tmpl.find("#name").text(product.name)
			product_tmpl.find("#category").text(product.category)
			product_tmpl.find("#price").text(product.price)
			product_tmpl.find("#quantity").text(product.quantity)
			product_tmpl.find("#rating").html(
				"<svg aria-hidden='true' class='w-5 h-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><title>First star</title><path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path></svg>"
				.repeat(product.rating)
				+
				"<svg aria-hidden='true' class='w-5 h-5 text-gray-300 dark:text-gray-500' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><title>Fifth star</title><path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path></svg>"
				.repeat(5 - product.rating)
				)
			
			$("tbody").append(product_tmpl[0].outerHTML);

			$(`#edit_${product._id}`).on("click", () => openEditProductModal(product))
			$(`#delete_${product._id}`).on("click", () => openDeleteProductModal(product, localStorage.getItem("bo_token")))
		}))
}

function initNewProductModal() {
	$(".newProductButton").on("click", () => {
		app_modals.product.toggle()
		$("#productModalTitle").text("Aggiungi un prodotto")
		$("#productModalSubmitButton").text("Aggiungi")

		$("#imageURI").on("input", function() {
			let URL = $(this).val() as string;
			if(URL == ""){
				$("#imageContainer").hide()
			}else{
				$("#imageContainer").show()
				$("#title_img").text("Immagine del prodotto")
				$(`#productImage`).attr("src", URL)
			}
		})

		$("#editForm #name").val("")
		$("#editForm #price").val("")
		$("#editForm #quantity").val("")
		$("#editForm #imageURI").val("")
		$("#editForm #description").val("")
		$(`#editForm option[value='Accessoristica']`).attr('selected','selected')
	
		$("#editForm").on("submit", async (event: JQuery.SubmitEvent) => {
			const data = await handleFormSubmit(event, ENDPOINT.PRODUCTS_NEW, "POST", localStorage.getItem("bo_token"))
	
			if (data.error) {
				alert(data.error.message)
			} else {
				app_modals.product.hide()
				initProducts()
				$("#editForm").off("submit")
			}
		})
	})
}

function openEditProductModal(product: Product) {
	app_modals.product.toggle()
	$("#productModalTitle").text("Edit Product")
	$("#productModalSubmitButton").text("Salva")
	
	$("#title_img").text("Immagine del prodotto")
	$("#imageContainer").show()

	$("#imageURI").on("input", function() {
		let URL = $(this).val() as string;
		$(`#productImage`).attr("src", URL)
	})

	$("#editForm #name").val(product.name)
	$("#editForm #price").val(product.price)
	$("#editForm #quantity").val(product.quantity)
	$("#editForm #imageURI").val(product.imageURI)
	$("#editForm #description").val(product.description)
	$(`#editForm option[value='${product.category}']`).attr('selected','selected')
	$(`#productImage`).attr("src", product.imageURI)

	$("#editForm").attr("action", "PATCH")
	$("#editForm").on("submit", async (event: JQuery.SubmitEvent) => {
		const data = await handleFormSubmit(event, ENDPOINT.PRODUCT(product._id), "PATCH", localStorage.getItem("bo_token"))

		if (data.error) {
			alert(data.error.message)
		} else {
			app_modals.product.hide()
			initProducts()
			$("#editForm").off("submit")
		}
	})
}

function openDeleteProductModal(product: Product, token?: string | null) {
	app_modals.delete.toggle()
	$("#deleteProductButton").on("click", async (event: JQuery.ClickEvent) => {
		const data = await handleRequest(ENDPOINT.PRODUCT(product._id), {
			method: "DELETE",
			headers: token ? { 'Authorization': `Bearer ${token}` } : {},
		})

		if (data.error) {
			alert(data.error.message)
		} else {
			app_modals.delete.hide()
			initProducts()
			$("#deleteProductButton").off("click")
		}
	})
}

function initCloseDeleteModal() {
	$(".closeDeleteProductModal").on("click", () => {
		app_modals.delete.hide()
		$("#deleteProductButton").off("click")
	} )
}

function initCloseProductModal() {
	$(".closeProductModal").on("click", () => {
		app_modals.product.hide()
		$("#editForm").off("submit")
		$("#imageURI").off("input")
		$("#imageContainer").hide()
	})
}

function initFilterDropdown() {
	// Basta creare l'oggetto Dropdown con target e trigger
	const filterDropdown = new Dropdown($('#filterDropdown')[0], $("#filterDropdownButton")[0])

	// Selezioniamo l'elemento con id filterDropdown e aggiungiamo un listener all'evento click
	$('#filterDropdown input[type=checkbox]').on("click", function () {
		let selectedCategories: string[] = [];

		// Selezioniamo tutti gli elementi checkbox all'interno
		$('#filterDropdown input[type=checkbox]').each(function () {
			// Se l'elemento è selezionato, aggiungiamo il valore dell'attributo id all'array selectedCategories
			if ($(this).is(':checked')) {
				selectedCategories.push($(this).attr('id')!);
			}
		});

		// Se non è stata selezionata nessuna categoria, mostriamo tutti i prodotti
		if (selectedCategories.length == 0) {
			$('tbody tr').show();
		} else {
			// Altrimenti nascondiamo tutti i prodotti e mostriamo solo quelli della categoria selezionata
			$('tbody tr').hide();
			$('tbody tr').each(function () {
				if ($.inArray($(this).find('td:nth-child(2)').text(), selectedCategories) !== -1) {
					$(this).show();
				}
			});
		}
	});
}

function initSearchBar(){
	$('#simple-search').on("input", function () {
		const searchTerm = $(this).val() as string;

		if (searchTerm == "") {
			$('tbody tr').show();
		} else {
			// Altrimenti nascondiamo tutti i prodotti e mostriamo solo quelli della categoria selezionata
			$('tbody tr').hide();
			$('tbody tr').each(function () {
				if ($(this).find('th:nth-child(1)').text().toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
					$(this).show();
				}
			});
		}
	});
}