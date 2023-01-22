import express, { Router, Request, Response }  from "express";
import { constants } from '../utils/const'
import { UserModel } from '../model/user'

export const router: Router = express.Router();

// signup
router.post('/register', async (req: Request, res: Response) => {
    const user = new UserModel(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()

        // storing our JWT web token as a cookie in our browser
        res.cookie('token',token,{ maxAge: constants.maxAgeToken, httpOnly: true });  // maxAge: 4 hours
        
        res.status(201).send({...user.toJSON(), token })
    } catch (error: any) {
        res.status(400).send( {error: error, message: error.message} )
    }

})

// login
router.post('/login', async (req, res: Response) => {
    try {
        const user = await UserModel.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
         
        res.send({ ...user.toJSON(), token })
    } catch (error: any) {
        res.status(400).send( {error: error, message: error.message} )
    }
})

export default router