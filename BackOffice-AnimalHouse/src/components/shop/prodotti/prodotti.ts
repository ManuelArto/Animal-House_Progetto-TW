import $ from "jquery"
import products_html from "./prodotti.html?raw"

export function setupProducts(element: JQuery<HTMLDivElement>) {
	element.html(products_html)
	$(document).ready(function() {
		// Selezioniamo l'elemento con id filterDropdown e aggiungiamo un listener all'evento click
		$('#filterDropdown input[type=checkbox]').click(function() {
		  // Definiamo un array vuoto per contenere le categorie selezionate
		  let selectedCategories = [];
	  
		  // Selezioniamo tutti gli elementi input con tipo checkbox all'interno dell'elemento con id filterDropdown
		  $('#filterDropdown input[type=checkbox]').each(function() {
			// Se l'elemento è selezionato, aggiungiamo il valore dell'attributo id all'array selectedCategories
			if ($(this).is(':checked')) {
			  selectedCategories.push($(this).attr('id'));
			}
		  });
	  
		  // Se non è stata selezionata nessuna categoria, mostriamo tutti i prodotti
		  if (selectedCategories.length == 0) {
			$('tbody tr').show();
		  } else {
			// Altrimenti nascondiamo tutti i prodotti e mostriamo solo quelli della categoria selezionata
			$('tbody tr').hide();
			$('tbody tr').each(function() {
			  if ($.inArray($(this).find('td:nth-child(2)').text(), selectedCategories) !== -1) {
				$(this).show();
			  }
			});
		  }
		});
	});
}
