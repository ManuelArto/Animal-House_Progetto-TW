const GAME_URL = "/game"
const SERVER_API = "/api"

export const ENDPOINT = {
	// SERVER
	LOGIN: SERVER_API + "/user/login",
	REGISTER: SERVER_API + "/user/register",
	EDIT_DATA: SERVER_API + "/user/update",
	REFRESH_TOKEN: SERVER_API + "/user/refreshToken",
	// ANIMALS
	ANIMALS_LIST: SERVER_API + "/animals/list",
	ANIMALS_NEW: SERVER_API + "/animals/",
	ANIMALS_DELETE: (animalId) => SERVER_API + `/animals/${animalId}`,
	// SCORES
	SCORES_LIST: SERVER_API + "/scores/list",
	// THREADS
	THREADS_LIST: SERVER_API + "/threads/list",
	THREADS_NEW: SERVER_API + "/threads",
	THREADS_NEW_MESSAGE: (threadId) => SERVER_API + `/threads/${threadId}/newMessage`,
	// PRODUCTS
	PRODUCTS_LIST: SERVER_API + "/products/list",
	PRODUCTS_CATEGORIES_LIST: SERVER_API + "/products/categories/list",
	PRODUCTS_CATEGORY_LIST: (category) => SERVER_API + `/products/${category}/list`,
	PRODUCTS_RAND_LIST: (number) => SERVER_API + `/products/list/rand/${number}`,
	EDIT_QUANTITY: (id) => SERVER_API + `/products/${id}/updateQuantity`,
	//ORDERS
	ORDERS_NEW: SERVER_API + "/orders",
	// SEDI
	SEDI_LIST: SERVER_API + "/sedi/list",
	// RESERVATIONS
	RESERVATION_NEW: (idSede, serviceName, serviceNumber) => SERVER_API + "/reservations/" + `${idSede}/${serviceName}/${serviceNumber}`,
	RESERVATION_ORARI: (idSede, serviceName, serviceNumber, date) => SERVER_API + "/reservations/" + `${idSede}/${serviceName}/${serviceNumber}/fasceOrarie?date=${date}`,
	// GAME
	GAME_QUIZ: GAME_URL + "/#/games/quiz",
	// IMAGES
	IMAGEURI: (uri) => SERVER_API.replace("/api", "") + uri
}