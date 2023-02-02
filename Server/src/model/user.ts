import { Document, Schema, Model, model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { constants } from '../utils/const'


interface IUser extends Document {
	name: string
	surname: string
	username: string
	email: string
	password: string
	phoneNumber: string
	birthDate: Date
	preference: string
	generateAuthToken(): Promise<string>
}

interface IUserModel extends Model<IUser> {
	findByCredentials(email: string, password: string): Promise<IUser>
}

const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
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
	phoneNumber: {
		type: String,
		required: true,
		validate(value: string) {
			if (!validator.isMobilePhone(value)) {
				throw new Error('Telefono is invalid')
			}
		}
	},
	birthDate: {
		type: Date,
		required: true
	},
	preference: {
		type: String,
		required: true
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
				"name": doc.name,
				"surname": doc.surname,
				"username": doc.username,
				"email": doc.email,
				"phoneNumber": doc.phoneNumber,
				"birthDate": doc.birthDate,
				"preference": doc.preference
			}
			return ret
		},
	 }
})


// Generate auth token
userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign(
		{ id: user._id.toString() },
		process.env.JWT_SECRET!,
		{ expiresIn: constants.expiresInToken }
	)

	return token
}

// log in user
userSchema.statics.findByCredentials = async (email: string, password: string) => {
	const user = await UserModel.findOne({ email })
	if (!user) {
		throw new Error('Unable to login: no user with that email')
	}
	if (!await bcrypt.compare(password, user.password)) {
		throw new Error('Unable to login: wrong password')
	}

	return user
}

// Hash plain password before saving
userSchema.pre('save', async function (next: Function) {
	const user = this
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}

	next()
})


export const UserModel: IUserModel = model<IUser, IUserModel>('User', userSchema)

export type { IUser }