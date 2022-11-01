import type { RouteLocationRaw } from "vue-router";

interface Animal {
	specie: string;
	nome: string;
	eta: number;
	condizioni: string;
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

export type { Animal, Route, RandAnimal}