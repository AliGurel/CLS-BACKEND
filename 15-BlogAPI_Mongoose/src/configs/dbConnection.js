"use strict";
/* -------------------------------------------------------
    EXPRESSJS - MONGODB Mongoose
------------------------------------------------------- */
// $ npm i mongoose demek lazım terminalden

//ODM i yani mongoose u import ediyoruz
const mongoose = require('mongoose')
//require('dotenv').config() // buna gerek yok çnkü index js de zaten çalıştırdık bunu

//mongoose.connect('mongodb://localhost:27017/blogAPI') // blogAPI DB olmasa da kendisi oluşturuyor


const MONGODB = process.env.MONGODB //DB adresi (connection String) .env dosyasından çekiliyor
//Connection Stringlere, VSC deki mongoDB ikonundaki istediğimz DB ye sağ tıklayıp Copy Connection String diyebiliriz
//DB adresini şirketin vermesi lazım

//mongoose.connect('mongodb://localhost:27017/blogAPI')
mongoose.connect(MONGODB)
    .then(()=>{console.log('DB Connected')})
    .catch((err)=>{console.log('DB NOT-Connected', err)})


