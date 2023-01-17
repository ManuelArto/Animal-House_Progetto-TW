import { Schema, model } from 'mongoose';

const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// 1. Create an interface representing a document in MongoDB.
interface IUser {
	name: string;
	email: string;
	password: string;
	tokens: any[];
	save: Function;
}

const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
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
		minLength: 7,
		trim: true,
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
}, {
	timestamps: true
})


// Generate auth token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    
	await user.save()
    return token
}

// login in users
userSchema.statics.findByCredentials = async (email: string, password: string) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to log in')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch)
    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash plain password before saving
userSchema.pre('save', async function(next: Function) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


const User = model<IUser>('User', userSchema)

module.exports = User

export type { IUser }