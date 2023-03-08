import express, { Router, Request, Response, NextFunction } from "express"
import { AdminAuthRequest, authJwt, AuthRequest } from "../middleware/auth"
import { ErrorWrapper } from "../middleware/error"
import { AnimalModel } from "../model/animal"
import { upload } from "../utils/upload"
import { ReservationModel } from "../model/reservation"
import { IUser } from '../model/user'

export const router: Router = express.Router()

router.get('/list', authJwt(), async (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    const user: IUser = (req as AuthRequest).user
    try {
        const animals = await AnimalModel.find({ ownerId: user._id })
        res.json(animals)
    } catch (error: any) {
        next(new ErrorWrapper({ statusCode: 500, error: error }))
    }

})

router.get('/:animalId', authJwt(), async (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    const user: IUser = (req as AuthRequest).user

    try {
        const animal = await AnimalModel.findOne({ ownerId: user._id, _id: req.params.animalId })

        if (!animal)
            throw new ErrorWrapper({ statusCode: 404, errorType: "NoAnimalFound", errorMsg: "No animal with that id" })

        res.json(animal)
    } catch (error: any) {
        if (error instanceof ErrorWrapper)
            next(error)
        else
            next(new ErrorWrapper({ statusCode: 500, error: error }))
    }
})

router.delete('/:animalId', authJwt(), async (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    const user: IUser = (req as AuthRequest).user

    try {
        const animal = await AnimalModel.findOneAndDelete({ ownerId: user._id, _id: req.params.animalId })
        if (!animal)
            throw new ErrorWrapper({ statusCode: 404, errorType: "NoAnimalFound", errorMsg: "No animal with that id" })

        // Elimino le prenotazioni per questo animale
        await ReservationModel.deleteMany({ animal: req.params.animalId })

        res.json({ message: `${animal.name} successfully deleted` })
    } catch (error: any) {
        if (error instanceof ErrorWrapper)
            next(error)
        else
            next(new ErrorWrapper({ statusCode: 500, error: error }))
    }
})

router.post('', authJwt(), upload.single('pet-image-file'), async (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    const user: IUser = (req as AuthRequest).user

    try {
        const file = req.file!
        const newAnimal = new AnimalModel({ ...req.body, ownerId: user.id, imageURI: `/images/${file.path}` })

        await newAnimal.save()
        res.status(201).json(newAnimal)
    } catch (error: any) {
        next(new ErrorWrapper({ statusCode: 500, error: error }))
    }
})


// ADMIN ROUTES

router.get('/list/all', authJwt(true), async (req: Request | AdminAuthRequest, res: Response, next: NextFunction) => {
	try{
		const animals = await AnimalModel.find()

		res.json(animals)
	} catch(error: any) {
		next(new ErrorWrapper({ statusCode: 500, error: error }))
	}
})


export default router