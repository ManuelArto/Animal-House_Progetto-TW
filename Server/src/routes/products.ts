import express, { Router, Request, Response, NextFunction } from "express"
import { adminAuthJwt, AdminAuthRequest } from "../middleware/adminAuth"
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

router.get('/categories/list', async (req: Request, res: Response, next: NextFunction) => {
	try{
		const categories = await ProductModel.distinct("category")

		res.json(categories)
	} catch(error: any) {
		next(new ErrorWrapper({ statusCode: 500, error: error }))
	}
})

router.get('/list/rand/:number', async (req: Request, res: Response, next: NextFunction) => {
	try{
		const products = await ProductModel.aggregate().sample(parseInt(req.params.number))

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

// ADMIN ROUTES

router.post('', adminAuthJwt, async (req: Request | AdminAuthRequest, res: Response, next: NextFunction) => {
	try {
        const newProduct = new ProductModel({ ...req.body })

        await newProduct.save()
        res.status(201).json(newProduct)
	} catch (error: any) {
		next(new ErrorWrapper({statusCode: 400, error: error}))
	}
})

router.patch('/:id', adminAuthJwt, async (req: Request | AdminAuthRequest, res: Response, next: NextFunction) => {
	try {
		const product = await ProductModel.findOne({ _id: req.params.id})
	
		if (!product)
			throw new ErrorWrapper({ statusCode: 404, errorType: "NoProductFound", errorMsg: "No product with that id" })

		const updates = Object.keys(req.body)
		updates.forEach(update => {
			(product as any)[update] = req.body[update]
		});

		await product.save()
		res.json({ product, message: "Prodotto modificato con successo" })
	} catch (error: any) {
		next(new ErrorWrapper({statusCode: 400, error: error}))
	}
})

router.delete('/:id', adminAuthJwt, async (req: Request | AdminAuthRequest, res: Response, next: NextFunction) => {
	try {
		const product = await ProductModel.findOneAndDelete({ _id: req.params.id })
        if (!product)
            throw new ErrorWrapper({ statusCode: 404, errorType: "NoProductFound", errorMsg: "No product with that id" })

        res.json({ message: `${product.name} successfully deleted` })
	} catch (error: any) {
		next(new ErrorWrapper({statusCode: 400, error: error}))
	}
})


export default router