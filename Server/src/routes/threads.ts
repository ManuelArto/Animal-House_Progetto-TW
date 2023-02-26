import express, { Router, Request, Response, NextFunction } from "express"
import { AdminAuthRequest, authJwt, AuthRequest } from "../middleware/auth"
import { ErrorWrapper } from "../middleware/error"
import { ThreadModel } from "../model/thread"
import { IUser } from "../model/user"

export const router: Router = express.Router()

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const threads = await ThreadModel.find().sort({ createdAt: -1 })
            .populate("creator")
            .populate("messages.author")
            .exec()

        res.json(threads)
    } catch (error: any) {
        next(new ErrorWrapper({ statusCode: 500, error: error }))
    }
})

router.post('', authJwt(), async (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    const user: IUser = (req as AuthRequest).user
    try {
        const newThread = new ThreadModel({ ...req.body, creator: user._id })
        await newThread.save()
        
        await ThreadModel.populate(newThread, "creator")
        await ThreadModel.populate(newThread, "messages.author")

        res.status(201).json(newThread)
    } catch (error: any) {
        next(new ErrorWrapper({ statusCode: 500, error: error }))
    }
})

router.post('/:threadId/newMessage', authJwt(), async (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    const user: IUser = (req as AuthRequest).user

    try {
        const thread = await ThreadModel.findById(req.params.threadId)
        if (!thread)
            throw new ErrorWrapper({ statusCode: 404, errorType: "NoThreadFound", errorMsg: "No thread with that id" })

        thread.messages.push({ ...req.body, author: user._id })
        await thread.save()

        await ThreadModel.populate(thread, "creator")
        await ThreadModel.populate(thread, "messages.author")
        res.json(thread)
    } catch (error: any) {
        if (error instanceof ErrorWrapper)
            next(error)
        else
            next(new ErrorWrapper({ statusCode: 500, error: error }))
    }
})

// ADMIN ROUTES

router.delete('/:id', authJwt(true), async (req: Request | AdminAuthRequest, res: Response, next: NextFunction) => {
	ThreadModel.findByIdAndDelete(req.params.id)
        .then((thread) => {
            if (!thread)
                throw new ErrorWrapper({ statusCode: 404, errorType: "NoThreadFound", errorMsg: "No thread with that id" })

            res.json({ message: "Thread successfully deleted" })
        }).catch((error: any) => {
            next(new ErrorWrapper({statusCode: 400, error: error}))
        })
})

router.delete('/:threadId/:messageId', authJwt(true), async (req: Request | AdminAuthRequest, res: Response, next: NextFunction) => {
	try {
        const thread = await ThreadModel.findById(req.params.threadId)
        if (!thread)
            throw new ErrorWrapper({ statusCode: 404, errorType: "NoThreadFound", errorMsg: "No thread with that id" })

        thread.messages = thread.messages.filter((message) => message._id.toString() != req.params.messageId)

        await thread.save()

        res.json({ message: "Thread updated" })
    } catch (error: any) {
        if (error instanceof ErrorWrapper)
            next(error)
        else
            next(new ErrorWrapper({ statusCode: 500, error: error }))
    }
})


export default router