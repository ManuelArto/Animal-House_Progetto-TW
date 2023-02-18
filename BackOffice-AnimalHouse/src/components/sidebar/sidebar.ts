import $ from "jquery"
import sidebar_html from "./sidebar.html?raw"

export function setupSidebar(element: JQuery<HTMLDivElement>) {
	element.html( sidebar_html )

	const dropdownButtons: JQuery<HTMLButtonElement> = $("[data-collapse-toggle]");
	// per ogni pulsante selezionato, aggiungi il listener per l'evento click
	dropdownButtons.each(function () {
		$( this ).on("click", function(this: Element) {
			// seleziona l'elemento che deve essere mostrato o nascosto
			const target = $("#" + $( this ).attr("aria-controls"));

			// aggiungi o rimuovi la classe hidden dall'elemento
			target.toggle();
		});
	});
}
