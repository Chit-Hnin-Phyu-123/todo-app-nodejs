
const Category = require("../models/category");
const ObjectId = require("mongoose").Types.ObjectId;

class CategoryController{

    static async getAllCategory(req, res){
        const categories = await Category.find();
        res.send(categories);
    }

    static async createCategory(req, res){
        const category = new Category({
            name: req.body.name,
        });
        const isSave = await category.save();
        if(isSave){
            res.send(category);
        }
    }

    static async updateCategory(req, res){
        const category = await Category.findById(req.body.id);
        category.name = req.body.name;
        const isSave = await category.save();
        if(isSave){
            res.send(category);
        }
    }

    static async deleteCategory(req, res){
        const category = await Category.findById(req.params.id);
        const isDelete = await category.deleteOne();
        if(isDelete){
            res.send("Deleted Successfully.");
        }
    }

}

module.exports = CategoryController;