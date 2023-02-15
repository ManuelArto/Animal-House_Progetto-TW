import { Document, Schema, model, ObjectId } from 'mongoose'


interface IGameAnimal extends Document {
	name: string
	imageURI: string
	species: string
	breed: string
	birthDate: string
	gender: string
	weight: number
	ownerId: ObjectId
}

const gameAnimalSchema = new Schema<IGameAnimal>({
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
		type: Number,
		required: true
	},
	ownerId: {
		type: Schema.Types.ObjectId,
		required: true
	},
}, { timestamps: true })


export const GameAnimalModel = model<IGameAnimal>('GameAnimal', gameAnimalSchema)

export type { IGameAnimal }