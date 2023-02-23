import $ from "jquery"
import { Modal, Dropdown } from "flowbite";
import { Score } from "../../../model";
import { ENDPOINT } from "../../../utils/const";
import score_html from "./score.html?raw"

let searchTerm = "";

export function renderScore(element: JQuery<HTMLDivElement>) {
	element.html(score_html)

	const deleteModal = new Modal($('#deleteModal')[0])

	$(function () {
		initScores(deleteModal)
		initDeleteModal(deleteModal)
		initFilterDropdown()
		initSearchBar()
	});
}

function initScores(deleteModal: Modal) {
	fetch(ENDPOINT.SCORES_LIST)
		.then((res) => res.json())
		.then((scores) => scores.forEach((score: Score) => {
			var product_tmpl = $($("#score_template").html());
			
			product_tmpl.find(".deleteScoreButton").attr("id", `delete_${score._id}`)
			product_tmpl.find("#initial").text(score.name.charAt(0).toUpperCase)
			product_tmpl.find("#name").text(score.name)
			product_tmpl.find("#game").text(score.game)
			product_tmpl.find("#score").text(score.punteggio)
			product_tmpl.find("#day").text(score.date)
			product_tmpl.find("#hour").text(score.time)
			$("tbody").append(product_tmpl[0].outerHTML);

			// $(`#${product._id}`).data("id", product._id)
			$(`#delete_${score._id}`).on("click", () => deleteModal.toggle())
		}))
}

function initDeleteModal(deleteModal: Modal) {
	$(".closeDeleteProductModal").on("click", () => deleteModal.hide() )
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
		console.log(selectedCategories);
	});
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