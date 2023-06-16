import express from "express";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { categoryController,deleteController, getController, getSingleController, updateCategoryController } from '../controllers/categoryController.js';


//route object
const router = express.Router()


//routes
//create category
router.post('/create-category',requireSignIn,isAdmin,categoryController)
//update category
router.put('/update-category/:id' , requireSignIn,isAdmin,updateCategoryController)

//get all category
router.get('/get-category',getController)

//get single item
router.get('/get-single-category/:slug',getSingleController)

//Delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteController)

export default router;
