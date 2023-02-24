import express, { Router, Request, Response, NextFunction } from "express"
import { IAdminUser, AdminUserModel } from '../model/adminUser'
import { ErrorWrapper } from "../middleware/error"
import { authJwt, AdminAuthRequest } from "../middleware/auth"

export const router: Router = express.Router()

// verify and refresh token
router.get('/refreshToken', authJwt(true), async (req: Request | AdminAuthRequest, res: Response, next: NextFunction) => {
    try {
        const user: IAdminUser = (req as AdminAuthRequest).user
        const token = await user.generateAuthToken()

        res.json({ user: user.toJSON(), token: token })
    } catch (error: any) {
        next(new ErrorWrapper({statusCode: 400, error: error}))
    }
})

// BackOffice Login
router.post('/login', async (req, res: Response, next: NextFunction) => {
    try {
        const user = await AdminUserModel.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()

        res.json({ user, token: token })
    } catch (error: any) {
        next(new ErrorWrapper({statusCode: 400, error: error}))
    }
})

export default router