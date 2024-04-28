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
//? TEMPLATE - EJS
// $ npm i ejs ile ejs motoru yüklenir terminalden
// https://ejs.co/
// https://www.npmjs.com/package/ejs
// https://github.com/mde/ejs/wiki/Using-EJS-with-Express

// Setting template engine, template motoru olarak ejs kullan demek
//console.log(app); yaparsak settings kısmında view bölümü var, burada bir fonk var ve template motoru ister
// yine settings kısmında views var, o da html dosyalarının hangi klasörde olduğunu ister
app.set('view engine', 'ejs')

// default view folder: views/
//normalde default olrak views klasörü kullanılıyor, node.js de bunu biliyor, bunun yerine biz mesela public klasörünü kullanmak istersek aşağıdaki kodu yazabiliriz
app.set('views', './public')

app.all('/', (req, res) => {
    // API servisinde bu şekilde browsera/ekrana basıyorduk:
    // res.send({
    //     message: 'Hello'
    // })
    //Yani API ile browser a görüntüyü json olarak veriyoduk şimdi Template ile html ile vereceğiz

    // View Template: Template de ekrana göndermek için render kullanılır
    // render HTML e aktarma işlemi demektir
    //rs.render içine direkt olarak ejs uzantılı dosya adı yazıyoruz, /views/index.ejs olarak yazmaya gerek yok, çünkü views klasörünü otomatik olarak kendisi tanıyor. Dolayısıyla biz bu klasöre o zaman views adı vermek zorundayız, eğer bu dosya adını değiştirmek için bi kod yazmadıysak yukardaki gibi app.set('views', './public'), bu komutla beraber artık index dosyasını artık public klasöründe arar
    res.render('index')
})
// Routes:

//url ye /api yazılırsa  backend kısmına yönlendirilecek
app.use('/api', require('./app/routes/todo.api.router'))
// url ye /view yazılırsa frontend kısmına yönlendirilecek
app.use('/view', require('./app/routes/todo.view.router'))

/* ------------------------------------------------------- */
// ErrorHandler:
app.use(require('./app/errorHandler'))
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));