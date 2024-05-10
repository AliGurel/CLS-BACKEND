"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Accept json data: 
app.use(express.json())

// Catch async-errors:
require('express-async-errors')

// app.all('/abc', (req, res) => { // Allow all methods. all -> URL=/ - use -> URL=/*
//     res.send('WELCOME TO TODO API')
// })
/* ------------------------------------------------------- */
/* ------------------------------------------------------- *
// MODELS:

const { Sequelize, DataTypes } = require('sequelize')
// sequelize instance oluştur:
const sequelize = new Sequelize('sqlite:./db.sqlite3')

// define methodu sequelize modeli oluşturur:
// her bir model, veritabanında bir tabloya denk gelir.
// sequelize.define('tableName', {  modelDetails  })

const Todo = sequelize.define('todos', {

    // ilk sutun olarak id sutunu sequelize tarafından otomatik oluşturulur/yönetilir.
    // anyField: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false, // default: true
    //     unique: true, // default: false
    //     comment: 'description',
    //     primaryKey: true, // default: false
    //     autoIncrement: true, // default: false
    //     field: 'custom_name',
    //     defaultValue: 'default', // default: null
    // },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: DataTypes.TEXT, // ShortHand Using.

    priority: { // -1: Low, 0: Norm, 1: High
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }

    //? Not need define createdAt & updatedAt fields.
    //? createdAt ve updatedAt tanımlamaya gerek yoktur. Sequelize otomatik oluşturur/yönetir.
})

// Syncronization:
// Model bilgilerini db'ye uygula:
// sequelize.sync() // CREATE TABLE, tablo zaten oluşmuşsa müdahale etmez, değişikliği algılamaz, veritabanı sıfırdan oluşturulacaksa kullanılır
// sequelize.sync({ force: true }) // DROP TABLE & CREATE TABLE, taboyu siler tekrar oluşturur.
// sequelize.sync({ alter: true }) // TO BACKUP & DROP TABLE & CREATE TABLE & FROM BACKUP, önce yedekler, sonra siler, sonra yeni tablo oluşturur sonra yedekten bilgileri yükler. Veritabanı varsa sürekli bu komutu kullan

// Connect to db:
sequelize.authenticate()
    .then(() => console.log('* DB Connected *'))
    .catch(() => console.log('* DB Not Connected *'))

/* ------------------------------------------------------- */


/* ------------------------------------------------------- *

// ROUTERS:

const router = express.Router()

// LIST TODOS:
router.get('/', async (req, res) => {

    // const data = await Todo.findAll()
    const data = await Todo.findAndCountAll()

    res.status(200).send({
        error: false,
        result: data
    })
})

//? CRUD Processes:

// CREATE TODO:
router.post('/', async (req, res) => {

    // const receivedData = req.body

    // const data = await Todo.create({
    //     title: receivedData.title,
    //     description: receivedData.description,
    //     priority: receivedData.priority,
    //     isDone: receivedData.isDone,
    //     // newKey: 'newValue' // Modelde tanımlanmadığı için bir işe yaramayacaktır.
    // })

    const data = await Todo.create(req.body) // yeni kayıt oluşturduk, yukarıdakiler uzun yötemdi

    res.status(201).send({
        error: false,
        result: data.dataValues
    })
})

// READ TODO:
router.get('/:id', async (req, res) => {

    // const data = await Todo.findOne({ where: { id: req.params.id } }) //klasik filtreleme
    const data = await Todo.findByPk(req.params.id) // id ile aramının kısa yolu

    res.status(200).send({
        error: false,
        result: data
    })

})

router.put('/:id', async (req,res)=>{
    //const data = Todo.update({ ...neyle güncellicez...}, { ... nereyi güncellicez...}})
    const data = await Todo.update(req.body, { where: {id: req.params.id}})

    res.status(202).send({
        error: false,
        message : 'Updated',
        body: req.body,// gönderdiğim yeni veriyi gösterir
        result: data, // güncellenen veri sayısı
        new: await Todo.findByPk(req.params.id) // güncellenmiş veriyi de gösterir
    })
})

// DELETE

router.delete('/:id', async (req,res)=>{

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

})


app.use(router)

/* ------------------------------------------------------- */
app.use(require('./todo.router'))


/* ------------------------------------------------------- */
const errorHandler = (err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode ?? 500
    console.log('errorHandler worked.')
    res.status(errorStatusCode).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        // stack: err.stack, // error details
    })
}
app.use(errorHandler)
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));