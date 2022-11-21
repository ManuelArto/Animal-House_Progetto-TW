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
	id: string,
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
	latin_name: string,
	animal_type: string,
	active_time: string,
	length_min: string,
	length_max: string,
	weight_min: string,
	weight_max: string,
	lifespan: string,
	habitat: string,
	diet: string,
	geo_range: string,
	image_link: string,
	id: number
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

export type { Animal, Route, RandAnimal, Question, Answer}