import { Request, Response, NextFunction } from 'express-serve-static-core'
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'
import { AdminUserModel, IAdminUser } from '../model/adminUser'
import { UserModel, IUser } from '../model/user'
import { ErrorWrapper } from './error'

export interface JwtRequest extends JwtPayload {
    id: string
}
export interface AuthRequest extends Request {
	token: string
	user: IUser
}
export interface AdminAuthRequest extends Request {
	token: string
	user: IAdminUser
}

export function authJwt(isAdminAuth: boolean = false) {
    return async(req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers['authorization']
            if (!authHeader)
                throw new JsonWebTokenError("Missing token, please authenticate")
            
            const token = authHeader.split(' ')[1] as string
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtRequest

            let userFound = await userAuth(req as AuthRequest, decoded.id.toString(), token)
            if (isAdminAuth || !userFound)
                userFound = await adminUserAuth(req as AdminAuthRequest, decoded.id.toString(), token)

            if (!userFound)
                throw new ErrorWrapper({ statusCode: 400, errorType: "NoUserFoundError", errorMsg: "No user with that id" });

            next()
        } catch (error: any) {
            if (error instanceof ErrorWrapper)
                next(error)
            else            
                next(new ErrorWrapper({statusCode: 401, error: error}))
        }
    }
}

async function adminUserAuth(req: AdminAuthRequest, id: string, token: string) : Promise<boolean> {
    const user = await AdminUserModel.findOne({ _id: id })
    if(!user)
        return false

    req.token = token;
    req.user = user;
    return true
}

async function userAuth(req: AuthRequest, id: string, token: string) : Promise<boolean> {
    const user = await UserModel.findOne({ _id: id })
    if(!user)
        return false

    req.token = token;
    req.user = user;
    return true
}