import { Request, Response, NextFunction } from 'express-serve-static-core'
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'
import { UserModel, IUser } from '../model/user'
import { ErrorWrapper } from './error'


export interface JwtRequest extends JwtPayload {
    id: string
}
export interface AuthRequest extends Request {
	token: string
	user: IUser
}

export const authJwt = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization']
        if (!authHeader)
            throw new JsonWebTokenError("Missing token, please authenticate")
        
        const token = authHeader.split(' ')[1] as string
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtRequest
        
        const user = await UserModel.findOne({ _id: decoded.id.toString() })
        if(!user)
            throw new ErrorWrapper({ statusCode: 400, errorType: "NoUserFoundError", errorMsg: "No user with that id" });

        (req as AuthRequest).token = token;
        (req as AuthRequest).user = user;
        next()
    } catch (error: any) {
        if (error instanceof ErrorWrapper)
            next(error)
        else            
            next(new ErrorWrapper({statusCode: 401, error: error}))
    }
}
