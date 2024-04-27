const Category = require('../models/category');
const ObjectId = require("mongoose").Types.ObjectId;

class WebCategoryController{
    static async create(req, res){
        res.render('create_category.ejs');
    }
    static async store(req, res){
        
        const category = new Category({
            name: req.body.name,
        });

        try{
            const isSave = await category.save();
            if(isSave){
                req.flash('success', 'created successfully.');
                res.redirect('/web/home');
            }else{
                req.flash('success', 'create fail!!!');
                res.redirect('/web/home');
            }
        }catch(e){
            req.flash('success', 'create fail!!!');
            res.redirect('/web/home');
        }
    }

    static async edit(req, res){
        const category = await Category.findById(req.params.id);
        res.render('edit_category.ejs', { category });
    }
    static async update(req, res){
        const category = await Category.findById(req.body.id);
        category.name = req.body.name;
        try{
            const isSave = await category.save();
            if(isSave){
                req.flash('success', 'updated successfully.');
                res.redirect('/web/home');
            }else{
                req.flash('success', 'update fail!!!');
            res.redirect('/web/home');
            }
        }catch(e){
            req.flash('success', 'update fail!!!');
            res.redirect('/web/home');
        }
    }
    static async delete(req, res){
        const category = await Category.findById(req.params.id);
        try{
            const isDelete = await category.deleteOne();
            if(isDelete){
                req.flash('success', 'deleted successfully.');
                res.redirect('/web/home');
            }else{
                req.flash('success', 'delete fail!!!');
                res.redirect('/web/home');
            }
        }catch(e){
            req.flash('success', 'delete fail!!!');
            res.redirect('/web/home');
        }
    }
}
module.exports = WebCategoryController;