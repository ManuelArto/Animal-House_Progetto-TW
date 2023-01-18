import express, { Router, Request, Response }  from "express";
const User = require('../model/user')

export const router: Router = express.Router();

// signup
router.post('/signup', async (req: Request, res: Response) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }

})

// login
router.post('/login', async (req, res: Response) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router