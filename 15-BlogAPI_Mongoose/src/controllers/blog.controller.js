/* ===============================================*/
/*               BLOG API CONTROLLERS            */
/* ===============================================*/

'use strict'

require("express-async-errors")
const {BlogCategory, BlogPost} = require('../models/blog.model')

module.exports.BlogCategory = {
    list: async(req,res)=>{
        // const data = await BlogCategory.find()
        const data = await res.getModelList(BlogCategory)
        res.status(200).send({
            error:false,
            details : await res.getModelListDetails(BlogCategory), // findSearch middleware inden geldi fonk
            data:data
        })
    },
    create: async(req,res)=>{
        const data = await BlogCategory.create(req.body)
        res.status(201).send({
            error:false,
            body: req.body,
            data:data
        })
    },
    update: async(req,res)=>{
        const data = await BlogCategory.updateOne({_id:req.params.categoryId},req.body)
        const newdata = await BlogCategory.find({_id:req.params.categoryId}) // güncellenen veriyi görmek için bu eklenebilir
        res.status(202).send({
            error:false,
            body: req.body,
            data:data,
            //güncel veriyi istiyorsan yeniden çağırmak lazım
            newdata: newdata
        })
    },
    delete: async(req,res)=>{
        const data = await BlogCategory.deleteOne({_id:req.params.categoryId}) 
        res.sendstatus((data.deletedCount >=1)? 204:404)
    },
    read: async(req,res)=>{
        const data = await BlogCategory.find({_id:req.params.categoryId})
        res.status(202).send({
            error:false,
            data:data
        })
    }
}

module.exports.BlogPost = {
    list: async(req,res)=>{

        /* FILTERING & SEARCHING & SORTING & PAGINATION *
        //http://127.0.0.1:8000/blog/posts?search[title]=test&filter[published]=1&sort[createdAt]=asc

        // FILTERING // URL?filter[key1]=value1&filter[key2]=value2
        const filter = req.query?.filter || {} // filterden veri gelmezse boş obje olarak kalsın

        //SEARCHING
        // URL?search[key1]=value1&search[key2]=value2
        // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
        const search = req.query?.search || {} // sonuc gelmezse boş obje kalsın
        //console.log(search)
        // URL query lerde true/false yazılmaz 1/0 yazılır

        //? { title: 'test', content: 'test' } -> { title: { $regex: 'test' }, content: { $regex: 'test' } }
        for (let key in search) {
            search[key] = { $regex: search[key], $options: 'i'} // büyük hafr küçük harf duyarlı değil olur options i ile beraber
        }
        //console.log(search)

        //SORTING
        // URL?sort[key1]=asc&sort[key2]=desc
        // asc: A-Z - desc: Z-A // asc:1 desc:-1 deprecated oldu
        const sort = req.query?.sort || {}
        //console.log(sort);

        //PAGINATION
        // URL?page=3&limit=10

        let limit = Number(req.query?.limit)
        limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20) // lmit 0 dan büyükse kabul et, değilse 20 olark default değer ata // env deki değerler her zaman str dir, o ndenle number a çevirdik
        console.log('limit', limit)

        //Page
        let page = Number(req.query?.page)
        // page = page > 0 ? page : 1
        page = page > 0 ? (page - 1) : 0 // Backend 'de sayfa sayısı her zmaan page-1 olarak hesaplanmalı.
        console.log('page', page)

        //SKIP
        // LIMIT 20, 10
        let skip = Number(req.query?.skip)
        skip = skip > 0 ? skip : (page * limit)
        console.log('skip', skip)


        /* FILTERING & SEARCHING & SORTING & PAGINATION */

        // const data = await BlogPost.find({ ...filter, ...search }).sort(sort).skip(skip).limit(limit) // yukarıda filtrelenen sonucu gösteriyor

        //res.getModelList dememizin sebebi middleware de getModelList fonk nunu res parametresine atamış olmamız
        const data = await res.getModelList(BlogPost, 'blogCategoryId') // blogCategoryId populate dir

        res.status(200).send({
            error:false,
            details : await res.getModelListDetails(BlogPost), // findSearch middleware inden geldi fonk
            data:data // key ve value isimleri aynıysa birini yazmak yeterli olur 
        })
    },
    create: async(req,res)=>{
        const data = await BlogPost.create(req.body)
        res.status(201).send({
            error:false,
            body: req.body,
            data:data
        })
    },
    update: async(req,res)=>{
        const data = await BlogPost.updateOne({_id:req.params.postId},req.body)
        const newdata = await BlogPost.find({_id:req.params.postId}) // güncellenen veriyi görmek için bu eklenebilir
        res.status(202).send({
            error:false,
            body: req.body,
            data:data,
            //güncel veriyi istiyorsan yeniden çağırmak lazım
            newdata: newdata
        })
    },
    delete: async(req,res)=>{
        const data = await BlogPost.deleteOne({_id:req.params.postId}) 
        res.sendStatus((data.deletedCount >=1)? 204:404)
    },
    read: async(req,res)=>{
        const data = await BlogPost.findOne({_id:req.params.postId}).populate('blogCategoryId')
        res.status(202).send({
            error:false,
            data:data
        })
    }
}