import { Document, Schema, model } from 'mongoose'


interface IProduct extends Document {
	name: string
	description: string
	category: string
	imageURI: string
	price: number
	quantity: number
}

const productSchema = new Schema<IProduct>({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	imageURI: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
}, { timestamps: true })


export const ProductModel = model<IProduct>('Product', productSchema)

export type { IProduct }