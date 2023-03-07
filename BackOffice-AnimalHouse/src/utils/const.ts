const SERVER_API = "http://localhost:5000/api"

export const ENDPOINT = {
	// ADMIN USERS
	LOGIN: SERVER_API + "/adminUser/login",
	REFRESH_TOKEN: SERVER_API + "/adminUser/refreshToken",
	// USERS
	USERS_LIST: SERVER_API + "/user/list",
	USER: (id: string) => SERVER_API + `/user/${id}`,
	// ANIMALS,
	ANIMALS_LIST: SERVER_API + "/animals/list/all",
	// SCORES
	SCORES_LIST: SERVER_API + "/scores/list",
	SCORE: (id: string) => SERVER_API + `/scores/${id}`,
	// THREADS
	THREADS_LIST: SERVER_API + "/threads/list",
	THREAD: (id: string) => SERVER_API + `/threads/${id}`,
	MESSAGE: (threadId: string, messageId: string) => SERVER_API + `/threads/${threadId}/${messageId}`,
	// PRODUCTS
	PRODUCTS_LIST: SERVER_API + "/products/list",
	PRODUCTS_NEW: SERVER_API + "/products/",
	PRODUCT: (id: string) => SERVER_API + `/products/${id}`,
	// SEDI
	SEDI_LIST: SERVER_API + "/sedi/list",
	// RESERVATIONS
	RESERVATIONS_LIST: SERVER_API + "/reservations/list",
	RESERVATION_NEW: SERVER_API + "/reservations/",
	RESERVATION: (id: string) => SERVER_API + `/reservations/${id}`,
	RESERVATION_ORARI: (idSede: string, serviceName: string, serviceNumber: number, date: string) =>
		SERVER_API + "/reservations/" + `${idSede}/${serviceName}/${serviceNumber}/fasceOrarie?date=${date}`,
}