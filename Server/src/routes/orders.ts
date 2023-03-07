import express, { Router, Request, Response, NextFunction } from "express"
import { ErrorWrapper } from "../middleware/error"
import { OrderModel } from "../model/order"

export const router: Router = express.Router()

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
	try{
		const orders = await OrderModel.find()
		res.json(orders)
	} catch(error: any) {
		next(new ErrorWrapper({ statusCode: 500, error: error }))
	}

})


export default router