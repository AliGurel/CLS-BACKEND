"use strict"

// const express = require("express")

//router da sadece URL ye hizmet eden bir application dur
//express.Router()

//normalde routing yaoarken;
// app.get('/', (req,res)=>{}) diyerek route larımızı tanımlıyordurk. Burada her method için ayrı bir app.get yapmamız gerecek, bu çok mantıklı değil. Alt alta 50 tane app.get olacak.Bunun çözümü bu routerlerı yeni bir yere taşımak.Ancak app.get ifadelerini yeni bir yere taşımak zor olur.MOdule export ile falan yapılabilir. Bu neden router application unu kullanacağız. 

const router = require("express").Router()
//buradaki router artık yönlendirme yapabileceğim bir değişkendir.Bundan sonra artık app.get gibi yaptığımız tüm işlemleri router.get gibi yapacağız.
// router.get('/', (req,res)=>res.send({message:'Home Area'}))
// router.get('/about', (req,res)=>res.send({message:'About Area'}))
// router.get('/user/:id', (req,res)=>res.send({message:'User Area'}))

//2.YONTEM
//router aşağıdaki gibi de tanımlanabilir;
//İki yöntemin en önemli farkı; bu yöntemin daha derli toplu olmasıdır, tek url ye birden fazla metod tanımlaması yapılabilir.Yukardaki gibi yaparsak kod uzar

const {middleFunc1, middleFunc2} = require('../middlewares/index')
router.use(middleFunc1,middleFunc2)

router.route('/')
    .get((req,res)=>res.send({message:'get'}))
    .post((req,res)=>res.send({message:'post'}))
    .put((req,res)=>res.send({message:'put'}))
    .delete((req,res)=>res.send({message:'delete'}))

//router ile yaptığımız yönlendirmeleri app anlasın diye ona bildirmemiz lazım;

module.exports = router