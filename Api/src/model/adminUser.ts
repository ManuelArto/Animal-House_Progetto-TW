import { Document, Schema, Model, model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { constants } from '../utils/const'


interface IAdminUser extends Document {
	username: string
	email: string
	password: string
	generateAuthToken(): Promise<string>
}

interface IAdminUserModel extends Model<IAdminUser> {
	findByCredentials(username: string, password: string): Promise<IAdminUser>
}

const adminUserSchema = new Schema<IAdminUser>({
	username: {
		type: String,
		required: true,
		unique: true,
		maxlength: 22
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate(value: string) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid')
			}
		}
	},
	password: {
		type: String,
		required: true,
		minLength: constants.pwdMinLenght,
	}
}, {
	timestamps: true,
	toJSON: { 
		transform(doc, ret) {
			ret = {
				"username": doc.username,
				"email": doc.email,
			}
			return ret
		},
	 }
})


// Generate auth token
adminUserSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign(
		{ id: user._id.toString() },
		process.env.JWT_SECRET!,
		{ expiresIn: constants.expiresInToken }
	)

	return token
}

adminUserSchema.statics.findByCredentials = async (username: string, password: string) => {
	const user = await AdminUserModel.findOne({ username })
	if (!user) {
		throw new Error('Unable to login: no admin user with that username')
	}
	if (!await bcrypt.compare(password, user.password)) {
		throw new Error('Unable to login: wrong password')
	}

	return user
}

// Hash plain password before saving
adminUserSchema.pre('save', async function (next: Function) {
	const user = this
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}

	next()
})


export const AdminUserModel: IAdminUserModel = model<IAdminUser, IAdminUserModel>('AdminUser', adminUserSchema)

export type { IAdminUser }