import users_html from "./user.html?raw"

export function renderUsers(element: JQuery<HTMLDivElement>) {
	element.html(users_html)
}