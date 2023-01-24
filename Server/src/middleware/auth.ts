import { Request, Response, NextFunction } from 'express-serve-static-core'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserModel, IUser } from '../model/user'

interface AuthRequest extends Request {
	token: string
	user: IUser
}

interface JwtRequest extends JwtPayload {
    _id: string
}

export const auth = async(req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token as string
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtRequest
        
        const user = await UserModel.findOne({ _id: decoded._id })
        if(!user) throw new Error(`No user with this id ${decoded._id}`)

        req.token = token
        req.user = user
        next()
    } catch (error: any) {
        res.clearCookie("token")
        error.status = 401
        next(error)
    }
}


export type { AuthRequest }