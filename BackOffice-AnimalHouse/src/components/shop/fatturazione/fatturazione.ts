import $ from "jquery"
import { Modal } from "flowbite";
import { Order } from "../../../model";
import { ENDPOINT } from "../../../utils/const";
import fatturazione_html from "./fatturazione.html?raw"
import { handleFormSubmit, handleRequest } from "../../../utils/requestHandler";

type IProductAppModals = { 
	delete: Modal; 
	order: Modal;
	edit_order: Modal;
}
let app_modals = {} as IProductAppModals

export function renderFatturazione(element: JQuery<HTMLDivElement>) {
	element.html(fatturazione_html)

    app_modals.order = new Modal($('#newOrderModel')[0], {backdrop: "static"})
	app_modals.edit_order = new Modal($('#editOrderModel')[0], {backdrop: "static"})
	app_modals.delete = new Modal($('#deleteOrderModal')[0], {backdrop: "static"})

    $(function () {
		initOrders()
		initNewOrderModal()
		initCloseDeleteModal()
		initCloseNewOrderModal()
		initCloseEditOrderModal()
		initFilterDropdown()
		initSearchBar()
		addRemoveProduct()
	})
}

function initOrders(){
    // Clear products table
	$("tbody").html("")

	fetch(ENDPOINT.ORDERS_LIST, {headers: { 'Authorization': `Bearer ${localStorage.getItem("bo_token")}` }})
		.then((res) => res.json())
		.then((orders) => orders.forEach((order: Order) => {
			var order_tmpl = $($("#order_template").html());
			
			order_tmpl.find(".updateOrderButton").attr("id", `edit_${order._id}`)
			order_tmpl.find(".deleteOrderButton").attr("id", `delete_${order._id}`)
			console.log(order)
			order_tmpl.find("#name").text(order.user.name + " " + order.user.surname)
			order_tmpl.find("#price").text(order.price)
			order_tmpl.find("#date").text(order.date)
			
			$("tbody").append(order_tmpl[0].outerHTML);

			$(`#edit_${order._id}`).on("click", () => openEditProductModal(order))
			$(`#delete_${order._id}`).on("click", () => openDeleteProductModal(order))
		}))
}

function initNewOrderModal(){
	$(".newOrderButton").on("click", () => {
		app_modals.order.toggle()
		$("#orderModalTitle").text("Aggiungi un ordine")
		$("#orderModalSubmitButton").text("Aggiungi")

		$("#newOrderForm #name").val("")
		$("#newOrderForm #surname").val("")
		$("#newOrderForm #quantity").val("")
		$("#newOrderForm #nameProduct").val("")
	
		/*$("#newOrderForm").on("submit", async (event: JQuery.SubmitEvent) => {
			const data = await handleFormSubmit(event, ENDPOINT.ORDER_NEW, "POST", localStorage.getItem("bo_token"))
	
			if (data.error) {
				alert(data.error.message)
			} else {
				app_modals.order.hide()
				initOrders()
				$("#newOrderForm").off("submit")
			}
		})*/
	})
}

function openEditProductModal(order: Order){
	app_modals.edit_order.toggle()

	$("#editOrderModalTitle").text("Modifica Ordine")
	$("#editOrderModalSubmitButton").text("Salva")
	

	$("#editForm #name").val(order.user.name)
	$("#editForm #surname").val(order.user.surname)
	$("#editForm #price").val(product.price)
	$("#editForm #quantity").val(product.quantity)
	$("#editForm #imageURI").val(product.imageURI)
	$("#editForm #giorni").val(product.giorni)
	$("#editForm #description").val(product.description)
	$(`#editForm option[value='${product.category}']`).attr('selected','selected')
	$(`#productImage`).attr("src", product.imageURI)
}

function initCloseDeleteModal(){

}

function initCloseEditOrderModal(){

}

function initCloseNewOrderModal(){
	$(".closeOrderModal").on("click", () => {
		app_modals.order.hide()
		$("#editForm").off("submit")
		$(".buttonInputProduct").off("click")
		$(".removeButton").off("click")
	})
}

function initFilterDropdown(){

}

function initSearchBar(){

}


function openDeleteProductModal(order: Order){

}

function addRemoveProduct(){
	let nameProduct = $(".addNameProduct")
	let quantityProduct = $(".addQuantity")
	let i = 0;

	$(".buttonInputProduct").on("click", () => {
		i++;
		let labelNome = $('<label>').addClass('block mb-2 text-sm font-medium text-gray-900 dark:text-white')
								.attr('for', 'addNameProduct')
								.attr('id', 'addLabelNameProduct'+i)
								.text('Nome del prodotto');

		let inputNome = $('<input>').attr('type', 'text')
									.attr('name', 'addNameProduct'+i)
									.attr('id', 'addNameProduct'+i)
									.addClass('bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500')
									.attr('placeholder', 'Croccantini')
									.prop('required', true);

		let labelQuantity = $('<label>').addClass('block mb-2 text-sm font-medium text-gray-900 dark:text-white')
									.attr('for', 'addQuantity')
									.attr('id', 'addLabelQuantity'+i)
									.text('Quantita');

		let inputQuantity = $('<input>').attr('type', 'text')
									.attr('name', 'addQuantity'+i)
									.attr('id', 'addQuantity'+i)
									.addClass('bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500')
									.attr('placeholder', 'Es: 2')
									.prop('required', true);	
		nameProduct.append(labelNome, inputNome)
		quantityProduct.append(labelQuantity, inputQuantity)
		nameProduct.show()
		quantityProduct.show()
	})

	$(".removeButton").on("click", () => {
		$("#addNameProduct"+i).remove()
		$("#addQuantity"+i).remove()
		$("#addLabelNameProduct"+i).remove()
		$("#addLabelQuantity"+i).remove()
		i--;
	})
}
