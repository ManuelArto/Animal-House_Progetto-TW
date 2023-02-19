const FRONT_OFFICE_URL = "http://localhost:5174/"
const SERVER_URL = "http://192.168.0.101:5000"

export const ENDPOINT = {
	// SERVER
	LOGIN: SERVER_URL + "/user/login",
	POST_SCORE: SERVER_URL + "/scores/",
	// PRODUCTS
	PRODUCTS_RAND_LIST: (number: number) => SERVER_URL + `/products/list/rand/${number}`,
	// FRONT OFFICE
	FRONT_OFFICE: FRONT_OFFICE_URL,
	FRONT_OFFICE_PRODOTTI: FRONT_OFFICE_URL + "#/shop",
	FRONT_OFFICE_SERVIZI: FRONT_OFFICE_URL + "#/serviziPresenza",
	// RAND ANIMALS
	RAND_ANIMALS_LIST: (number: number) => SERVER_URL + `/gameAnimals/rand/${number}`
}