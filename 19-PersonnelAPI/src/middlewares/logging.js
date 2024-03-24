"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
//? MORGAN LOGGING
//https://expressjs.com/en/resources/middleware/morgan.html
// https://github.com/expressjs/morgan
//? $ npm i morgan

const morgan = require('morgan') //morgan bir middleware dir app.use ile çağrılır
const fs = require('node:fs')

// log kayıtlarını günlük tutmak için;
const now = new Date()
const today = now.toISOString().split('T')[0]
// app.use(morgan('combined', {
//     stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
// }))


// Aşağıdaki komutla birlikte, proje ana dizininde logs isimli klasör altında her gün için bir log dosyası açılacak
// flags : 'a+' bu dosyanın hem oluşturulması hem de yazılması izinleri için verildi
module.exports = morgan('combined', {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
})