"use strict"

//?CONTROLLERS

const Todo = require('../models/todo.model')// veri tabanı işlemleri için model import edildi. 

module.exports = {

    list: async(req,res)=>{
        //const data = await Todo.findAll()
        const data = await Todo.findAndCountAll()
        res.status(200).send({
            error:false,
            result:data
        })

    },
    create: async (req,res)=>{ //async olayı Sequelize e özel, mongoda yok
        //?veri almanın uzun hali aşağıdaki gibi
        // const receivedData = req.body //datayı req.body den al
        // const data = await Todo.create({
        //     // title: receivedData.title,
        //     title: req.body.title,
        //     description : receivedData.description,
        //     priority : receivedData.priority,
        //     isDone: receivedData.isDone
        // })
        //? veri almanın kısa hali;
        const data = await Todo.create(req.body)
    
        // console.log(data); // clg yaparsak dönen datanın dataValues içinde olduğunu görüyoruz, bunu da aşağıda kullanıcaz
        res.status(201).send({
            error:false,
            result: data.dataValues
        })
    },
    read: async (req,res)=>{
        // const data = await Todo.findOne({ where: {id: req.params.id}})
        const data = await Todo.findByPk(req.params.id) // yukardakiyle aynı işi yapar
    
        res.status(200).send({
            error:false,
            result: data
        })
    },
    update: async (req,res)=>{
        //const data = await Todo.update({ ...neyle güncellicez...}, { ... nereyi güncellicez...}})
        const data = await Todo.update(req.body, { where: {id: req.params.id}})
    
        res.status(202).send({
            error: false,
            message : 'Updated',
            body: req.body,// gönderdiğim yeni veriyi gösterir
            result: data, // güncellenen veri sayısını verir
            new: await Todo.findByPk(req.params.id) // güncellendikten sonraki veriyi gösterir
        })
    },
    delete: async (req,res)=>{

        //const data = await Todo.destroy({ ...hangi kaydı silicez...})
        const data = await Todo.destroy({ where: { id: req.params.id}})
        console.log(data);// silinen kayıt sayısını konsola verir
    
        //204 NO CONTENT => bu statuscode ekrana çıktı vermeyebilir, içeriği sildiği için,
        // o nedenle ya 204 dışında bir statuscode vericez veya bunu if kontrolüyle yapıcaz aşağıdaki gibi
        // res.status(204).send({
        //     error: false,
        //     message: 'Deleted',
        //     result: data
        // })
    
        if (data>0){ //silme gerçekleşti ise
            //res.status(204).send()// aşağıdaki de aynı işi yapar, send olmazsa istek döngüde kalır
            //sadece statuscodu çıktı vermek için aşağıdaki yazılır
            res.sendStatus(204)
        } else{ // silme gerekleşmedi ise
            // res.status(404).send({
            //     error: true,
            //     result: data
            // })
            //yukarıdaki gibi de yapabiliriz, aşağıdaki gibi de
            // eror handlera da havale edebiliriz, 
            res.errorStatusCode = 404
            throw new Error('Not Found')
        }
    
    }

}