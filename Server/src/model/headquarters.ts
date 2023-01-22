import { Document, Schema, model } from 'mongoose'


interface IHeadQuarter extends Document {
	address: {
		street: string
		city: string
		zipCode: string
	}
	services: [{
		service: string
		number: number
	}]
}
const productSchema = new Schema<IHeadQuarter>({
	address: {
		street: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		zipCode: {
			type: String,
			required: true
		},
	},
	services: [{
		service: {
			type: String,
			required: true
		},
		number: {
			type: Number,
			required: true
		},
	}]
})


export const HeadQuarterModel = model<IHeadQuarter>('HeadQuarter', productSchema)

export type { IHeadQuarter }