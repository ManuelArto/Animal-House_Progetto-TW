import products_html from "./prodotti.html?raw"

export function setupProducts(element: JQuery<HTMLDivElement>) {
	element.html(products_html)
}
