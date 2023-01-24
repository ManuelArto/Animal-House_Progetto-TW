import express, { Router, Request, Response, NextFunction }  from "express"
import { authJwt, AuthRequest } from "../middleware/auth"
import { AnimalModel } from "../model/animal"
import { IUser } from '../model/user'

export const router: Router = express.Router()

router.get('/list', authJwt, async (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    const user: IUser = (req as AuthRequest).user
    const animals = await AnimalModel.find({ ownerId: user._id })

    res.json(animals)
})


export default router