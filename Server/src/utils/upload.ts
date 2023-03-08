import { resolve } from "path";
import multer from 'multer'

// Multer
var storage = multer.diskStorage({
	destination: resolve(__dirname + "/../../../images"),
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
	}
})
  
export const upload = multer({ storage: storage })