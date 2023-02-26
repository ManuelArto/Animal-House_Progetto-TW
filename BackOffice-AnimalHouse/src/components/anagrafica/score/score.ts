import $ from "jquery"
import { Modal, Dropdown } from "flowbite";
import { Score } from "../../../model";
import { ENDPOINT } from "../../../utils/const";
import score_html from "./score.html?raw"
import { handleRequest } from "../../../utils/requestHandler";

let deleteModal: Modal;

export function renderScore(element: JQuery<HTMLDivElement>) {
	element.html(score_html)

	deleteModal = new Modal($('#deleteModal')[0])

	$(function () {
		initScores()
		initCloseDeleteModal()
		initFilterDropdown()
		initSearchBar()
	});
}

function initScores() {
	// Clear products table
	$("tbody").html("")

	fetch(ENDPOINT.SCORES_LIST)
		.then((res) => res.json())
		.then((scores) => scores.forEach((score: Score) => {
			var product_tmpl = $($("#score_template").html());
			
			product_tmpl.find(".deleteScoreButton").attr("id", `delete_${score._id}`)
			product_tmpl.find("#initial").text(score.name.charAt(0).toUpperCase())
			product_tmpl.find("#name").text(score.name)
			product_tmpl.find("#game").text(score.game)
			product_tmpl.find("#score").text(score.punteggio)
			product_tmpl.find("#day").text(score.date)
			product_tmpl.find("#hour").text(score.time)
			$("tbody").append(product_tmpl[0].outerHTML);

			$(`#delete_${score._id}`).on("click", () => openDeleteScoreModal(score, localStorage.getItem("token")))
		}))
}

function openDeleteScoreModal(score: Score, token?: string | null) {
	deleteModal.toggle()
	$("#deleteScoreButton").on("click", async (event: JQuery.ClickEvent) => {
		const data = await handleRequest(ENDPOINT.SCORE(score._id), {
			method: "DELETE",
			headers: token ? { 'Authorization': `Bearer ${token}` } : {},
		})

		if (data.error) {
			alert(data.error.message)
		} else {
			deleteModal.hide()
			initScores()
			$("#deleteScoreButton").off("click")
		}
	})
}

function initCloseDeleteModal() {
	$(".closeDeleteScoreModal").on("click", () => {
		deleteModal.hide()
		$("#deleteScoreButton").off("click")
	} )
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
			$('tbody tr').hide();
			$('tbody tr').each(function () {
				if ($(this).find('th:nth-child(1)').text().toLowerCase().includes(searchTerm.toLowerCase())) {
					$(this).show();
				}
			});
		}
	});
}