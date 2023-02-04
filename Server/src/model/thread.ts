import { Document, Schema, model, ObjectId } from 'mongoose'

interface IMessage {
	authorId: ObjectId
	authorUsername: string
	content: string
}

interface IThread extends Document {
	title: string
	creatorId: ObjectId
	creatorUsername: string
	messages: IMessage[]
}

const messageSchema = new Schema({
	authorId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	authorUsername: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	}
}, { timestamps: true })

const threadSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	creatorId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	creatorUsername: {
		type: String,
		required: true
	},
	messages: { 
		type: [messageSchema], 
		default: [] 
	}
}, { timestamps: true })



export const ThreadModel = model<IThread>('Thread', threadSchema)

export type { IThread }