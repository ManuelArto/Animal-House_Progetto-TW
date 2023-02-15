import { Document, Schema, model } from 'mongoose'

interface IService {
	tipo: string[]
	peso: string
	number: number
}

interface IHeadQuarter extends Document {
	address: {
		street: string
		city: string
		zipCode: string
	}
	services: Map<string, IService[]>
}

const serviceSchema = new Schema<IService>({
	tipo: {
		type: [String],
		required: true
	},
	peso: {
		type: String,
		required: true
	},
	number: {
		type: Number,
		required: true
	}
})

const headQuearterSchema = new Schema<IHeadQuarter>({
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
	services: { 
		type: Map,
		of: [serviceSchema]
	}
})


export const HeadQuarterModel = model<IHeadQuarter>('HeadQuarter', headQuearterSchema)

export type { IHeadQuarter }