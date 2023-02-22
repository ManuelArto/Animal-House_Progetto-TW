
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
	date: string
	time:string
}

interface Thread {
	_id: string
	title: string
	creatorId: string
	creatorUsername: string
	createdAt: string
	messages: Message[]
	date:string
	time: string
}

interface Message {
	_id: string
	authorId: string
	authorUsername: string
	content: string
	date: string
	time: string
}

export type { Product, User, Score, Thread, Message }