import login_html from "./login.html?raw"

export function renderLogin(element: JQuery<HTMLDivElement>) {
	element.html( login_html )
}
