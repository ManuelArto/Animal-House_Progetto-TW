import { Request, Response, NextFunction } from "express"

export class ErrorWrapper {
	statusCode: number
	error: Error
	errorType?: string

	constructor(statusCode: number, error: Error, errorType?: string) {
		this.error = error
		this.statusCode = statusCode
		this.errorType = errorType
	}
}

// Error handling Middleware functions

export const errorLogger = () => (errorWrapper: any, req: Request, res: Response, next: NextFunction) => {
	let error = errorWrapper
	let errorType
	if (errorWrapper instanceof ErrorWrapper) {
		error = errorWrapper.error
		errorType = error.constructor.name === 'Error' ? errorWrapper.errorType : error.constructor.name
	} else {
		errorType = error.constructor.name
	}

	console.error(`⚡️[ERROR] Type: ${errorType}, Message: ${error.message}`)
	if (process.env.NODE_ENV !== 'production')
		console.error(error.stack)

	next(errorWrapper)
}

export const errorResponder = () => (errorWrapper: any, req: Request, res: Response, next: NextFunction) => {
	const statusCode = errorWrapper.statusCode || 500
	let error = errorWrapper
	let errorType
	if (errorWrapper instanceof ErrorWrapper) {
		error = errorWrapper.error
		errorType = error.constructor.name === 'Error' ? errorWrapper.errorType : error.constructor.name
	} else {
		errorType = error.constructor.name
	}

	res.status(statusCode).json({
		response: 'Error',
		error: {
			type: errorType,
			path: req.path,
			statusCode: statusCode,
			message: error.message
		}
	})
}