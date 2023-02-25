import { Document, Schema, model, ObjectId } from 'mongoose'
import date from 'date-and-time'


interface IScore extends Document {
	game: string
	user: ObjectId
	punteggio: number
}

const scoreSchema = new Schema<IScore>({
	game: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
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
				"_id": doc._id,
				"game": doc.game,
				"name": doc.user?.username || "[utente eliminato]",
				"punteggio": doc.punteggio,
				"date": date.format(doc.createdAt, "DD-MM-YYYY"),
				"time": date.format(doc.createdAt, "HH:mm"),
			}
			return ret
		},
	 } 
})


export const ScoreModel = model<IScore>('Score', scoreSchema)

export type { IScore }