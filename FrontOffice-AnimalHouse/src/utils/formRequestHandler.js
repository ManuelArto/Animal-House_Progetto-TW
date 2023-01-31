import { user } from '../store'

export const handleSubmit = async e => {
	// getting the action url
	const ACTION_URL = e.target.action

	// get the form fields data and convert it to URLSearchParams
	const formData = new FormData(e.target)
	const data = new URLSearchParams()
	for (let field of formData) {
		const [key, value] = field
		data.append(key, value)
	}

	let response 
	// check the form's method and send the fetch accordingly
	if (e.target.method.toLowerCase() == 'get') response = await fetch(`${ACTION_URL}?${data}`)
	else {
		response = await fetch(ACTION_URL, {
			method: 'POST',
			body: data
		})			
	}

	user.setData(await response.json())
}