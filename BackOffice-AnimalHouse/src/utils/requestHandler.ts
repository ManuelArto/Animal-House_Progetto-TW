
export async function handleRequest(endpoint: string, options?: {}) {
	try {
		const response = await fetch(endpoint, options);
		return response.json();
	} catch (error) {
		return { error:  { message: "Network error" } };
	}
}

export async function handleFormSubmit(event: JQuery.SubmitEvent, ENDPOINT: string, method: string, token?: string | null) {
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

	let response
	if (method) {
		response = await handleRequest(ENDPOINT, {
			method: method,
			headers: token ? { 'Authorization': `Bearer ${token}` } : {},
			body: data
		})
	} else {
		response = await handleRequest(ENDPOINT, {
			headers: token ? { 'Authorization': `Bearer ${token}` } : {}
		})
	}

	return response
}