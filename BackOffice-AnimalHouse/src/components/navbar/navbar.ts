import navbar_html from "./navbar.html?raw"

export function renderNavbar(element: JQuery<HTMLDivElement>) {
	element.html( navbar_html )
}
