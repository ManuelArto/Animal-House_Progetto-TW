import { push } from 'svelte-spa-router'
import { get, writable } from 'svelte/store'
import { ENDPOINT } from '../utils/const'

async function refreshToken (token) {
	const response = await fetch(ENDPOINT.VERIFY_TOKEN, {
		headers: { 'Authorization': `Bearer ${token}`}
	}).catch((err) => { throw err })

	return await response.json()
}

async function setRefreshTokenTimer(token, logOutCallBack) {
	let tokens = token.split(".");
	let exp = JSON.parse(window.atob(tokens[1])).exp * 1000 // in millisecond

	// Check if token is expired
	if (exp <= +new Date()) await logOutCallBack()

	// set interval for refreshing the token
	// TODO: save new token
	setInterval(async () => await refreshToken(token), exp - +new Date())
}

export async function createUserStore() {
	const user = writable(JSON.parse(localStorage.getItem("user")))
	const isUserLogged = writable(get(user) !== null)
	
	const logOut = async () => {
		localStorage.clear()
		isUserLogged.set(false)
		user.set({})
		await push('/')
	}
	const setUserData = (data) => {
		// format date
		data.user.birthDate = data.user.birthDate.split('T')[0]
		
		user.set({...data.user, fullName: data.user.name + ' ' + data.user.surname})
		isUserLogged.set(true)
		localStorage.setItem("user", JSON.stringify(get(user)))
	}

	let token = localStorage.getItem("token")
	if (token) await setRefreshTokenTimer(token, logOut)
	
	return {
		subscribe: user.subscribe,
		isUserLogged: isUserLogged,
		token: token,
		set: (value) => user.set(value),
		setData: async (data) => {
			if (data.error) {
				alert(JSON.stringify(data.error))
			} else {
				setUserData(data)

				token = data.token
				localStorage.setItem("token", token)
				await setRefreshTokenTimer(token, logOut)
			}
		},
		logOut: async () => await logOut(),
		editData: async (formData) => {
			// split full name 
			const [name, ...surnames] = formData.fullName.split(' ')
			formData.name = name
			formData.surname = surnames.join(' ')
			
			const response = await fetch(ENDPOINT.EDIT_DATA, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(formData)
			})
			const data = await response.json()
			if (data.error) {
				alert(JSON.stringify(data.error))
			} else 
				setUserData(data)
		},
	}
}