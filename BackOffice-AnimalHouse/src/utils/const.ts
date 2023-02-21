const SERVER_URL = "http://localhost:5000"

export const ENDPOINT = {
	// ADMIN USERS
	LOGIN: SERVER_URL + "/adminUser/login",
	REFRESH_TOKEN: SERVER_URL + "/adminUser/refreshToken",
	// SCORES
	SCORES_LIST: SERVER_URL + "/scores/list",
	// THREADS
	THREADS_LIST: SERVER_URL + "/threads/list",
	// PRODUCTS
	PRODUCTS_LIST: SERVER_URL + "/products/list",
	// SEDI
	SEDI_LIST: SERVER_URL + "/sedi/list",
	// RESERVATIONS
	RESERVATION_NEW: (idSede: string, serviceName: string, serviceNumber: number) => SERVER_URL + "/reservations/" + `${idSede}/${serviceName}/${serviceNumber}`,
	RESERVATION_ORARI: (idSede: string, serviceName: string, serviceNumber: number, date: string) => SERVER_URL + "/reservations/" + `${idSede}/${serviceName}/${serviceNumber}/fasceOrarie?date=${date}`,
}