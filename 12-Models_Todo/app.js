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
const { Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize('sqlite:./db.sqlite3')

//define metodu sequelize modeli oluşturur
// her bir model veritababında bir tabloya denk gelir

// define methodu sequelize modeli olusturur:
// her bir model, veritabaninda bir tabloya denk gelir.
// sequelize.define('tableName',{modelDetails})

const Todo = sequelize.define('todos',{
    //ilk sütun olarak id sütunu sequlize tarafından otomatk oluşturulup yönetilir
    // id : {
    //     type: DataTypes.INTEGER,
    //     allowNull: false, //default:true
    //     unique: true, // default: false
    //     comment: 'description',
    //     primaryKey: true, // default: false
    //     autoIncrement: true, // default: false
    //     field: 'custom_name',
    //     defaultValue: 'default', // default: null
    // }

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: DataTypes.TEXT, // kısa kullanım eğer sadece veri tipi verip başka özellik tanımlamayacaksak

    priority: {
        type: DataTypes.TINYINT,
        allowNull: false,
        default: 0
    },
    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
    }
    // diğerlerine gerek yok kendi tanımlıyor oto olarak

})

// Senkronizasyon yani model bilgilerini DB ye uygula
//sequelize.sync()// aynı adda tablo yoksa oluşturur, varsa işlem yapmaz
// sequelize.sync({force:true}) // aynı adda tablo varsa siler yeniden oluşturur, datalar varsa silinir
// sequelize.sync({alter:true}) // to backup , drop table, create table from backup, önceki veriler silinmez

// connect to db
sequelize.authenticate()
    .then(()=>console.log('**DB connected**'))
    .catch(()=>console.log('**DB Not Connected**'))

// ROUTERS

const router = express.Router()

//LIST TODOS
router.get('/',async(req,res)=>{
    //const data = await Todo.findAll()
    const data = await Todo.findAndCountAll()
    res.status(200).send({
        error:false,
        result:data
    })
})



router.post('/', async (req,res)=>{
    
    const receivedData = req.body
    const data = await Todo.create({
        title: receivedData.title,
        description : receivedData.description,
        priority : receivedData.priority,
        isDone: receivedData.isDone
    })
    res.status(201).send({
        error:false,
        result: data.dataValues
    })
})

// READ TODO
router.get('/:id', async (req,res)=>{
    // const data = await Todo.findOne({ where: {id: req.params.id}})
    const data = await Todo.findByPk(req.params.id) // yukardakiyle aynı işi yapar


    res.status(200).send({
        error:false,
        result: data
    })
})

app.use(router)


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