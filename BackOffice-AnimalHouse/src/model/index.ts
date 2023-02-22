
interface Product {
	_id: string
	name: string
	description: string
	category: string
	imageURI: string
	price: number
	quantity: number
	rating: number
}

interface User {
	_id: string
	name: string
	surname: string
	email:string
	username: string
	best_score: string
	imageURI: string
	phone: number
	birth: Date
	preferenze: string
}

interface Score {
	_id: string
	name: string
	game: string
	punteggio: number
	createdAt: string
}
export type { Product, User, Score }