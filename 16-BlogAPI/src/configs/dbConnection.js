"use strict";
/* -------------------------------------------------------
    EXPRESSJS - MONGODB Mongoose
------------------------------------------------------- */
// $ npm i mongoose demek lazım terminalden

const mongoose = require('mongoose')
//require('dotenv').config() // buna ferek yok çnkü index js de zaten çalıştırdık bunu

//mongoose.connect('mongodb://localhost:27017/blogAPI') // blogAPI DB olmasa da kendisi oluşturuyor


const MONGODB = process.env.MONGODB

mongoose.connect(MONGODB)
//mongoose.connect('mongodb://localhost:27017/blogAPI')
    .then(()=>{console.log('DB Connected')})
    .catch((err)=>{console.log('DB NOT-Connected', err)})


