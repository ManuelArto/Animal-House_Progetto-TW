import { ENDPOINT } from "./const"
import { addToast } from "../store/toasts"
import { user } from "../store/user"

async function refreshToken (token) {
	const response = await fetch(ENDPOINT.REFRESH_TOKEN, {
		headers: { 'Authorization': `Bearer ${token}`}
	}).catch((err) => { throw err })

	const data = await response.json()
	if (data.error)
		addToast({ message: `${data.error.type}<br>${data.error.message}`})
	else
		user.setNewToken(data.token)
}

export function isTokenExpired(token) {
	let tokens = token.split(".");
	let exp = JSON.parse(window.atob(tokens[1])).exp * 1000 // in millisecond

	return exp <= +new Date()
}

export function setRefreshTokenTimer(token) {
	let tokens = token.split(".");
	let exp = JSON.parse(window.atob(tokens[1])).exp * 1000 // in millisecond
	let timer = exp - +new Date()
	
	// set interval for refreshing the token
	setTimeout(async () => await refreshToken(token), timer - 30000) // 30 seconds before expired
}