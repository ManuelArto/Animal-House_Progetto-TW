import notfound_html from "./notfound.html?raw"

export function setupNotFound(element: JQuery<HTMLDivElement>) {
	element.html( notfound_html )
}
