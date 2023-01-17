import { Request, Response, NextFunction, RequestHandlerParams } from 'express-serve-static-core';

import { IUser } from '../model/user'

const jwt = require('jsonwebtoken')
const User = require('../models/user')

interface AuthRequest extends Request {
	token: string
	user: IUser
}


const auth = async(req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') as string
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token':token })
        
        if(!user) {
            throw new Error
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({error: "Authentication required"})
    }
}

module.exports = auth

export type { AuthRequest }