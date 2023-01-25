import express, { Router, Request, Response, NextFunction } from "express"
import { authJwt, AuthRequest } from "../middleware/auth"
import { ErrorWrapper } from "../middleware/error"
import { ScoreModel } from "../model/score"
import { IUser } from "../model/user"

export const router: Router = express.Router()

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
	try{
		const scores = await ScoreModel.find()

		res.json(scores)
	} catch(error: any) {
		next(new ErrorWrapper({ statusCode: 500, error: error }))
	}

})

router.post('', authJwt, async(req: Request | AuthRequest, res: Response, next: NextFunction) => {
    const user: IUser = (req as AuthRequest).user

    try {
        const newScore = new ScoreModel({ ...req.body, name: user.name })

        await newScore.save()
        res.status(201).json(newScore)
    } catch (error: any) {
        next(new ErrorWrapper({ statusCode: 500, error: error }))
    }
})

export default router