import { Document, Schema, model, ObjectId } from 'mongoose'


interface IReservation extends Document {
	headQuarter: ObjectId
	user: ObjectId
	animal: ObjectId
	serviceName: string
	number: number
	date: Date
	fascia_oraria: string
}

const reservationSchema = new Schema<IReservation>({
	headQuarter: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'HeadQuarter'
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	animal: {
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
		required: true,
		unique: true
	},
}, { timestamps: true })

reservationSchema.index({ headQuarter: 1, serviceName: 1, number: 1, date: 1, fascia_oraria: 1 }, { unique: true });

export const ReservationModel = model<IReservation>('Reservation', reservationSchema)

export type { IReservation }