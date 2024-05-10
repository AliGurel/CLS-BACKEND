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
//? app.all : Sadece belirtilen URL ye cevap verir, örn, yukarda /abc URL si için cevap verir, /abc/def gibi devam eden alt URL e cevap vermez
//? app.use : belirtilen URL ve bu URL nin alt yollarına da cevap verir, örn, /abc ve /abc/def/rt gibi /abc ile başlayan tüm alt path lere de cevap verir
/* ------------------------------------------------------- */
//npm i sequelize sqlite3 for SQLite DB

const { Sequelize, DataTypes} = require('sequelize')
// Sequelize bir motordur
const sequelize = new Sequelize('sqlite:./db.sqlite3') //sqlite: olması lazım, ./db.sqlite3 = yolu
// db.sqlite3 diye isim vermek şart değil, uzantısı sqşite3 olması iyi olur

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

    priority: { // -1 Low, 0: Normal, 1: High
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    // diğerlerine (createdAt ve upatedAt)gerek yok kendi tanımlıyor oto olarak

})

//? Senkronizasyon yapmak lazım model tanımından sonra, yani model bilgilerini DB ye uygula
//?ilk defa modeli uyguluyorsak aşağıdaki komutu yazmak yeterli
//?eğer yaptığımız modelde güncelleme yapacaksak alttaki alter:true olan kodu çalıştır
//sequelize.sync()// aynı isimli tablo yoksa oluşturur, varsa işlem yapmaz, açık kalsa da içindeki veliler kalır


// sequelize.sync({force:true}) // aynı adda tablo varsa siler yeniden oluşturur, datalar varsa silinir
// bu komudu örneğin fieldname lerde bi değişiklik yapacaksak kullanmalıyız
//Bu komut sürekli açık kalmamalı, yoksa DB deki var olan veriler silinir

// sequelize.sync({alter:true}) // to backup, drop table, create table from backup, önceki veriler silinmez
// bu komut ile fieldname vs güncellemeler yapılırken varolan veriler silinmez 


// connect to db
//async fonk olduğu için then ve catch ekliyormuşuz
//Mongoda bu yok, kendi bağlanıyomuş
sequelize.authenticate()
    .then(()=>console.log('**DB connected**'))
    .catch(()=>console.log('**DB Not Connected**'))

/*----------------------------------------------------------*/
// ROUTERS
const router = express.Router()

//LIST TODOS
router.get('/', async(req,res)=>{
    //const data = await Todo.findAll()
    const data = await Todo.findAndCountAll()
    res.status(200).send({
        error:false,
        result:data
    })
})


//CREATE new TODO
router.post('/', async (req,res)=>{ //async olayı Sequelize e özel, mongoda yok
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

//UPDATE TODO
router.put('/:id', async (req,res)=>{
    //const data = await Todo.update({ ...neyle güncellicez...}, { ... nereyi güncellicez...}})
    const data = await Todo.update(req.body, { where: {id: req.params.id}})

    res.status(202).send({
        error: false,
        message : 'Updated',
        body: req.body,// gönderdiğim yeni veriyi gösterir
        result: data, // güncellenen veri sayısını verir
        new: await Todo.findByPk(req.params.id) // güncellendikten sonraki veriyi gösterir
    })
})

// DELETE TODO
router.delete('/:id', async (req,res)=>{

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