import $ from "jquery"
import login_html from "./login.html?raw"
import { ENDPOINT } from "../../utils/const";
import { handleFormSubmit } from "../../utils/requestHandler";

export function renderLogin(element: JQuery<HTMLDivElement>) {
	element.html( login_html )

	$("#loginForm").on("submit", async (event) => {
		const data = await handleFormSubmit(event, ENDPOINT.LOGIN, "POST")

		if (data.error) {
			alert(data.error.message)
		} else {
			localStorage.setItem("bo_token", data.token)
			localStorage.setItem("bo_user", JSON.stringify(data.user))
			window.location.href = "/"
		}
	});
}
