import multer from 'multer'

// Multer
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'images')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
	}
})
  
export const upload = multer({ storage: storage })