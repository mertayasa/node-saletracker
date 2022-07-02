import express from "express";
import ProductController from "../controllers/ProductController.mjs";
const router = express.Router()

router.get('/', ProductController.index)
router.post('store', ProductController.store)
router.get('/find/:id', ProductController.find)
router.put('/update/:id', ProductController.update)
router.delete('/destroy/:id', ProductController.destroy)

export default router