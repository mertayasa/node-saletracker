import multer from "multer"
import path from "path"

const imageStorage = multer.diskStorage({
	// Destination to store image     
	destination: 'public/images/uploads',
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '_' + Date.now()
			+ path.extname(file.originalname))
		// file.fieldname is name of the field (image)
		// path.extname get the uploaded file extension
	}
})

const imageUpload = multer({
	storage: imageStorage,
	limits: {
		fileSize: 10000000 // 1000000 Bytes = 1 MB
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(png|jpg|svg|jpeg|gif)$/)) {
			return cb(new Error('Please upload a Image'))
			// upload only png and jpg format
		}
		cb(undefined, true)
	}
})

export default imageUpload