import { user } from '../store/user'
import { animals } from '../store/animals'
import { addToast } from '../store/toasts'

async function handleSubmit (e) {
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
	if (e.target.method.toLowerCase() == 'get') {
		response = await fetch(`${ACTION_URL}?${data}`, {
			headers: { 'Authorization': `Bearer ${user.getToken()}` }
		})
	}else {
		response = await fetch(ACTION_URL, {
			method: 'POST',
			headers: { 'Authorization': `Bearer ${user.getToken()}` },
			body: data
		})			
	}

	return await response.json()
}

export async function userInfoSubmit(e) {
	const data = await handleSubmit(e)

	if (data.error)
		addToast({ message: `${data.error.type}<br>${data.error.message}`})
	else
		await user.setData(data)
}

export async function newAnimalSubmit(e) {
	const data = await handleSubmit(e)

	if (data.error)
		addToast({ message: `${data.error.type}<br>${data.error.message}`})
	else
		await animals.newAnimal(data)
}

export async function formSubmit(e) {
	const data = await handleSubmit(e)

	return data
}