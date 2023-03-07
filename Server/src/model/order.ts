import { Document, Schema, model, ObjectId } from 'mongoose'
import date from 'date-and-time'

interface IProduct extends Document {
	name: string
	quantity: number
}

interface IOrder extends Document {
	user: ObjectId
    price: number
	products: IProduct[]
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
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
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
			console.log(doc)
			ret = {
				"_id": doc._id,
				"user": doc.user,
				"price": doc.price,
				"date": date.format(doc.createdAt, "DD-MM-YYYY"),
				"time": date.format(doc.createdAt, "HH:mm"),
				"products": doc.products.map((product: any) => ({
					_id: product._id,
					name: product.name,
					quantity: product.quantity,
				})),
			}
			return ret
		}
	}
})


export const OrderModel = model<IOrder>('Order', orderSchema)

export type { IOrder }