import { ENDPOINT } from "../utils/const";

export function isUserAuthenticated() {
	let token: string | null
	if (token = localStorage.getItem("token")) {
		if (isTokenExpired(token)) {
			localStorage.clear()
			return false
		} else {
			setRefreshTokenTimer(token)
			return true
		}
	}

	return false
}

function isTokenExpired(token: string) {
	let tokens = token.split(".");
	let exp = JSON.parse(window.atob(tokens[1])).exp * 1000 // in millisecond

	return exp <= +new Date()
}

function setRefreshTokenTimer(token: string) {
	let tokens = token.split(".");
	let exp = JSON.parse(window.atob(tokens[1])).exp * 1000 // in millisecond
	let timer = exp - +new Date()
	
	// set interval for refreshing the token
	setTimeout(async () => await refreshToken(token), timer - 30000) // 30 seconds before expired
}

async function refreshToken (token: string) {
	const response = await fetch(ENDPOINT.REFRESH_TOKEN, {
		headers: { 'Authorization': `Bearer ${token}`}
	})

	const data = await response.json()
	if (!data.error)
		localStorage.setItem("token", data.token)
}