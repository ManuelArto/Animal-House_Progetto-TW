import $ from "jquery"
import { Modal } from "flowbite";
import { Order, Product } from "../../../model";
import { ENDPOINT } from "../../../utils/const";
import fatturazione_html from "./fatturazione.html?raw"
import { handleFormSubmit, handleRequest } from "../../../utils/requestHandler";

type IProductAppModals = { 
	delete: Modal; 
	show_order: Modal;
}
let app_modals = {} as IProductAppModals

export function renderFatturazione(element: JQuery<HTMLDivElement>) {
	element.html(fatturazione_html)

	app_modals.show_order = new Modal($('#showOrderModel')[0], {backdrop: "static"})
	app_modals.delete = new Modal($('#deleteOrderModal')[0], {backdrop: "static"})

    $(async function () {
		initOrders()
		initCloseShowOrderModal()
		initCloseDeleteModal()
		initSearchBar()
	})
}

function initOrders(){
    // Clear products table
	$("tbody").html("")

	fetch(ENDPOINT.ORDERS_LIST, {headers: { 'Authorization': `Bearer ${localStorage.getItem("bo_token")}` }})
		.then((res) => res.json())
		.then((orders) => orders.forEach((order: Order) => {
			var order_tmpl = $($("#order_template").html());
			
			order_tmpl.find(".showOrderButton").attr("id", `show_${order._id}`)
			order_tmpl.find(".deleteOrderButton").attr("id", `delete_${order._id}`)
			order_tmpl.find("#name").text(order.user.name + " " + order.user.surname)
			order_tmpl.find("#price").text(order.price.toFixed(2) + " €")
			order_tmpl.find("#date").text(order.date)
			order_tmpl.find("#time").text(order.time)
			$("tbody").append(order_tmpl[0].outerHTML);

			$(`#show_${order._id}`).on("click", () => openShoworderModal(order))
			$(`#delete_${order._id}`).on("click", () => openDeleteOrderModal(order, localStorage.getItem("bo_token")))
		}))
}


function openShoworderModal(order: Order){
	app_modals.show_order.toggle()
	
	$("#editOrderModalTitle").text("Visualizza Ordine")
	$("#editOrderModalSubmitButton").text("Salva")
	
	$("#editForm #name").val(order.user.name)
	$("#editForm #surname").val(order.user.surname)

	let prod = $("#nameProduct");
	let quant = $("#quantityProduct"); 

	prod.html("")
	quant.html("")
	order.products.forEach((product: Product) => {
		let labelproductName = $('<label>').addClass('block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white')
									.attr('for', 'productName')
									.text('Nome del prodotto');	

		let productName = $('<input>').attr('type', 'text')
									.attr('name', 'productName')
									.attr('id', 'productName')
									.addClass('bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500')
									.val(product.name)
									.prop("disabled", true);

		let labelQuantity = $('<label>').addClass('block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white')
									.attr('for', 'quantity')
									.text('Quantita');	

		let quantity = $('<input>').attr('type', 'text')
									.attr('name', 'quantity')
									.attr('id', 'quantity')
									.addClass('bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500')
									.val(product.quantity)
									.prop("disabled", true);
		prod.append(labelproductName, productName)
		quant.append(labelQuantity, quantity)			
	})
}

function openDeleteOrderModal(order: Order, token?: string | null){
	app_modals.delete.toggle()
	$("#deleteOrderButton").on("click", async (event: JQuery.ClickEvent) => {
		
		const data = await handleRequest(ENDPOINT.ORDER(order._id), {
			method: "DELETE",
			headers: token ? { 'Authorization': `Bearer ${token}` } : {},
		})
		if (data.error) {
			alert(data.error.message)
		} else {
			app_modals.delete.hide()
			initOrders()
			$("#deleteOrderButton").off("click")
		}
	})
}


function initCloseDeleteModal(){
	$(".closeDeleteOrderModal").on("click", () => {
		app_modals.delete.hide()
		$("#deleteOrderButton").off("click")
	})
}

function initCloseShowOrderModal(){
	$(".closeOrderModal").on("click", () => {
		app_modals.show_order.hide()
	})
}


function initSearchBar(){

}
