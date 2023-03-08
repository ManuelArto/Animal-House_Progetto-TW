import express, { Router, Request, Response, NextFunction } from "express"
import { ErrorWrapper } from "../middleware/error"
import { AdminAuthRequest, authJwt, AuthRequest } from "../middleware/auth"
import { OrderModel } from "../model/order"
import { IUser } from "../model/user"

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

router.delete('/:id', authJwt(true), async (req: Request | AdminAuthRequest, res: Response, next: NextFunction) => {
	OrderModel.findByIdAndDelete(req.params.id)
        .then((order) => {
            if (!order)
                throw new ErrorWrapper({ statusCode: 404, errorType: "NoOrderFound", errorMsg: "No order with that id" })

            res.json({ message: `Order successfully deleted` })
        }).catch((error: any) => {
            next(new ErrorWrapper({statusCode: 400, error: error}))
        })
})

router.post('', authJwt(), async (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    const user: IUser = (req as AuthRequest).user
    try {
        const newOrder = new OrderModel({ ...req.body, user: user._id })
        await newOrder.save()
		
		await OrderModel.populate(newOrder, "user")

        res.status(201).json(newOrder)
    } catch (error: any) {
        next(new ErrorWrapper({ statusCode: 500, error: error }))
    }
})

export default router