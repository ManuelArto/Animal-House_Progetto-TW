
interface User {
	_id: string
	name: string
	surname: string
	email:string
	username: string
	imageURI: string
	phoneNumber: number
	birthDate: Date
	preference: string
}

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

interface Reservation {
	_id: string;
	headQuarter: HeadQuarter
	user: User
	animal: Animal
	serviceName: string
	number: number
	date: Date
	fascia_oraria: string
}

interface HeadQuarter {
	address: Address
	services: Service[]
}

interface Address {
	street: string
	city: string
	zipCode: string
}

interface Service {
	type: string
	peso: string
	room: number
}
interface Animal {
	name: string
	imageURI: string
	species: string
	breed: string
	birthDate: string
	gender: string
	weight: number
}

export type { Product, User, Score, Thread, Message, Reservation, HeadQuarter, Animal, Address, Service} 
