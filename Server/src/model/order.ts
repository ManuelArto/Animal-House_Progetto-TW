import { Document, Schema, model } from 'mongoose'
import date from 'date-and-time'

interface IProduct extends Document {
	name: string
	quantity: number
}

interface IOrder extends Document {
	_idUser: string
	products: IProduct[]
    price: number
}

const productSchema = new Schema<IProduct>({
	name: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	}
})

const orderSchema = new Schema<IOrder>({
	_idUser: {
        type: String,
    },
    products: {
		type: [productSchema],
		default: []
	},
    price: {
        type: Number,
        required: true
    }
},
{ 
	timestamps: true ,
	toJSON: {
		transform(doc, ret) {
			ret = {
				"createdAt": date.format(doc.createdAt, "DD-MM-YYYY"),
			}
			return ret
		}
	}
})


export const OrderModel = model<IOrder>('Order', orderSchema)

export type { IOrder }