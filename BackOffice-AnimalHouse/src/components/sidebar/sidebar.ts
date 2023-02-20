import sidebar_html from "./sidebar.html?raw"

export function renderSidebar(element: JQuery<HTMLDivElement>) {
	element.html( sidebar_html )
}
