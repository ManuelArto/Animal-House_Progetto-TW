import express, { Router, Request, Response }  from "express";
import { AuthRequest } from '../utils/auth';
import Auth = require('../utils/auth')
const User = require('../models/user')

export const router: Router = express.Router();

//signup
router.post('/users', async (req: Request, res: Response) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }

})

//login

router.post('/users/login', async (req, res: Response) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

//logout
router.post('/users/logout', Auth, async (req: AuthRequest, res: Response) => {
   
    try {
       req.user.tokens =  req.user.tokens.filter((token) => {
            return token.token !== req.token 
        })

        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//Logout All 
router.post('/users/logoutAll', Auth, async(req: AuthRequest, res: Response) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()        
    }
})
module.exports = router