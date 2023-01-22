import { Document, Schema, model } from 'mongoose'


interface IScore extends Document {
	game: string
	name: string
	score: number
}

const scoreSchema = new Schema<IScore>({
	game: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	score: {
		type: Number,
		required: true
	},
}, { timestamps: true })


export const ScoreModel = model<IScore>('Score', scoreSchema)

export type { IScore }