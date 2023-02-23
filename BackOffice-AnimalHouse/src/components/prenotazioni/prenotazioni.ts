
import $ from "jquery"
import { Modal, Dropdown } from "flowbite";
import { HeadQuarter, Reservation } from "../../model";
import { ENDPOINT } from "../../utils/const";
import prenotazioni_html from "./prenotazioni.html?raw"
import { handleFormSubmit, handleRequest } from "../../utils/requestHandler";

type IAppModals = { 
	delete: Modal; 
	reservation: Modal;
	filter: Modal;
}
let app_modals = {} as IAppModals

export function renderPrenotazioni(element: JQuery<HTMLDivElement>) {
	element.html( prenotazioni_html )
    app_modals.reservation = new Modal($('#ReservationModal')[0])
	app_modals.delete = new Modal($('#deleteModal')[0])
	app_modals.filter = new Modal($('#FilterModal')[0])

	$(function() {
		initReservations()
		initNewReservationModal()
		initCloseDeleteModal()
		initCloseReservationModal()
		initFilterModal()
	});
}

function initReservations(){
	$("tbody").html("")

	fetch(ENDPOINT.RESERVATIONS_LIST)
		.then((res) => res.json())
		.then((reservations) => reservations.forEach((reservation: Reservation) => {
			var product_tmpl = $($("#reservation_template").html());
			
			product_tmpl.find(".updateReservationButton").attr("id", `edit_${reservation._id}`)
			product_tmpl.find(".deleteReservationButton").attr("id", `delete_${reservation._id}`)
			product_tmpl.find("#initial").text(reservation.user.name.charAt(0).toUpperCase + "" + reservation.user.surname.charAt(0).toUpperCase)
			product_tmpl.find("#fullName").text(reservation.user.name + " " + reservation.user.surname)
			product_tmpl.find("#email").text(reservation.user.email)
			product_tmpl.find("#pet").text(reservation.animal.name)
			product_tmpl.find("#street").text(reservation.headQuarter.address.street)
			product_tmpl.find("#room").text(reservation.number)
			product_tmpl.find("#service").text(reservation.serviceName)
			
			$("tbody").append(product_tmpl[0].outerHTML);

			$(`#edit_${reservation._id}`).on("click", () => openEditReservationtModal(reservation))
			$(`#delete_${reservation._id}`).on("click", () => openDeleteReservationModal(reservation, localStorage.getItem("token")))
		}))
}

function initNewReservationModal(){
	$(".newReservationButton").on("click", () => {
		app_modals.reservation.toggle()
		$("#ReservationModalTitle").text("Aggiungi una prenotazione")
		$("#ReservationSubmitButton").text("Aggiungi")

		$("#sedi").append("<option value=' '>" + "</option>"); //primo valore della select vuoto
		fetch(ENDPOINT.SEDI_LIST)
			.then((res) => res.json())
			.then((sedi) => sedi.forEach((sede: HeadQuarter) => {
				$("#sedi").append("<option value='" + sede.address.street + "'>" + sede.address.street + ", " + sede.address.city + ", " + sede.address.zipCode + "</option>");
		}))

		$("#editForm #room") //TODO: menu a tendina delle stanze da creare quando si seleziona una sede
		$("#editForm #service") //TODO: menu a tendina dei servizi da creare quando si seleziona una sede
		$("#editForm #name").val("")
		$("#editForm #pet").val("")
	
		$("#editForm").on("submit", async (event: JQuery.SubmitEvent) => {
			const data = await handleFormSubmit(event, ENDPOINT.RESERVATION_NEW, "POST", localStorage.getItem("token"))  //TODO: ENDPOINT da errore
	
			if (data.error) {
				alert(data.error.message)
			} else {
				app_modals.reservation.hide()
				initReservations()
				$("#editForm").off("submit")
			}
		})
	})
}

function openEditReservationtModal(reservation: Reservation) {
	app_modals.reservation.toggle()
	$("#ReservationModalTitle").text("Edit Reservation")
	$("#ReservationSubmitButton").text("Salva")
	
	// TODO: settare campi del form
	$("#editForm #name").val(reservation.user.name + " " + reservation.user.surname)
	$("#editForm #pet").val(reservation.animal.name)
	$(`#editForm #service option[value='${reservation.serviceName}']`).attr('checked','checked')
	$(`#editForm #room option[value='${reservation.number}']`).attr('selected','selected')
	$(`#editForm #sede option[value='${reservation.headQuarter.address.street}']`).attr('selected','selected')
	
	$("#editForm").attr("action", "PATCH")
	$("#editForm").on("submit", async (event: JQuery.SubmitEvent) => {
		const data = await handleFormSubmit(event, ENDPOINT.RESERVATION_EDIT(), "PATCH", localStorage.getItem("token")) //TODO: ENDPOINT da cambiare 

		if (data.error) {
			alert(data.error.message)
		} else {
			app_modals.reservation.hide()
			initReservations()
			$("#editForm").off("submit")
		}
	})
}

function openDeleteReservationModal(reservation: Reservation, token?: string | null) {
	app_modals.delete.toggle()
	$("#deleteReservationButton").on("click", async (event: JQuery.ClickEvent) => {
		const data = await handleRequest(ENDPOINT.PRODUCT(reservation._id), {
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

function initCloseDeleteModal(){
	$(".closeDeleteReservationModal").on("click", () => app_modals.delete.hide() )
}

function initCloseReservationModal(){
	$(".closeReservationModal").on("click", () => app_modals.reservation.hide() )
}

function initFilterModal(){
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
		});

		$('#FilterSubmitButton').on("click", function () {
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
		});

		$('#FilterSubmitButton').on("click", function () {
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

