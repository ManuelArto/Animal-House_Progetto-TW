import express, { Router, Request, Response, NextFunction } from "express"
import { ErrorWrapper } from "../middleware/error"
import { HeadQuarterModel } from "../model/headquarters"

export const router: Router = express.Router()

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
	try{
		const headquarters = await HeadQuarterModel.find()

		res.json(headquarters)
	} catch(error: any) {
		next(new ErrorWrapper({ statusCode: 500, error: error }))
	}

})


export default router