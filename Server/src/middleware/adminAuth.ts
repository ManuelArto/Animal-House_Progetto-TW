import { Request, Response, NextFunction } from 'express-serve-static-core'
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'
import { AdminUserModel, IAdminUser } from '../model/adminUser'
import { JwtRequest } from './auth'
import { ErrorWrapper } from './error'


export interface AdminAuthRequest extends Request {
	token: string
	user: IAdminUser
}

export const adminAuthJwt = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization']
        if (!authHeader)
            throw new JsonWebTokenError("Missing token, please authenticate")
        
        const token = authHeader.split(' ')[1] as string
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtRequest
        
        const user = await AdminUserModel.findOne({ _id: decoded.id.toString() })
        if(!user)
            throw new ErrorWrapper({ statusCode: 400, errorType: "NoUserFoundError", errorMsg: "No user with that id" });

        (req as AdminAuthRequest).token = token;
        (req as AdminAuthRequest).user = user;
        next()
    } catch (error: any) {
        if (error instanceof ErrorWrapper)
            next(error)
        else            
            next(new ErrorWrapper({statusCode: 401, error: error}))
    }
}
