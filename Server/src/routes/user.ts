import express, { Router, Request, Response, NextFunction } from "express"
import { IUser, UserModel } from '../model/user'
import { ErrorWrapper } from "../middleware/error"
import { authJwt, AuthRequest } from "../middleware/auth"
import { adminAuthJwt, AdminAuthRequest } from "../middleware/adminAuth"

export const router: Router = express.Router()

// verify and refresh token
router.get('/refreshToken', authJwt, async (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user: IUser = (req as AuthRequest).user
        const token = await user.generateAuthToken()

        res.json({ user: user.toJSON(), token: token })
        
    } catch (error: any) {
        next(new ErrorWrapper({statusCode: 400, error: error}))
    }
})

// signup
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const user = new UserModel(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).json({ user: user.toJSON(), token: token })
    } catch (error: any) {
        next(new ErrorWrapper({statusCode: 400, error: error}))
    }

})

// login
router.post('/login', async (req, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.json({ user: user.toJSON(), token: token })
    } catch (error: any) {
        next(new ErrorWrapper({statusCode: 400, error: error}))
    }
})

// update
router.patch('/update', authJwt, async (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user: IUser = (req as AuthRequest).user
        const updates = Object.keys(req.body)
        updates.forEach(update => {
            (user as any)[update] = req.body[update]
        });

        await user.save()
        res.json({ user: user.toJSON(), message: "Dati utente modificati con successo" })
    } catch (error: any) {
        next(new ErrorWrapper({statusCode: 400, error: error}))
    }
})


// ADMIN ROUTES

router.get('/list', adminAuthJwt, async (req: Request | AdminAuthRequest, res: Response, next: NextFunction) => {
	try{
		const users = await UserModel.find()

		res.json(users)
	} catch(error: any) {
		next(new ErrorWrapper({ statusCode: 500, error: error }))
	}
})

router.patch('/:id', adminAuthJwt, async (req: Request | AdminAuthRequest, res: Response, next: NextFunction) => {
	UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
		.then((user) => {
			if (!user)
				throw new ErrorWrapper({ statusCode: 404, errorType: "NoUserFound", errorMsg: "No user with that id" })
        	
			res.json({ user, message: "Dati utente modificati con successo" })
    	}).catch((error: any) => {
        	next(new ErrorWrapper({statusCode: 400, error: error}))
    	})
})

router.delete('/:id', adminAuthJwt, async (req: Request | AdminAuthRequest, res: Response, next: NextFunction) => {
	UserModel.findByIdAndDelete(req.params.id, )
	.then((user) => {
        if (!user)
            throw new ErrorWrapper({ statusCode: 404, errorType: "NoUserFound", errorMsg: "No user with that id" })

        res.json({ message: `${user.username} successfully deleted` })
	}).catch((error: any) => {
		next(new ErrorWrapper({statusCode: 400, error: error}))
	})
})


export default router