import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

//createCategoryController
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Please fill the category name",
      });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).send({
        success: false,
        message: "This category is already exist",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(200).send({
      success: true,
      message: "new category added",
      category,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category Controller",
    });
  }
};

//updateCategoryController
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    ); 

    res.status(200).send({
      success: true,
      message: "Category Updated",
      category,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updateCategoryController",
      error,
    });
  }
};

//getAllCategoryController
export const getAllCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "Got all the categories",
      category,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getAllCategoryController",
      error,
    });
  }
};

//getSingleCategory
export const getSingleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    if (!category) {
      res.status(400).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Got the category",
      category,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getSingleCategoryController",
      error,
    });
  }
};

//deleteCategoryController
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in deleteCategoryController",
      error,
    });
  }
};
