import { Request, Response, NextFunction } from "express"

// Error handling Middleware functions

export const errorLogger = () => (error: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(`⚡️[ERROR] ${error.message}`)
	next(error)
}

export const errorResponder = () => (error: any, req: Request, res: Response, next: NextFunction) => {
	res.header("Content-Type", 'application/json')

	const status = error.status || 400
	res.status(status).send({ error: error, message: error.message })
}
