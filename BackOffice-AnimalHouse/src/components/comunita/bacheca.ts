import $ from "jquery"
import bacheca_html from "./bacheca.html?raw"

export function renderBacheca(element: JQuery<HTMLDivElement>) {
	element.html( bacheca_html )

	$(function() {
		// selezioniamo il bottone e il pulsante "back" tramite l'ID
		const btn = $('#btn');
		const back = $('#back');
		const table = $('#thread');
		const messages = $('#messages');
	  
		// aggiungiamo un event listener per il click sul bottone
		btn.on('click', function() {
		  table.hide();
		  messages.show();
		});
	  
		// aggiungiamo un event listener per il click sul pulsante "back"
		back.on('click', function() {
		  table.show();
		  messages.hide();
		});
	  });
	  
}