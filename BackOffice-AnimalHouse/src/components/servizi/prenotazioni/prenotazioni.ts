import $ from "jquery"
import { Modal } from "flowbite";
import { Animal, HeadQuarter, Reservation, Service, User } from "../../../model";
import { ENDPOINT } from "../../../utils/const";
import prenotazioni_html from "./prenotazioni.html?raw"
import { handleFormSubmit, handleRequest } from "../../../utils/requestHandler";

type IAppModals = { 
	delete: Modal; 
	reservation: Modal;
	filter: Modal;
}
let app_modals = {} as IAppModals

export function renderPrenotazioni(element: JQuery<HTMLDivElement>) {
	element.html( prenotazioni_html )
	
    app_modals.reservation = new Modal($('#ReservationModal')[0], {backdrop: "static"})
	app_modals.delete = new Modal($('#deleteModal')[0], {backdrop: "static"})
	app_modals.filter = new Modal($('#FilterModal')[0], {backdrop: "static"})

	$(function() {
		initReservations()
		initNewReservationModal()
		initCloseDeleteModal()
		initCloseReservationModal()
		initCloseFilterModal()
		initFilterModal()
	});
}

function initReservations() {
	// Clear reservations table
	$("tbody").html("")

	fetch(ENDPOINT.RESERVATIONS_LIST, {headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }})
		.then((res) => res.json())
		.then((reservations) => reservations.forEach((reservation: Reservation) => {
			var product_tmpl = $($("#reservation_template").html());
			
			product_tmpl.find(".updateReservationButton").attr("id", `edit_${reservation._id}`)
			product_tmpl.find(".deleteReservationButton").attr("id", `delete_${reservation._id}`)
			product_tmpl.find("#initial").text(reservation.user.name.charAt(0).toUpperCase() + "" + reservation.user.surname.charAt(0).toUpperCase())
			product_tmpl.find("#fullName").text(reservation.user.name + " " + reservation.user.surname)
			product_tmpl.find("#email").text(reservation.user.email)
			product_tmpl.find("#pet").text(reservation.animal.name)
			product_tmpl.find("#street").text(reservation.headQuarter.address.street)
			product_tmpl.find("#room").text(reservation.number)
			product_tmpl.find("#service").text(reservation.serviceName)
			product_tmpl.find("#date").text(reservation.date)
			product_tmpl.find("#time").text(reservation.fascia_oraria)
			
			$("tbody").append(product_tmpl[0].outerHTML);

			$(`#edit_${reservation._id}`).on("click", async () => await openEditReservationtModal(reservation))
			$(`#delete_${reservation._id}`).on("click", () => openDeleteReservationModal(reservation, localStorage.getItem("token")))
		}))
}

function initNewReservationModal() {
	$(".newReservationButton").on("click", async () => {
		app_modals.reservation.toggle()
		$("#ReservationModalTitle").text("Aggiungi una prenotazione")
		$("#ReservationSubmitButton").text("Aggiungi")
		$("#labelFasceOrarie").text("Fasce orarie disponibili")

		await setupReservationForm()

		$("#editForm").on("submit", async (event: JQuery.SubmitEvent) => {
			const data = await handleFormSubmit(event, ENDPOINT.RESERVATION_NEW, "POST", localStorage.getItem("token"))
	
			if (data.error) {
				alert(data.error.message)
			} else {
				app_modals.reservation.hide()
				initReservations()
				$("#editForm #sede").off("change")
				$("#editForm #service").off("change")
				$("#editForm #room").off("change")
				$("#editForm #user").off("change")
				$("#editForm #date").off("change")
				$("#editForm").off("submit")
			}
		})
	})
}

async function openEditReservationtModal(reservation: Reservation) {
	app_modals.reservation.toggle()
	$("#ReservationModalTitle").text("Edit prenotazione")
	$("#ReservationSubmitButton").text("Salva")
	$("#labelFasceOrarie").text("Altre fasce orarie disponibili")

	await setupReservationForm()
	// Edit and trigger change
	$("#editForm #sede").val(reservation.headQuarter._id).trigger("change")
	$("#editForm #service").val(reservation.serviceName).trigger("change")
	$("#editForm #room").val(reservation.number).trigger("change")
	$("#editForm #user").val(reservation.user._id).trigger("change")
	$("#editForm #pet").val(reservation.animal._id).trigger("change")
	$("#editForm #date").val(new Date(reservation.rawDate).toISOString().split('T')[0]).trigger("change")

	$("#editForm").on("submit", async (event: JQuery.SubmitEvent) => {
		const data = await handleFormSubmit(event, ENDPOINT.RESERVATION(reservation._id), "PATCH", localStorage.getItem("token"))

		if (data.error) {
			alert(data.error.message)
		} else {
			app_modals.reservation.hide()
			initReservations()
			$("#editForm #sede").off("change")
			$("#editForm #service").off("change")
			$("#editForm #room").off("change")
			$("#editForm #user").off("change")
			$("#editForm #date").off("change")
			$("#editForm").off("submit")
		}
	})
}

function openDeleteReservationModal(reservation: Reservation, token?: string | null) {
	app_modals.delete.toggle()
	$("#deleteReservationButton").on("click", async (event: JQuery.ClickEvent) => {
		const data = await handleRequest(ENDPOINT.RESERVATION(reservation._id), {
			method: "DELETE",
			headers: token ? { 'Authorization': `Bearer ${token}` } : {},
		})

		if (data.error) {
			alert(data.error.message)
		} else {
			app_modals.delete.hide()
			initReservations()
			$("#deleteReservationButton").off("click")
		}
	})
}

function initCloseDeleteModal() {
	$(".closeDeleteReservationModal").on("click", () => {
		app_modals.delete.hide()
		$("#deleteReservationButton").off("click")
	})
}

function initCloseReservationModal() {
	$(".closeReservationModal").on("click", () => {
		app_modals.reservation.hide()
		$("#editForm #sede").off("change")
		$("#editForm #service").off("change")
		$("#editForm #room").off("change")
		$("#editForm #user").off("change")
		$("#editForm #date").off("change")
		$("#editForm").off("submit")
	})
}

function initCloseFilterModal() {
	$(".closeFilterModal").on("click", () => {
		app_modals.filter.hide()
		$("#pulisci").off("click")
		$("#FilterSubmitButton").off("click")
	})
}

function initFilterModal() {
	$(".filterModal").on("click", () => {
		app_modals.filter.toggle()
		$("#FilterModalTitle").text("Filtra le prenotazioni")
		$("#FilterSubmitButton").text("Filtra")
		$("#pulisci").text("Pulisci")
		$("#pulisci").on("click", function() {
			// Svuota tutti i campi di input
			$('input[type="date"]').val('');
			// Deseleziona tutte le checkbox
			$('input[type="checkbox"]').prop('checked', false);
			// Imposta il menu a tendina sul primo valore vuoto
			$('select option:first-child').prop('selected', true);
		});
		
		$('#FilterSubmitButton').on("click", function () {
			// FILRO SEDI
			let selectedSede = $('#filterSede').val();
			if (selectedSede == " ") {
				$('tbody tr').show();
			} else {
				$('tbody tr').hide();
				$('tbody tr').each(function () {
					if ($(this).find('td:nth-child(2)').text() == selectedSede) {
						$(this).show();
					}
				});
			}

			// FILRO SERVIZI
			let selectedServices: string[] = [];
	
			// Selezioniamo tutti gli elementi checkbox all'interno
			$('#filterService input[type=checkbox]').each(function () {
				// Se l'elemento è selezionato, aggiungiamo il valore dell'attributo id all'array selectedCategories
				if ($(this).is(':checked')) {
					selectedServices.push($(this).attr('id')!);
				}
			});
	
			// Se non è stata selezionata nessuna categoria, mostriamo tutti i prodotti
			if (selectedServices.length == 0) {
				$('tbody tr').show();
			} else {
				// Altrimenti nascondiamo tutti i prodotti e mostriamo solo quelli della categoria selezionata
				$('tbody tr').hide();
				$('tbody tr').each(function () {
					if ($.inArray($(this).find('td:nth-child(4)').text(), selectedServices) !== -1) {
						$(this).show();
					}
				});
			}

			// FILRO DATA
			let selectedDate = $('#filterDate').val();
			if (selectedDate == " ") {
				$('tbody tr').show();
			} else {
				$('tbody tr').hide();
				$('tbody tr').each(function () {
					if ($(this).find('td:nth-child(2)').text() == selectedDate) {
						$(this).show();
					}
				});
			}

		});
	})
}


async function setupReservationForm() {
	// DETTAGLI DELLA SEDE
	
	let sedi: HeadQuarter[] = [];
	await fetch(ENDPOINT.SEDI_LIST)
		.then((res) => res.json())
		.then((data) => sedi.push(...data))
	
	$("#editForm #sede").html("<option value=' '></option>")
	sedi.forEach((sede: HeadQuarter) => {
		$("#editForm #sede").append(`<option value='${sede._id}'> ${sede.address.street}, ${sede.address.city} ${sede.address.zipCode}</option>`);
	})

	// La select dei servizi dipende dalla sede scelta
	let sede: HeadQuarter;
	$("#editForm #service").html("<option value=' '></option>")
	$("#editForm #sede").on("change", function() {
		sede = sedi.find((sede) => sede._id == $(this).val())!
		const services = Object.keys(sede.services)

		$("#editForm #service").html("<option value=' '></option>")
		services.forEach((service) => {
			$("#editForm #service").append(`<option value='${service}'> ${service} </option>`);
		})

		// resetto la data e le fasce orarie
		$("#editForm #date").val("")
		$("#editForm #fascia_oraria").html("")
	})

	// La select delle room dipende dal servizio scelto
	let serviceName: string;
	$("#editForm #room").html("<option value=' '></option>")
	$("#editForm #service").on("change", function() {
		serviceName = $(this).val() as string
		const service = sede.services[serviceName]

		$("#editForm #room").html("<option value=' '></option>")
		service.forEach((room) => {
			$("#editForm #room").append(`<option value='${room.number}'> ${room.number} </option>`);
		})

		// resetto la data e le fasce orarie
		$("#editForm #date").val("")
		$("#editForm #fascia_oraria").html("")
	})

	let room: number;
	$("#editForm #room").on("change", function () {
		room = $(this).val() as number

		// resetto la data e le fasce orarie
		$("#editForm #date").val("")
		$("#editForm #fascia_oraria").html("")
	})

	// DATI DELL'UTENTE

	let users: User[] = [];
	$("#editForm #user").html("<option value=' '></option>")
	await fetch(ENDPOINT.USERS_LIST, {headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }})
		.then((res) => res.json())
		.then((data) => users.push(...data))
	
	users.forEach((user: User) => {
		$("#editForm #user").append(`<option value='${user._id}'> ${user.username} </option>`);
	})

	let pets: Animal[] = [];
	await fetch(ENDPOINT.ANIMALS_LIST, {headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }})
		.then((res) => res.json())
		.then((data) => pets.push(...data))

	// La select dei pets dipende dall'utente scelto
	$("#editForm #pet").html("<option value=' '></option>")
	$("#editForm #user").on("change", function() {
		const selected_pets = pets.filter((pet) => pet.ownerId == $(this).val())

		$("#editForm #pet").html("<option value=' '></option>")
		selected_pets.forEach((pet) => {
			$("#editForm #pet").append(`<option value='${pet._id}'> ${pet.name} </option>`);
		})
	})

	// DETTAGLI SULLA GIORNATA
	
	$("#editForm #date").val("")
	$("#editForm #fascia_oraria").html("")
	$("#editForm #date").on("change", async function() {
		const date = $(this).val() as string
		let fasce_orarie: string[] = [];

		if (!sede || !serviceName || !room) {
			$("#errorParagraph").text("Devi selezionare almeno una sede, un servizio e una stanza")
			$(this).val("")
		} else if (date) {
			$("#errorParagraph").text("")
			await fetch(ENDPOINT.RESERVATION_ORARI(sede._id, serviceName, room, date), {headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }})
				.then((res) => res.json())
				.then((data) => fasce_orarie.push(...data))

			$("#editForm #fascia_oraria").html("")
			fasce_orarie.forEach((fascia_oraria) => {
				$("#editForm #fascia_oraria").append(`<option value='${fascia_oraria}'> ${fascia_oraria} </option>`);
			})
		}

	})

}