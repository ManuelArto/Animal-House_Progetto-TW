const SERVER_URL = "http://localhost:5000"

export const ENDPOINT = {
	// SERVER
	LOGIN: SERVER_URL + "/user/login",
	REGISTER: SERVER_URL + "/user/register",
	EDIT_DATA: SERVER_URL + "/user/update",
	REFRESH_TOKEN: SERVER_URL + "/user/refreshToken",
	// ANIMALS
	ANIMALS_LIST: SERVER_URL + "/animals/list",
	ANIMALS_NEW: SERVER_URL + "/animals/",
	ANIMALS_DELETE: (animalId: string) => SERVER_URL + `/animals/${animalId}`,
	// SCORES
	SCORES_LIST: SERVER_URL + "/scores/list",
	// THREADS
	THREADS_LIST: SERVER_URL + "/threads/list",
	THREADS_NEW: SERVER_URL + "/threads",
	THREADS_NEW_MESSAGE: (threadId: string) => SERVER_URL + `/threads/${threadId}/newMessage`,
	// PRODUCTS
	PRODUCTS_LIST: SERVER_URL + "/products/list",
	PRODUCTS_CATEGORIES_LIST: SERVER_URL + "/products/categories/list",
	PRODUCTS_CATEGORY_LIST: (category: string) => SERVER_URL + `/products/${category}/list`,
	PRODUCTS_RAND_LIST: (number: number) => SERVER_URL + `/products/list/rand/${number}`,
	// SEDI
	SEDI_LIST: SERVER_URL + "/sedi/list",
	// RESERVATIONS
	RESERVATION_NEW: (idSede: string, serviceName: string, serviceNumber: number) => SERVER_URL + "/reservations/" + `${idSede}/${serviceName}/${serviceNumber}`,
	RESERVATION_ORARI: (idSede: string, serviceName: string, serviceNumber: number, date: string) => SERVER_URL + "/reservations/" + `${idSede}/${serviceName}/${serviceNumber}/fasceOrarie?date=${date}`,
}