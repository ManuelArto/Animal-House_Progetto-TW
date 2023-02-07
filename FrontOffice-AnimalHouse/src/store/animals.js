import { get, writable } from 'svelte/store'
import { user } from './user'
import { ENDPOINT } from '../utils/const'

class Animals {
	constructor() {
		this.animals = writable(JSON.parse(localStorage.getItem("animals")) || [])
		this.subscribe = this.animals.subscribe
	}
	
	async getAll () {
		const response = await fetch(ENDPOINT.ANIMALS_LIST + '', {
			headers: { 'Authorization': `Bearer ${user.getToken()}` },
		})
		const data = await response.json()
		if (data.error) {
			alert(JSON.stringify(data.error))
		} else {
			this.animals.set(data)
			localStorage.setItem("animals", JSON.stringify(get(this.animals)))
		}
	}

	async newAnimal (animal) {
		this.animals.update(animals => [...animals, animal])
		localStorage.setItem("animals", JSON.stringify(get(this.animals)))
	}

	async deleteAnimal (animalId) {
		const response = await fetch(ENDPOINT.ANIMALS_DELETE(animalId), {
			method: 'DELETE',
			headers: { 'Authorization': `Bearer ${user.getToken()}` },	
		})
		const data = await response.json()
		if (data.error) {
			alert(JSON.stringify(data.error))
		} else {
			this.animals.set(get(this.animals).filter(animal => animal._id != animalId))
			localStorage.setItem("animals", JSON.stringify(get(this.animals)))
			
			// TODO: crea toast
			alert(data.message)
		}	
	}

	set(value) { this.animals.set(value) }
}

export const animals = new Animals()