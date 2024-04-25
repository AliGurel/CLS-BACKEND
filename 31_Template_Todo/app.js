"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Accept json data and convert object:
app.use(express.json())

//Accept form-urlencoded ve objeye çevirir ve req.body e atar
//extended: true array göndereye izin verir
//formdan veri almak için bunu yapmak lazım
app.use(express.urlencoded({ extended: true}))

// Catch async-errors:
require('express-async-errors')
/* ------------------------------------------------------- */
//* TEMPLATE - EJS
// $ npm i ejs
// https://ejs.co/
// https://www.npmjs.com/package/ejs
// https://github.com/mde/ejs/wiki/Using-EJS-with-Express

// Setting template engine, template motoru olarak ejs kullan demek
app.set('view engine', 'ejs')

// default view folder: views/
//normalde default olrak views klasörü kullanılıyor, bunun yerine biz mesela public klasörünü
//kullanmak istersek aşağıdaki kodu yazabiliriz
app.set('views', './public')

app.all('/', (req, res) => {
    // API:
    // res.send({
    //     message: 'Hello'
    // })
    //önceden browser a görüntüyü json olarak veriyoduk şimdi html ile vereceğiz
    // View Template: Template de ekrana göndermek için rew.render kullanılır
    res.render('index')
})
// Routes:

///api ile backend kısmına yönlendirilecek
app.use('/api', require('./app/routes/todo.api.router'))
// /view ile frontend kısmına yönlendirilecek
app.use('/view', require('./app/routes/todo.view.router'))

/* ------------------------------------------------------- */
// ErrorHandler:
app.use(require('./app/errorHandler'))
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));