import express, { Router, Request, Response, NextFunction } from "express"
import { ErrorWrapper } from "../middleware/error"
import { authJwt } from "../middleware/auth"
import { OrderModel } from "../model/order"

export const router: Router = express.Router()

router.get('/list', authJwt(true), async (req: Request, res: Response, next: NextFunction) => {
	try{
		const orders = await OrderModel.find()
			.populate("user")
			.exec()

		console.log(orders)

		res.json(orders)
	} catch(error: any) {
		next(new ErrorWrapper({ statusCode: 500, error: error }))
	}
})


export default router