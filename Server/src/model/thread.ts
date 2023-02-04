import { Document, Schema, model, ObjectId } from 'mongoose'
import date from 'date-and-time'

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
}, {
	timestamps: true,
	toJSON: { 
		transform(doc, ret) {
			ret = {
				"id": doc._id,
				"title": doc.title,
				"creatorId": doc.creatorId,
				"creatorUsername": doc.creatorUsername,
				"createdAt": date.format(doc.createdAt, "DD-MM-YYYY"),
				"messages": doc.messages,
			}
			return ret
		},
	 }
})



export const ThreadModel = model<IThread>('Thread', threadSchema)

export type { IThread }