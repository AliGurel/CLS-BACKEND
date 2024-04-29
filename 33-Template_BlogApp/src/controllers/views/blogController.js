"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// https://mongoosejs.com/docs/queries.html

// Catch async-errors and send to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */

// Call Models:
const { BlogCategory, BlogPost } = require('../../models/blogModel')


// ------------------------------------------
// BlogCategory
// ------------------------------------------
module.exports.BlogCategory = {

    list: async (req, res) => {

        // const data = await BlogCategory.find()
        const data = await res.getModelList(BlogCategory)

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },

    create: async (req, res) => {

        const data = await BlogCategory.create(req.body)

        res.status(201).send({
            error: false,
            body: req.body,
            result: data,
        })
    },

    read: async (req, res) => {

        // req.params.categoryId
        // const data = await BlogCategory.findById(req.params.categoryId)
        const data = await BlogCategory.findOne({ _id: req.params.categoryId })

        res.status(200).send({
            error: false,
            result: data
        })

    },

    update: async (req, res) => {
        
        // const data = await BlogCategory.findByIdAndUpdate(req.params.categoryId, req.body, { new: true }) // return new-data
        const data = await BlogCategory.updateOne({ _id: req.params.categoryId }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            body: req.body,
            result: data, // update infos
            newData: await BlogCategory.findOne({ _id: req.params.categoryId })
        })

    },

    delete: async (req, res) => {
        
        const data = await BlogCategory.deleteOne({ _id: req.params.categoryId })

        res.sendStatus( (data.deletedCount >= 1) ? 204 : 404 )

    },
}


// ------------------------------------------
// BlogPost
// ------------------------------------------
module.exports.BlogPost = {

    list: async (req, res) => {

        const data = await res.getModelList(BlogPost, { published: true }, 'blogCategoryId')

        // res.status(200).send({
        //     error: false,
        //     count: data.length,
        //     details: await res.getModelListDetails(BlogPost),
        //     result: data,
        // })
        const categories = await BlogCategory.find()
        // son yayınlanan 3 bloğu aldık
        const recentPosts = await BlogPost.find().sort({ createdAt : 'desc'}).limit(3)
        const pageUrl = req.originalUrl.replace(/[?|&]page=([^&]+)/gi, '')
        res.render('index', {
            user: req.session?.user, //kullanıcı vr mı yokmu bu şekilde anlayabiliriz
            categories, 
            posts: data, 
            recentPosts,
            details: await res.getModelListDetails(BlogPost, { published: true }),
            pageUrl: (pageUrl.includes('?') ? pageUrl : pageUrl+'?')
        })
    },

    listCategoryPosts: async (req, res) => {

        const data = await BlogPost.find({ blogCategoryId: req.params.categoryId }).populate('blogCategoryId')

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },

    // CRUD ->

    create: async (req, res) => {
        
        // const data = await BlogPost.create({
        //     fieldName: 'value',
        //     fieldName: 'value',
        //     fieldName: 'value',
        // })
        

        // res.status(201).send({
        //     error: false,
        //     body: req.body,
        //     result: data,
        // })
        if (req.method == 'POST') {

            req.body.userId = req.session.user.id
        
            const data = await BlogPost.create(req.body)

            res.redirect('/')

        } else {
            
            res.render('postForm', {
                post: null,
                categories: await BlogCategory.find()
            })
        }
    },

    read: async (req, res) => {

        // req.params.postId
        // const data = await BlogPost.findById(req.params.postId)
        const data = await BlogPost.findOne({ _id: req.params.postId }).populate('blogCategoryId') // get Primary Data
        // console.log(data)

        // res.status(200).send({
        //     error: false,
        //     result: data
        // })

        res.render('postRead', { post: data })

    },

    update: async (req, res) => {

        if(req.method == 'POST'){
            const data = await BlogPost.updateOne({ _id: req.params.postId }, req.body, { runValidators: true })

            // res.status(202).send({
            //     error: false,
            //     body: req.body,
            //     result: data, // update infos
            //     newData: await BlogPost.findOne({ _id: req.params.postId })
            // })
            res.redirect('/')
        } else {
            res.render('postForm', {
                post: await BlogPost.findOne({ _id: req.params.postId }),
                categories: await BlogCategory.find(),
            })
        }



    },

    delete: async (req, res) => {
        
        const data = await BlogPost.deleteOne({ _id: req.params.postId })

        // res.sendStatus( (data.deletedCount >= 1) ? 204 : 404 )

        res.redirect('/')

    },
}