import express, { Router, Request, Response, NextFunction } from "express"
import { AdminAuthRequest, authJwt, AuthRequest } from "../middleware/auth"
import { ErrorWrapper } from "../middleware/error"
import { ScoreModel } from "../model/score"
import { IUser } from "../model/user"

export const router: Router = express.Router()

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
	try{
		const scores = await ScoreModel.find().sort({ punteggio: -1 })
            .populate("user")
            .exec()

		res.json(scores)
	} catch(error: any) {
		next(new ErrorWrapper({ statusCode: 500, error: error }))
	}
})

router.post('', authJwt(), async(req: Request | AuthRequest, res: Response, next: NextFunction) => {
    const user: IUser = (req as AuthRequest).user

    try {
        const newScore = new ScoreModel({ ...req.body, user: user._id })

        await newScore.save()
        res.status(201).json({message: "Nuovo punteggio salvato"})
    } catch (error: any) {
        next(new ErrorWrapper({ statusCode: 500, error: error }))
    }
})

// ADMIN ROUTES

router.delete('/:id', authJwt(true), async (req: Request | AdminAuthRequest, res: Response, next: NextFunction) => {
	ScoreModel.findByIdAndDelete(req.params.id)
        .then((score) => {
            if (!score)
                throw new ErrorWrapper({ statusCode: 404, errorType: "NoScoreFound", errorMsg: "No score with that id" })

            res.json({ message: `Score successfully deleted` })
        }).catch((error: any) => {
            next(new ErrorWrapper({statusCode: 400, error: error}))
        })
})

export default router