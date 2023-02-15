import { Document, Schema, model, ObjectId } from 'mongoose'


interface IReservation extends Document {
	idHeadQuarter: ObjectId
	idUser: ObjectId
	idAnimal: ObjectId
	serviceName: string
	number: number
	date: Date
	fascia_oraria: string
}

const reservationSchema = new Schema<IReservation>({
	idHeadQuarter: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'HeadQuarter'
	},
	idUser: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	idAnimal: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Animal'
	},
	serviceName: {
		type: String,
		required: true
	},
	number: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	fascia_oraria: {
		type: String,
		required: true
	},
}, { timestamps: true })


export const ReservationModel = model<IReservation>('Reservation', reservationSchema)

export type { IReservation }