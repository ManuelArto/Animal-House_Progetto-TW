import $ from "jquery"
import { Modal } from "flowbite";
import { Order } from "../../../model";
import { ENDPOINT } from "../../../utils/const";
import fatturazione_html from "./fatturazione.html?raw"

type IProductAppModals = { 
	delete: Modal; 
	order: Modal;
}
let app_modals = {} as IProductAppModals

export function renderFatturazione(element: JQuery<HTMLDivElement>) {
	element.html(fatturazione_html)

    app_modals.order = new Modal($('#OrderModel')[0], {backdrop: "static"})
	app_modals.delete = new Modal($('#deleteOrderModal')[0], {backdrop: "static"})

    $(function () {
		initOrders()
		initNewOrderModal()
		initCloseDeleteModal()
		initCloseOrderModal()
		initFilterDropdown()
		initSearchBar()
	})
}

function initOrders(){
    // Clear products table
	$("tbody").html("")

	fetch(ENDPOINT.ORDERS_LIST)
		.then((res) => res.json())
		.then((products) => products.forEach((order: Order) => {
			var product_tmpl = $($("#order_template").html());
			
			product_tmpl.find(".updateOrderButton").attr("id", `edit_${order._id}`)
			product_tmpl.find(".deleteOrderButton").attr("id", `delete_${order._id}`)
			product_tmpl.find("#name").text(order.user.name + " " + order.user.surname)
			product_tmpl.find("#price").text(order.price)
			product_tmpl.find("#date").text(order.date)
			
			$("tbody").append(product_tmpl[0].outerHTML);

			$(`#edit_${order._id}`).on("click", () => openEditProductModal(order))
			$(`#delete_${order._id}`).on("click", () => openDeleteProductModal(order))
		}))
}

function initNewOrderModal(){

}

function initCloseDeleteModal(){

}

function initCloseOrderModal(){

}

function initFilterDropdown(){

}

function initSearchBar(){

}

function openEditProductModal(order: Order){

}

function openDeleteProductModal(order: Order){

}