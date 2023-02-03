import { Document, Schema, model } from 'mongoose'
import date from 'date-and-time'


interface IScore extends Document {
	game: string
	name: string
	punteggio: number
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
	punteggio: {
		type: Number,
		required: true
	},
}, { 
	timestamps: true,
	toJSON: { 
		transform(doc, ret) {
			ret = {
				"game": doc.game,
				"name": doc.name,
				"punteggio": doc.punteggio,
				// TODO: dividi in data e ora
				"date": date.format(doc.createdAt, "DD-MM-YYYY"),
				"time": date.format(doc.createdAt, "HH:mm"),
			}
			return ret
		},
	 } 
})


export const ScoreModel = model<IScore>('Score', scoreSchema)

export type { IScore }