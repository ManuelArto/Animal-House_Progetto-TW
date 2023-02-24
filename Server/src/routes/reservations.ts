import express, { Router, Request, Response, NextFunction } from "express"
import { ErrorWrapper } from "../middleware/error"
import { authJwt, AuthRequest } from "../middleware/auth"
import { IUser } from "../model/user"
import { ReservationModel } from "../model/reservation"
import { FASCE_ORARIE } from "../utils/const"

export const router: Router = express.Router()

router.get('/list', authJwt(), async (req: Request, res: Response, next: NextFunction) => {
	try{
		const reservations = await ReservationModel.find()
			.populate("headQuarter")
			.populate("user")
			.populate("animal")
			.exec()

		res.json(reservations)
	} catch(error: any) {
		next(new ErrorWrapper({ statusCode: 500, error: error }))
	}
})

router.post('/:idSede/:serviceName/:number', authJwt(), async (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    const user: IUser = (req as AuthRequest).user
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

router.get('/:idSede/:serviceName/:number/fasceOrarie', authJwt(), async (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    try {
		const { idSede, serviceName, number } = req.params;
		const date = req.query.date ? new Date(req.query.date as string) : new Date();

		// Cerca tutte le prenotazioni per la sede, il servizio, il numero di prenotazione e la data specificati
		const reservations = await ReservationModel.find({
			idHeadQuarter: idSede,
			serviceName: serviceName,
			number: number,
			date: {
				$gte: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
				$lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
			}
		});

		// Estrae le fasce orarie delle prenotazioni trovate e sottrae dalle fasce orarie disponibili
		const reservedTimeSlots = reservations.map(reservation => reservation.fascia_oraria);
		const availableTimeSlots = FASCE_ORARIE.filter(fascia => !reservedTimeSlots.includes(fascia));

		// Ritorna solo le fasce orarie disponibili nella risposta alla richiesta
		res.status(201).json(availableTimeSlots);
    } catch (error: any) {
        next(new ErrorWrapper({ statusCode: 500, error: error }));
    }
})

// ADMIN ROUTES




export default router