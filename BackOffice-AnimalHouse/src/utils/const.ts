const SERVER_URL = "http://localhost:5000"

export const ENDPOINT = {
	// ADMIN USERS
	LOGIN: SERVER_URL + "/adminUser/login",
	REFRESH_TOKEN: SERVER_URL + "/adminUser/refreshToken",
	// USERS
	USERS_LIST: SERVER_URL + "/user/list",
	USER: (id: string) => SERVER_URL + `/user/${id}`,
	// SCORES
	SCORES_LIST: SERVER_URL + "/scores/list",
	SCORE: (id: string) => SERVER_URL + `/scores/${id}`,
	// THREADS
	THREADS_LIST: SERVER_URL + "/threads/list",
	// PRODUCTS
	PRODUCTS_LIST: SERVER_URL + "/products/list",
	PRODUCTS_NEW: SERVER_URL + "/products/",
	PRODUCT: (id: string) => SERVER_URL + `/products/${id}`,
	// SEDI
	SEDI_LIST: SERVER_URL + "/sedi/list",
	// RESERVATIONS
	RESERVATIONS_LIST: SERVER_URL + "/reservations/list",
	RESERVATION_NEW: SERVER_URL + "/reservations/",
	RESERVATION: (id: string) => SERVER_URL + `/reservations/${id}`

}