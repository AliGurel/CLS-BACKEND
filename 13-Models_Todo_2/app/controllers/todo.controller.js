"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const Todo = require('../models/todo.model') // veri tabanı işlemleri için model import edildi. 

// CONTROLLERS

module.exports = {

    //LISTELEME
    list: async (req, res) => {

    // const data = await Todo.findAll()
    const data = await Todo.findAndCountAll()

    res.status(200).send({
        error: false,
        result: data
    })
    },

    //CRUD
    create: async (req, res) => {

        // const receivedData = req.body
    
        // const data = await Todo.create({
        //     title: receivedData.title,
        //     description: receivedData.description,
        //     priority: receivedData.priority,
        //     isDone: receivedData.isDone,
        //     // newKey: 'newValue' // Modelde tanımlanmadığı için bir işe yaramayacaktır.
        // })
    
        const data = await Todo.create(req.body) // yeni kayıt oluşturduk(veri ekleme yaptı), yukarıdakiler uzun yötemdi
    
        res.status(201).send({
            error: false,
            result: data.dataValues
        })
    },

    read:async (req, res) => {

        // const data = await Todo.findOne({ where: { id: req.params.id } }) //klasik filtreleme
        const data = await Todo.findByPk(req.params.id) // id ile aramının kısa yolu
    
        res.status(200).send({
            error: false,
            result: data
        })
    
    },

    update: async (req,res)=>{
        //const data = Todo.update({ ...neyle güncellicez...}, { ... nereyi güncellicez...}})
        const data = await Todo.update(req.body, { where: {id: req.params.id}})
    
        res.status(202).send({
            error: false,
            message : 'Updated',
            body: req.body,// gönderdiğim yeni veriyi gösterir
            result: data, // güncellenen veri sayısı
            new: await Todo.findByPk(req.params.id) // güncellenmiş veriyi de gösterir
        })
    },

    delete:async (req,res)=>{

        //const data = Todo.destroy({ ...hangi kaydı silicez...})
        const data = await Todo.destroy({ where: { id: req.params.id}})
        console.log(data);// silinn kayıt sayısını konsola verir
    
        //204 NO CONTENT => ekrana çıktı vrmeyebilir, içeriği sildiği için
        // res.status(204).send({
        //     error: false,
        //     message: 'Deleted',
        //     result: data
        // })
    
        if (data>0){ //silme gerçekleşti ise
            //res.status(204).send()// aşağıdaki de aynı işi yapar, send olmazsa istek döngüde kalır
            res.sendStatus(204).send()
        } else{ // silme gerekleşmedi ise
            // res.status(404).send({
            //     error: true,
            //     result: data
            // })
    
            // eror handlera da havale edebiliriz, yukarıdaki de farklı bir yöntem
            res.errorStatusCode = 404
            throw new Error('Not Found')
        }
    
    }
}