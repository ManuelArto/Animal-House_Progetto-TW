import notfound_html from "./notfound.html?raw"

export function renderNotFound(element: JQuery<HTMLDivElement>) {
	element.html( notfound_html )
}
