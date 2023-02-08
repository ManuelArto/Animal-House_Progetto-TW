import { user } from '../store/user'
import { animals } from '../store/animals'
import { addToast } from '../store/toasts'

export async function handleRequest(endpoint, options) {
	return await fetch(endpoint, options)
		.catch(error => addToast({message: `Error<br>${error}`}))
}

export async function userInfoSubmit(event) {
	let data 
	if (data =  await handleFormSubmit(event)) {
		if (data.error)
			addToast({ message: `${data.error.type}<br>${data.error.message}`})
		else
			await user.setData(data)
	}
}

export async function newAnimalSubmit(event) {
	let data 
	if (data =  await handleFormSubmit(event)) {
		if (data.error)
			addToast({ message: `${data.error.type}<br>${data.error.message}`})
		else
			await animals.newAnimal(data)
	}
}

export async function formSubmit(event) {
	let data
	return (data = await handleFormSubmit(event)) ? data : null
}

async function handleFormSubmit(event) {
	// getting the action url
	const ACTION_URL = event.target.action

	// get the form fields data and convert it to URLSearchParams
	const formData = new FormData(event.target)
	const data = new URLSearchParams()
	for (let field of formData) {
		const [key, value] = field
		data.append(key, value)
	}

	let response 
	// check the form's method and send the fetch accordingly
	if (event.target.method.toLowerCase() == 'get') {
		response = await handleRequest(`${ACTION_URL}?${data}`, {
			headers: { 'Authorization': `Bearer ${user.getToken()}` }
		})
	}else {
		response = await handleRequest(ACTION_URL, {
			method: 'POST',
			headers: { 'Authorization': `Bearer ${user.getToken()}` },
			body: data
		})
	}
	return response ? await response.json() : null
}