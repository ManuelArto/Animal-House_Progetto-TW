import $ from "jquery"
import login_html from "./login.html?raw"
import { ENDPOINT } from "../../utils/const";

export function renderLogin(element: JQuery<HTMLDivElement>) {
	element.html( login_html )

	$("#loginForm").on("submit", async (event) => {
		event.preventDefault();
	  
		const form = event.target as HTMLFormElement

        // get the form fields data and convert it to URLSearchParams
        const formData = new FormData(form)
        const data = new URLSearchParams()

		// @ts-ignore
        for (let field of formData) {
            const [key, value] = field
            data.append(key, value)
        }

        const response = await fetch(ENDPOINT.LOGIN, {
                method: 'POST',
                body: data
		})

		const res_data = await response.json()

		if (res_data.error) {
			alert(res_data.error.message)
		} else {
			localStorage.setItem("token", res_data.token)
			localStorage.setItem("user", JSON.stringify(res_data.user))
			window.location.href = "/"
		}
	});
}
