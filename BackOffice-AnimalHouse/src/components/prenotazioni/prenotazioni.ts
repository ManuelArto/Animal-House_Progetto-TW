import $ from "jquery"
import prenotazioni_html from "./prenotazioni.html?raw"

export function renderPrenotazioni(element: JQuery<HTMLDivElement>) {
	element.html( prenotazioni_html )
    
	$(function() {
		$("#pulisci").click(function() {
			// Svuota tutti i campi di input
			$('input[type="date"]').val('');
			// Deseleziona tutte le checkbox
			$('input[type="checkbox"]').prop('checked', false);
			// Imposta il menu a tendina sul primo valore vuoto
			$('select option:first-child').prop('selected', true);
			});
	  });
	  
}
