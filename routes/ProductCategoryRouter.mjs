import express from "express";
const router = express.Router()
import ProductCategoryController from "../controllers/ProductCategoryController.mjs";

router.get("/", ProductCategoryController.index)
router.post("/store", ProductCategoryController.store)
router.get("/find/:id", ProductCategoryController.find)
router.put("/update/:id", ProductCategoryController.update)
router.delete("/destroy/:id", ProductCategoryController.destroy)

export default router