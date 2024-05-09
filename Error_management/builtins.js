"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BUILTIN MIDDLEWARES
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
//*DATA RECEIVING
//? JSON u kabul et ve onu objeye çevir demektir
app.use(express.json())
//? TEXT  u kabul et ve onu objeye çevir demektir
app.use(express.text())
//? Form-Data verilerini kabul et ve onu objeye çevir demektir
//extented: true ise array datayı kabul et ve tanı demektir
app.use(express.urlencoded({extented: true}))


//open static files
// /static yolunu ./public/images yoluna yönlendirdi
//yani URL den /static isteği gelince mona lisa resmi açılacak
app.use('/static', express.static('./public/images'))

app.all('/',(req,res)=>{
    res.send({
        body : req.body,
        message : 'Hello'
    })
})

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));