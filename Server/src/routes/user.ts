import express, { Router, Request, Response, NextFunction } from "express"
import { constants } from '../utils/const'
import { UserModel } from '../model/user'
import { ErrorWrapper } from "../middleware/error"

export const router: Router = express.Router()

// signup
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const user = new UserModel(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()

        // storing our JWT web token as a cookie in our browser
        res.cookie('token', token, { maxAge: constants.maxAgeToken, httpOnly: true })

        res.status(201).json({ "user": user.toJSON(), token })
    } catch (error: any) {
        res.clearCookie("token")
        next(new ErrorWrapper({statusCode: 400, error: error}))
    }

})

// login
router.post('/login', async (req, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        // storing our JWT web token as a cookie in our browser
        res.cookie('token', token, { maxAge: constants.maxAgeToken, httpOnly: true })

        res.json({ "user": user.toJSON(), token })
    } catch (error: any) {
        res.clearCookie("token")
        next(new ErrorWrapper({statusCode: 400, error: error}))
    }
})

export default router