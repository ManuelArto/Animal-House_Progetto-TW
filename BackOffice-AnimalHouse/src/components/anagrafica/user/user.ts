import $ from "jquery"
import users_html from "./user.html?raw"
import { Modal } from "flowbite";
import { ENDPOINT } from "../../../utils/const";
import { User } from "../../../model";

let searchTerm = "";

export function renderUsers(element: JQuery<HTMLDivElement>) {
	element.html(users_html)

	const updateUser = new Modal($('#updateUser')[0])
	const deleteModal = new Modal($('#deleteModal')[0])
	const changePassword = new Modal($('#changePassword')[0])

	$(function () {
		initUsers(updateUser, deleteModal, changePassword)
		initupdateUser(updateUser)
		initDeleteModal(deleteModal)
		initchangePassword(changePassword)
		initSearchBar()
	});
}

function initUsers(updateUser: Modal, deleteModal: Modal, changePassword: Modal) {
	fetch(ENDPOINT.PRODUCTS_LIST) //da cambiare ENDPOINT
		.then((res) => res.json())
		.then((users) => users.forEach((user: User) => {
			var product_tmpl = $($("#user_template").html());
			
			product_tmpl.find(".updateUserButton").attr("id", `edit_${user._id}`)
			product_tmpl.find(".deleteUserButton").attr("id", `delete_${user._id}`)
			product_tmpl.find(".changePasswordButton").attr("id", `change_${user._id}`)
			product_tmpl.find("#initial").text(user.name.charAt(0).toUpperCase + "" + user.surname.charAt(0).toUpperCase)
			product_tmpl.find("#fullName").text(user.name + " " + user.surname)
			product_tmpl.find("#email").text(user.email)
			product_tmpl.find("#username").text(user.username)
			product_tmpl.find("#best").text(user.best_score)
			product_tmpl.find("#phone").text(user.phone)
			
			
			$("tbody").append(product_tmpl[0].outerHTML);

			// $(`#${product._id}`).data("id", product._id)
			$(`#edit_${user._id}`).on("click", () => updateUser.toggle())
			$(`#delete_${user._id}`).on("click", () => deleteModal.toggle())
			$(`#change_${user._id}`).on("click", () => changePassword.toggle())
		}))
}

function initupdateUser(updateUser: Modal) {
	$(".updateUserButton").each(function () {
		// TODO: clear productModal ??
		$(this).on("click", () => updateUser.toggle())
	})
}

function initchangePassword(changePassword: Modal) {
	$(".changePasswordButton").each(function () {
		// TODO: clear productModal ??
		$(this).on("click", () => changePassword.toggle())
	})
}

function initDeleteModal(deleteModal: Modal) {
	$(".closeDeleteProductModal").on("click", () => deleteModal.hide() )
}

function initSearchBar(){
	$('#simple-search').on("input", function () {
		searchTerm = $(this).val() as string;

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