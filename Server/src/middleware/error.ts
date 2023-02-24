import { Request, Response, NextFunction } from "express"

interface ErrorWrapperParams {
	statusCode: number
	error?: Error
	errorType?: string
	errorMsg?: string
}

export class ErrorWrapper {
	statusCode: number
	error: Error
	errorType?: string

	constructor({statusCode, error, errorType, errorMsg}: ErrorWrapperParams) {
		this.error = error || new Error(errorMsg)
		this.statusCode = statusCode
		this.errorType = errorType
	}
}

// Error handling Middleware functions

export const errorLogger = () => (errorWrapper: any, req: Request, res: Response, next: NextFunction) => {
	if (!(errorWrapper instanceof ErrorWrapper))
		errorWrapper = new ErrorWrapper({ statusCode: 500, error: errorWrapper })
	
	const error = errorWrapper.error
	const errorType = errorWrapper.errorType || error.constructor.name

	console.error(`⚡️[ERROR] Type: ${errorType}, Message: ${error.message}`)
	if (process.env.NODE_ENV !== 'production')
		console.error(error.stack)

	next(errorWrapper)
}

export const errorResponder = () => (errorWrapper: any, req: Request, res: Response, next: NextFunction) => {
	const statusCode = errorWrapper.statusCode || 500
	const error = errorWrapper.error
	const errorType = errorWrapper.errorType || error.constructor.name

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