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

	const token = localStorage.getItem("token")
	if (token) await setRefreshTokenTimer(token, logOut)
	
	return {
		subscribe: user.subscribe,
		isUserLogged: isUserLogged,
		token: token,
		getFullName: () => get(user).name + ' ' + get(user).surname,
		setData: async (data) => {
			if (data.error) {
				alert(JSON.stringify(data.error))
			} else {
				user.set(data.user)
				isUserLogged.set(true)
				localStorage.setItem("user", JSON.stringify(data.user))
				localStorage.setItem("token", data.token)

				await setRefreshTokenTimer(data.token, logOut)
			}
		},
		logOut: async () => await logOut(),
		editData: async (params) => {

		}, 
		set: (value) => user.set(value)
	}
}