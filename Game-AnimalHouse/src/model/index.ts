interface Animal {
	name: string,
	specie: string,
	razza: string,
	image_link: string,
	birthday: string,
	condizioni: string;
	gender: string,
	weight: string,
	owner_name: string,
	owner_surname: string,
	owner_phone: string,
	owner_email: string,
	_id: string,
}

interface Route {
	text: string,
	icon: string,
	path: string,
	nested?: boolean,
	routes?: Array<Route>
}

interface RandAnimal {
	name: string,
	il_nome_latino: string,
	il_tipo_di_animale: string,
	active_time: string,
	length_min: string,
	length_max: string,
	weight_min: string,
	weight_max: string,
	la_vita_media: string,
	habitat: string,
	il_cibo: string,
	geo_range: string,
	image_link: string,
	_id: string
}

interface Answer {
	answer: string,
	isCorrect: boolean
}

interface Question {
	question: string,
	animalImage: string,
	answers: Array<Answer>
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

export type { Animal, Route, RandAnimal, Question, Answer, Product}