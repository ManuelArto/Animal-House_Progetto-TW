const GAME_URL = ""
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
	ANIMALS_DELETE: (animalId) => SERVER_URL + `/animals/${animalId}`,
	// SCORES
	SCORES_LIST: SERVER_URL + "/scores/list",
	// THREADS
	THREADS_LIST: SERVER_URL + "/threads/list",
	THREADS_NEW: SERVER_URL + "/threads",
	THREADS_NEW_MESSAGE: (threadId) => SERVER_URL + `/threads/${threadId}/newMessage`,
	// PRODUCTS
	PRODUCTS_LIST: SERVER_URL + "/products/list",
	PRODUCTS_CATEGORIES_LIST: SERVER_URL + "/products/categories/list",
	PRODUCTS_CATEGORY_LIST: (category) => SERVER_URL + `/products/${category}/list`,
	PRODUCTS_RAND_LIST: (number) => SERVER_URL + `/products/list/rand/${number}`,
	// SEDI
	SEDI_LIST: SERVER_URL + "/sedi/list",
	// GAME
	GAME_QUIZ: GAME_URL + "/games/quiz"
}