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
const now = new Date() // çıktısı 2024-03-21T19:50:49.374Z şeklinde bir objedir, önce bu objeyi split edebilmek için STRING e çeviricez sonra sadece tarihi almak için T ye göre split edicez
//splitten sonra elde edilen ver, => ["2024-03-21",19:50:49.374Z] şeklinde bir array dir
const today = now.toISOString().split('T')[0] //ISOString, yukarıdaki formatta (2024-03-21T19:50:49.374Z) stringe çevirir, o nedenle bu yöntemle çevirdik

// app.use(morgan('combined', {
//     stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
// }))


// Aşağıdaki komutla birlikte, proje ana dizininde logs isimli klasör altında her gün için bir log dosyası açılacak
// flags : 'a+' bu dosyanın hem oluşturulması hem de yazılması izinleri için verildi
// 1. parametre: combined: format adıdır, log kaydında hangi detaylar olsun onu belirler
// 2. paramatre ise bu log kayıtlarıı dosyaya yaz demektir
// stream akış demektir, log kayıtları bir akıştır dedi hoca
// createWriteStream(), fs modülünde akışları kaydeden modüldür
// flags : 'a+' : böyle bir dosya yoksa oluştur, dosyayı hem okuma hem yazma modunda aç demek, default da budur yazmasak da olur eğer bunu istiyorsak
module.exports = morgan('combined', {
    //stream: fs.createWriteStream(`./access.log', { flags: 'a+' })// ana dizine access.log diye bir dosya oluşturup tüm log kayıtlarını bunun içine atardı, ama bu kötü bi yöntem çünkü zamanla bu dosya çok şişer, bunu çözmek içn log kayıtlarını günlük tutmaya karar verdik ve aşağıdaki yöntemi kullandık
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })

})