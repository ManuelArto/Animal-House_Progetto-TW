import { ENDPOINT } from '../utils/const';
import { writable } from 'svelte/store';


async function isTokenValid (token) {
	const response = await fetch(ENDPOINT.VERIFY_TOKEN, {
		headers: { 'Authorization': `Bearer ${token}`}
	}).catch((err) => { throw err })
	const data = await response.json()
	if (data.error)
		return false
	else
		return data.token
}

export async function createUserStore() {
	// if user and token are saved in LocalStorage, check if token is valid
	let user = JSON.parse(localStorage.getItem("user"))
	let token = localStorage.getItem("token")
	if (token) {
		let newToken = await isTokenValid(token)
		token = newToken ? newToken : null
	}

	const { subscribe, set, update } = writable(user);
	let isUserLogged = writable(user !== null);

	const setData = (data) => {
		set(data.user)
		isUserLogged.set(true)
		localStorage.setItem("user", JSON.stringify(data.user))
		localStorage.setItem("token", data.token)
		// TODO: set timeout from token exp
	}

	return {
		subscribe,
		isUserLogged: isUserLogged,
		token: token,
		setData: async (data) => {
			if (data.error) {
				alert(JSON.stringify(data.error))
			} else
				setData(data)
		},
		clear: () => {
			set(null)
			isUserLogged.set(false)
			localStorage.removeItem("user")
		},
	}
}