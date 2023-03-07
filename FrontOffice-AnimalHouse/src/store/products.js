import { ENDPOINT } from '../utils/const'
import { addToast } from './toasts'

class Prod {
    async editQuantity(id, maxQuantity, quantity){
		const ProdQuantity = maxQuantity - quantity;
        console.log(ProdQuantity)
		const response = await fetch(ENDPOINT.EDIT_QUANTITY(id), {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ProdQuantity})
		})
		const data = await response.json()
		if (data.error) {
			addToast({ message: `${data.error.type}<br>${data.error.message}`})
		} else 
            addToast({message: "Ordine ricevuto", type:"success"})
    }
}

export const prod = new Prod()