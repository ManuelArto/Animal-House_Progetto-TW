import { Request, Response, NextFunction } from 'express-serve-static-core';
import { UserModel, IUser } from '../model/user'

const jwt = require('jsonwebtoken')

interface AuthRequest extends Request {
	token: string
	user: IUser
}

export const auth = async(req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') as string
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await UserModel.findOne({ _id: decoded._id, 'tokens.token':token })
        
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


export type { AuthRequest }