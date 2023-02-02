import { Document, Schema, model, ObjectId } from 'mongoose'


interface IAnimal extends Document {
	name: string
	imageURI: string
	species: string
	breed: string
	birthDate: string
	gender: string
	weight: string
	ownerId: ObjectId
}

const animalSchema = new Schema<IAnimal>({
	name: {
		type: String,
		required: true
	},
	imageURI: {
		type: String,
		required: true
	},
	species: {
		type: String,
		required: true
	},
	breed: {
		type: String,
		required: true
	},
	birthDate: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true
	},
	weight: {
		type: String,
		required: true
	},
	ownerId: {
		type: Schema.Types.ObjectId,
		required: true
	},
}, { timestamps: true })


export const AnimalModel = model<IAnimal>('Animal', animalSchema)

export type { IAnimal }