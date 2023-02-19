import sidebar_html from "./sidebar.html?raw"

export function setupSidebar(element: JQuery<HTMLDivElement>) {
	element.html( sidebar_html )
}
