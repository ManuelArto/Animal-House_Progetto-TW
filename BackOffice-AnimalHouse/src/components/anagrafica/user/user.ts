import $ from "jquery"
import users_html from "./user.html?raw"
import { Modal } from "flowbite";
import { ENDPOINT } from "../../../utils/const";
import { User } from "../../../model";
import { handleFormSubmit, handleRequest } from "../../../utils/requestHandler";

type IUserAppModals = { 
	delete: Modal; 
	user: Modal;
}
let app_modals = {} as IUserAppModals

export function renderUsers(element: JQuery<HTMLDivElement>) {
	element.html(users_html)

	app_modals.user = new Modal($('#updateUser')[0])
	app_modals.delete = new Modal($('#deleteModal')[0])
	
	$(function () {
		initUsers()
		initCloseEditUserModal()
		initCloseDeleteModal()
		initSearchBar()
	});
}

function initUsers() {
	// Clear users table
	$("tbody").html("")

	fetch(ENDPOINT.USERS_LIST, {headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }})
		.then((res) => res.json())
		.then((users) => users.forEach((user: User) => {
			var product_tmpl = $($("#user_template").html());
			
			product_tmpl.find(".updateUserButton").attr("id", `edit_${user._id}`)
			product_tmpl.find(".deleteUserButton").attr("id", `delete_${user._id}`)
			product_tmpl.find("#initial").text(user.name.charAt(0).toUpperCase() + "" + user.surname.charAt(0).toUpperCase())
			product_tmpl.find("#fullName").text(user.name + " " + user.surname)
			product_tmpl.find("#email").text(user.email)
			product_tmpl.find("#username").text(user.username)
			product_tmpl.find("#phone").text(user.phoneNumber)
			
			
			$("tbody").append(product_tmpl[0].outerHTML);

			$(`#edit_${user._id}`).on("click", () => openEditUserModal(user))
			$(`#delete_${user._id}`).on("click", () => openDeleteUserModal(user, localStorage.getItem("token")))
		}))
}

function openEditUserModal(user: User) {
	app_modals.user.toggle()
	
	$("#editForm #name").val(user.name)
	$("#editForm #surname").val(user.surname)
	$("#editForm #username").val(user.username)
	$("#editForm #email").val(user.email)
	$("#editForm #phoneNumber").val(user.phoneNumber)
	$("#editForm #birthDate").val(new Date(user.birthDate).toISOString().split('T')[0])
	$("#editForm #preference").val(user.preference)
	
	$("#editForm").attr("action", "PATCH")
	$("#editForm").on("submit", async (event: JQuery.SubmitEvent) => {
		const data = await handleFormSubmit(event, ENDPOINT.USER(user._id), "PATCH", localStorage.getItem("token"))

		if (data.error) {
			alert(data.error.message)
		} else {
			app_modals.user.hide()
			initUsers()
			$("#editForm").off("submit")
		}
	})
}

function openDeleteUserModal(user: User, token?: string | null) {
	app_modals.delete.toggle()
	$("#deleteUserButton").on("click", async (event: JQuery.ClickEvent) => {
		const data = await handleRequest(ENDPOINT.USER(user._id), {
			method: "DELETE",
			headers: token ? { 'Authorization': `Bearer ${token}` } : {},
		})

		if (data.error) {
			alert(data.error.message)
		} else {
			app_modals.delete.hide()
			initUsers()
			$("#deleteUserButton").off("click")
		}
	})
}

function initCloseEditUserModal() {
	$(".closeUserModal").on("click", () => {
		app_modals.user.hide()
		$("#editForm").off("submit")
	})
}

function initCloseDeleteModal() {
	$(".closeDeleteUserModal").on("click", () => {
		app_modals.delete.hide()
		$("#deleteUserButton").off("click")
	})
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
				if ($(this).find('th:nth-child(2)').text().toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
					$(this).show();
				}
			});
		}
	});
}