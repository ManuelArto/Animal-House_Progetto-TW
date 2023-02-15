import express, { Router, Request, Response, NextFunction } from "express"
import { ErrorWrapper } from "../middleware/error"
import { authJwt, AuthRequest } from "../middleware/auth"
import { IUser } from "../model/user"
import { ReservationModel } from "../model/reservation"

export const router: Router = express.Router()

router.get('/list', authJwt, async (req: Request, res: Response, next: NextFunction) => {
	try{
		const reservations = await ReservationModel.find()

		res.json(reservations)
	} catch(error: any) {
		next(new ErrorWrapper({ statusCode: 500, error: error }))
	}
})

router.post('/:idSede/:serviceName/:number', authJwt, async (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    const user: IUser = (req as AuthRequest).user
	console.log(req.body)
    try {
        const newReservation = new ReservationModel({ 
			...req.body, 
			idUser: user.id, 
			idHeadQuarter: req.params.idSede,
			serviceName: req.params.serviceName,
			number: req.params.number,
		})

        await newReservation.save()
        res.status(201).json({"reservation": newReservation, "message": "Nuova prenotazione aggiunta correttamente"})
    } catch (error: any) {
        next(new ErrorWrapper({ statusCode: 500, error: error }))
    }
})

// router.get('/:idSede/:serviceName/:serviceNumber/fasceOrarie')


export default router