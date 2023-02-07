import { ENDPOINT } from "./const";

async function refreshToken (token) {
	const response = await fetch(ENDPOINT.VERIFY_TOKEN, {
		headers: { 'Authorization': `Bearer ${token}`}
	}).catch((err) => { throw err })

	return await response.json()
}

export async function setRefreshTokenTimer(token, logOutCallBack) {
	let tokens = token.split(".");
	let exp = JSON.parse(window.atob(tokens[1])).exp * 1000 // in millisecond
	
	// Check if token is expired
	if (exp <= +new Date()) logOutCallBack()
	else {
		// set interval for refreshing the token
		// TODO: save new token
		setInterval(async () => await refreshToken(token), exp - +new Date())
	} 
}