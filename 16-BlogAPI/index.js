'use strict'

/* BLOG API WITH MONGOOSE*/

const express = require('express')

const app = express()

app.use(express.json()) // tepede olması önemli

require('dotenv').config()
const PORT = process.env.PORT
const HOST = process.env.HOST
// yukarıda .env dosyasının config kısmı db bağlantı komutundan önce olmalı, çünkü db dosyasında da MONGODB değerini .env dosyasından alıyoruz
require('./src/configs/dbConnection') // yukarıda olması mantıklı, DB bağlantısı yapan dosyayı import ediyor


/* ------------------------------------------------------- */
// SessionCookies:
// http://expressjs.com/en/resources/middleware/cookie-session.html
// https://www.npmjs.com/package/cookie-session
//* $ npm i cookie-session
/* ------------------------------------------------------- */
const session = require('cookie-session')
app.use(session({ 
    secret: process.env.SECRET_KEY,        //şifreleme anahtarı
    //maxAge: 1000 * 60 * 60 * 24 * 3 //miliseconds cinsnden olduğu için (3 gün oldu şimdi)
}))

// giriş yapan kullanıcıyı kontrol et
app.use(require('./src/middlewares/userControl'))

// Filter, Sort, Saerch
app.use(require('./src/middlewares/findSearchSortPage'))

require('express-async-errors')// bunu burda yapmadı ama yine de çalıştı. Diğer js dosyalarının birinde çağırdı

app.all('/', (req, res) => {
    //res.send('WELCOME TO BLOGAPI');
    if (req.isLogin) {
        res.send({
            error: false,
            message: 'WELCOME BLOG API PROJECT',
            session: req.session,
            user: req.user
        })
    } else {
        res.send({
            error: false,
            message: 'WELCOME BLOG API PROJECT',
            session: req.session,
        })
    }

    res.send({
        error:false,
        message: 'WELCOME TO BLOGAPI',
        session: req.session
    })
})

app.use('/user', require('./src/routes/user.router'))
app.use('/blog', require('./src/routes/blog.router'))

app.use(require('./src/middlewares/errorHandler')) // aşağıda olması önemli

app.listen(PORT, () => { console.log('Server running on http://' + HOST + ':' + PORT); })


//require('./src/sync')() //bir kere çalıştırınca sonra yoruma alıyoruz 
