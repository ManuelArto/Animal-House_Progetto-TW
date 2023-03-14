import express, { Router, Request, Response, NextFunction } from "express"
import { ErrorWrapper } from "../middleware/error"
import { GameAnimalModel } from "../model/gameAnimal"

export const router: Router = express.Router()

router.get('/rand/:number', async (req: Request, res: Response, next: NextFunction) => {
    try {
		const sample = parseInt(req.params.number) || 10
        const gameAnimals = await GameAnimalModel.aggregate().sample(sample)

        res.json(gameAnimals)
    } catch (error: any) {
        next(new ErrorWrapper({ statusCode: 500, error: error }))
    }

})

export default router