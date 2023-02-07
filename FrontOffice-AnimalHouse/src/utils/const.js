const GAME_URL = ""
const SERVER_URL = "http://localhost:5000"

export const ENDPOINT = {
	// SERVER
	LOGIN: SERVER_URL + "/user/login",
	REGISTER: SERVER_URL + "/user/register",
	EDIT_DATA: SERVER_URL + "/user/update",
	VERIFY_TOKEN: SERVER_URL + "/user/verifyToken",
	ANIMALS_LIST: SERVER_URL + "/animals/list",
	ANIMALS_NEW: SERVER_URL + "/animals/",
	ANIMALS_DELETE: (animalId) => SERVER_URL + `/animals/${animalId}`,
	SCORES_LIST: SERVER_URL + "/scores/list",
	THREADS_LIST: SERVER_URL + "/threads/list",
	THREADS_NEW: SERVER_URL + "/threads",
	THREADS_NEW_MESSAGE: (threadId) => SERVER_URL + `/threads/${threadId}/newMessage`,
	// GAME
	GAME_QUIZ: GAME_URL + "/games/quiz"
}