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
//? Form-Data  u kabul et ve onu objeye çevir demektir
app.use(express.urlencoded({extented: true}))


//open static files
// /static yolunu ./public/images yoluna yönlendirdi
app.use('/static', express.static('./public/images'))

app.all('/',(req,res)=>{
    res.send({
        body : req.body,
        message : 'Hello'
    })
})

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));