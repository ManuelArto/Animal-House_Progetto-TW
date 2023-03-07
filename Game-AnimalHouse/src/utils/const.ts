const FRONT_OFFICE_URL = "/frontoffice/"
const SERVER_API = "/api"

export const ENDPOINT = {
	// SERVER
	LOGIN: SERVER_API + "/user/login",
	POST_SCORE: SERVER_API + "/scores/",
	// PRODUCTS
	PRODUCTS_RAND_LIST: (number: number) => SERVER_API + `/products/list/rand/${number}`,
	// FRONT OFFICE
	FRONT_OFFICE: FRONT_OFFICE_URL,
	FRONT_OFFICE_PRODOTTI: FRONT_OFFICE_URL + "#/shop",
	FRONT_OFFICE_SERVIZI: FRONT_OFFICE_URL + "#/serviziPresenza",
	// RAND ANIMALS
	RAND_ANIMALS_LIST: (number: number) => SERVER_API + `/gameAnimals/rand/${number}`
}