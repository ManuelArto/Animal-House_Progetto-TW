import express, { Router, Request, Response, NextFunction } from "express"
import { ErrorWrapper } from "../middleware/error"
import { ProductModel } from "../model/product"

export const router: Router = express.Router()

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
	try{
		const products = await ProductModel.find()

		res.json(products)
	} catch(error: any) {
		next(new ErrorWrapper({ statusCode: 500, error: error }))
	}

})

router.get('/list/rand/:number', async (req: Request, res: Response, next: NextFunction) => {
	try{
		const products = await ProductModel.aggregate([ { $sample: {size: Number.parseInt(req.params.number)} } ])

		res.json(products)
	} catch(error: any) {
		next(new ErrorWrapper({ statusCode: 500, error: error }))
	}

})

router.get('/:productId', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await ProductModel.findOne({ _id: req.params.productId })
	
		if (!product)
			throw new ErrorWrapper({ statusCode: 404, errorType: "NoProductFound", errorMsg: "No product with that id" })
	
		res.json(product)
	} catch (error: any) {
        if (error instanceof ErrorWrapper)
            next(error)
        else
            next(new ErrorWrapper({statusCode: 500, error: error}))
	}
})

router.get('/:category/list', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const products = await ProductModel.find({ category: req.params.category })
		if (!products.length)
			throw new ErrorWrapper({ statusCode: 404, errorType: "NoProductsFound", errorMsg: "No products for this category" })
		
		res.json(products)
	} catch (error: any) {
        if (error instanceof ErrorWrapper)
            next(error)
        else
            next(new ErrorWrapper({statusCode: 500, error: error}))
	}
})


// router.post('', AuthAdvanced, async (req, res) => {})
// router.patch('/items/:id', AuthAdvanced, async (req, res) => {})
// router.delete('/items/:id', AuthAdvanced, async (req, res) => {})

export default router