import { get, writable } from 'svelte/store'
import { isTokenExpired ,setRefreshTokenTimer } from '../utils/jwt'
import { animals } from './animals'
import { addToast } from './toasts'
import { ENDPOINT } from '../utils/const'

class User {
	constructor() {
		this.user = writable(JSON.parse(localStorage.getItem("user")))
		this.subscribe = this.user.subscribe
		this.isUserLogged = writable(get(this.user) !== null)
		
		// handle JWT token
		if (this.token = localStorage.getItem("token")) {
			if (isTokenExpired(this.token))
				this.logOut()
			else
				setRefreshTokenTimer(this.token)
		}
	}

	logOut () {
		localStorage.clear()
		this.isUserLogged.set(false)
		this.user.set({})
	}

	async setUserData (data) {
		// format date
		data.user.birthDate = data.user.birthDate.split('T')[0]
		
		this.user.set({...data.user, fullName: data.user.name + ' ' + data.user.surname})
		this.isUserLogged.set(true)
		localStorage.setItem("user", JSON.stringify(get(this.user)))
	}

	async setData(data) {
		this.setUserData(data)

		this.token = data.token
		localStorage.setItem("token", this.token)
		setRefreshTokenTimer(this.token)

		// fetch all user animals
		await animals.getAll()
	}

	async editData(formData) {
		// split full name 
		const [name, ...surnames] = formData.fullName.split(' ')
		formData.name = name
		formData.surname = surnames.join(' ')
		
		const response = await fetch(ENDPOINT.EDIT_DATA, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.token}`
			},
			body: JSON.stringify(formData)
		})
		const data = await response.json()
		if (data.error) {
			addToast({ message: `${data.error.type}<br>${data.error.message}`})
		} else 
			this.setUserData(data)
	}

	set(value) { this.user.set(value) }
	
	setNewToken(token) { 
		this.token = token
		localStorage.setItem("token", this.token)
		setRefreshTokenTimer(this.token)
	}
	getToken() { return this.token }

}

export const user = new User()
