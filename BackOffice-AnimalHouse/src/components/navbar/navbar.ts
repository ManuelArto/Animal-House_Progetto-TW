import $ from "jquery"
import navbar_html from "./navbar.html?raw"

export function renderNavbar(element: JQuery<HTMLDivElement>) {
	element.html( navbar_html )

	const user = JSON.parse(localStorage.getItem("user") || "{}")

	$("#email").text(user.email)
	$("#initial").text(user.username[0].toUpperCase())

	$("#logout").on("click", (e) => {
		localStorage.clear()
		window.location.href = "/login"
	})
}
