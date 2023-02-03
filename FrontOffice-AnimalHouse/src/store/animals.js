import { get, writable } from 'svelte/store'
import { user } from './'
import { ENDPOINT } from '../utils/const'

export async function createAnimalsStore() {
	const animals = writable(JSON.parse(localStorage.getItem("animals")) || [])
	
	return {
		subscribe: animals.subscribe,
		set: (value) => animals.set(value),
		getAll: async () => {
			const response = await fetch(ENDPOINT.ANIMALS_LIST + '', {
				headers: { 'Authorization': `Bearer ${user.getToken()}` },
			})
			const data = await response.json()
			if (data.error) {
				alert(JSON.stringify(data.error))
			} else {
				animals.set(data)
				localStorage.setItem("animals", JSON.stringify(get(animals)))
			}
		},
		newAnimal: async (animal) => {
			animals.update(animals => [...animals, animal])
			localStorage.setItem("animals", JSON.stringify(get(animals)))
		},
		deleteAnimal: async (animalId) => {
			const response = await fetch(ENDPOINT.ANIMALS_DELETE(animalId), {
				method: 'DELETE',
				headers: { 'Authorization': `Bearer ${user.getToken()}` },	
			})
			const data = await response.json()
			if (data.error) {
				alert(JSON.stringify(data.error))
			} else {
				animals.set(get(animals).filter(animal => animal._id != animalId))
				localStorage.setItem("animals", JSON.stringify(get(animals)))
				
				// TODO: crea toast
				alert(data.message)
			}	
		}
	}
}