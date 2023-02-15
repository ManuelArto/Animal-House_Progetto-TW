const FRONT_OFFICE_URL = "/"
const SERVER_URL = "http://localhost:5000"

export const ENDPOINT = {
	// SERVER
	LOGIN: SERVER_URL + "/user/login",
	// PRODUCTS
	PRODUCTS_RAND_LIST: (number: number) => SERVER_URL + `/products/list/rand/${number}`,
	// FRONT OFFICE
	FRONT_OFFICE_PRODOTTI: FRONT_OFFICE_URL + "/shop",
	FRONT_OFFICE_SERVIZI: FRONT_OFFICE_URL + "/serviziPresenza"
}