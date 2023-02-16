import { Document, Schema, model, ObjectId } from 'mongoose'


interface IGameAnimal extends Document {
	name: string,
	latin_name: string,
	animal_type: string,
	active_time: string,
	length_min: string,
	length_max: string,
	weight_min: string,
	weight_max: string,
	lifespan: string,
	habitat: string,
	diet: string,
	geo_range: string,
	image_link: string,
}

const gameAnimalSchema = new Schema<IGameAnimal>({
	name: {
		type: String,
		required: true
	},
	latin_name: {
		type: String,
		required: true
	},
	animal_type: {
		type: String,
		required: true
	},
	active_time: {
		type: String,
		required: true
	},
	length_min: {
		type: String,
		required: true
	},
	length_max: {
		type: String,
		required: true
	},
	weight_min: {
		type: String,
		required: true
	},
	weight_max: {
		type: String,
		required: true
	},
	lifespan: {
		type: String,
		required: true
	},
	habitat: {
		type: String,
		required: true
	},
	diet: {
		type: String,
		required: true
	},
	geo_range: {
		type: String,
		required: true
	},
	image_link: {
		type: String,
		required: true
	},
}, {
	toJSON: { 
		transform(doc, ret) {
			ret = {...doc, id: doc._id}
			return ret
		},
	 }
})


export const GameAnimalModel = model<IGameAnimal>('GameAnimal', gameAnimalSchema)

export type { IGameAnimal }