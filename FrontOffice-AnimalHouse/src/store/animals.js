import { get, writable } from 'svelte/store'
import { user } from './user'
import { addToast } from './toasts'
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
			addToast({ message: `${data.error.type}<br>${data.error.message}`})
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
			addToast({ message: `${data.error.type}<br>${data.error.message}`})
		} else {
			this.animals.set(get(this.animals).filter(animal => animal._id != animalId))
			localStorage.setItem("animals", JSON.stringify(get(this.animals)))
			
			addToast({ message: data.message, type: "success"})
		}	
	}

	set(value) { this.animals.set(value) }
}

export const animals = new Animals()