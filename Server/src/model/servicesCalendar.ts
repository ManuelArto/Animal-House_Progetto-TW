import { Document, Schema, model, ObjectId } from 'mongoose'


interface IServicesCalendar extends Document {
	idHeadQuarter: ObjectId
	idUser: ObjectId
	idAnimal: ObjectId
	name: string
	number: number
	dateFrom: Date
	dateTo: Date
}

const servicesCalendarSchema = new Schema<IServicesCalendar>({
	idHeadQuarter: {
		type: Schema.Types.ObjectId,
		required: true
	},
	idUser: {
		type: Schema.Types.ObjectId,
		required: true
	},
	idAnimal: {
		type: Schema.Types.ObjectId,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	number: {
		type: Number,
		required: true
	},
	dateFrom: {
		type: Date,
		required: true
	},
	dateTo: {
		type: Date,
		required: true
	},
}, { timestamps: true })


export const servicesCalendarModel = model<IServicesCalendar>('ServicesCalendar', servicesCalendarSchema)

export type { IServicesCalendar }