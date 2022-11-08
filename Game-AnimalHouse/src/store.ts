import { reactive } from "vue"
import animals from "@/data/animals.json"
import type { Animal } from '@/model'

export const state = reactive({
	animals: _loadAnimals(),
	isCollapseVisible: Boolean(false),
})

export function addAnimal(animal: Animal) {
	state.animals.push(animal)
	localStorage.setItem('animals', JSON.stringify(state.animals))
}
export function removeAnimal(id: string) {
	state.animals = state.animals.filter(animal => animal.id === id)
	localStorage.setItem('animals', JSON.stringify(state.animals))
}


// Private methods

function _loadAnimals(): Animal[] {
	// TODO: remove in PROD
	if (!localStorage.getItem('animals'))
		localStorage.setItem('animals', JSON.stringify(animals))

	return JSON.parse(localStorage.getItem('animals') || '[]')
}