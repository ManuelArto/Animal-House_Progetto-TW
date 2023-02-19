import users_html from "./user.html?raw"

export function setupUsers(element: JQuery<HTMLDivElement>) {
	element.html(users_html)
}