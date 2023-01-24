import express, { Router, Request, Response, NextFunction } from "express"
import { constants } from '../utils/const'
import { UserModel } from '../model/user'

export const router: Router = express.Router()

// signup
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const user = new UserModel(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()

        // storing our JWT web token as a cookie in our browser
        res.cookie('token', token, { maxAge: constants.maxAgeToken, httpOnly: true })

        res.status(201).send({ "user": user.toJSON(), token })
    } catch (error: any) {
        error.statusCode = 400
        next(error)
    }

})

// login
router.post('/login', async (req, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ "user": user.toJSON(), token })
    } catch (error: any) {
        error.statusCode = 400
        next(error)
    }
})

export default router