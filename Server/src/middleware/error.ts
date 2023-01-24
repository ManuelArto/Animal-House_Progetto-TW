import { Request, Response, NextFunction } from "express"

// Error handling Middleware functions

export const errorLogger = () => (error: any, req: Request, res: Response, next: NextFunction) => {
	console.error(`⚡️[ERROR] Type: ${error.constructor.name}, Message: ${error.message}`)
	if (process.env.NODE_ENV !== 'production')
		console.log(error.stack);

	next(error)
}

export const errorResponder = () => (error: any, req: Request, res: Response, next: NextFunction) => {
	res.status(error.statusCode || 500).json({
		response: 'Error',
		error: {
			type: error.constructor.name,
			path: req.path,
			statusCode: error.statusCode || 500,
			message: error.message
		}
	});
};