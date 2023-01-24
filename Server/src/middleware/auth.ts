import { Request, Response, NextFunction } from 'express-serve-static-core'
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'
import { UserModel, IUser } from '../model/user'
import { ErrorWrapper } from './error'


interface JwtRequest extends JwtPayload {
    id: string
}
export interface AuthRequest extends Request {
	token: string
	user: IUser
}

export const authJwt = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.cookies)
            throw new JsonWebTokenError("Missing token, please authenticate");
        
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtRequest
        
        const user = await UserModel.findOne({ _id: decoded.id.toString() })
        if(!user)
            throw new ErrorWrapper({ statusCode: 400, errorType: "NoUserFoundError", errorMsg: "No user with that id" });

        (req as AuthRequest).token = token;
        (req as AuthRequest).user = user;
        next()
    } catch (error: any) {
        res.clearCookie("token")
        if (error instanceof ErrorWrapper)
            next(error)
        else            
            next(new ErrorWrapper({statusCode: 401, error: error}))
    }
}
