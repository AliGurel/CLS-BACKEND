"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
/*
 * $ npm init -y
 * $ npm i express dotenv express-async-errors
 * $ npm i mongoose
*/

const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 8000

/* ------------------------------------------------------- */
//TEMPLATE

//açma kapama etiketi ejs de default olarak <% ... %> idi. 
//Biz bunun yerine farklı bir sembol kullanmak isteyebiliriz.
//Değiştirme yöntemi - 1;
// const ejs = require('ejs')
// ejs.delimiter = '#' // artık delimeter % yerine # oldu. => yani <# ... #>
// ejs.openDelimiter = '{' // açma işareti de artık { oldu. yani {# ... #>
// ejs.closeDelimiter = '}' // kapama etiketini de } oldu.  yani {# ... #} oldu artık


app.set('view engine', 'ejs')
//Değiştirme yöntemi - 2 (kısa yol);
app.set('view options', {
    // delimiter: '%',
    openDelimiter: '{',
    closeDelimiter: '}',
})

app.set('views', './public')



/* ------------------------------------------------------- */
// SessionCookies:
// http://expressjs.com/en/resources/middleware/cookie-session.html
// https://www.npmjs.com/package/cookie-session
//* $ npm i cookie-session
const session = require("cookie-session")
app.use(session({ secret: process.env.SECRET_KEY || 'secret_keys_for_cookies' }))
/* ------------------------------------------------------- */
// Accept json data & convert to object:
app.use(express.json())

// Connect to MongoDB with Mongoose:
require('./src/dbConnection')

// Searching&Sorting&Pagination:
app.use(require('./src/middlewares/findSearchSortPage'))

// HomePage:
app.all('/', (req, res) => {
    // yukarıdaki yıldız gelen herşeyi kabul et demek
    //direkt ana sayfa url si gelince /views a yönlendirsin demek
    // if (req.originalUrl == '/') {
    //     res.redirect('/views')
    // }
    // if (req.originalUrl.startsWith('/api')) {
    //     res.send({
    //         error: false,
    //         message: 'WELCOME TO BLOG APP'
    //     })
    // }else {
    //     res.send('<h1> WELCOME TO BLOG APP </h1>')
    // }
    res.redirect('/views/blog/post')
    // res.send('<h1> WELCOME TO BLOG APP </h1>')
})

// Routes: // Bunlar VIEWS yanei Template dir
app.use('/views/user', require('./src/routes/views/userRoute'))
app.use('/views/blog', require('./src/routes/views/blogRoute'))

// Routes: // Bunlar API dir
app.use('/api/user', require('./src/routes/api/userRoute'))
app.use('/api/blog', require('./src/routes/api/blogRoute'))

// StaticFiles
//url den /assets diye bir istek gelirse bu bir static dosyadır ve onları assets dosyasında ara
app.use('/assets', express.static('./public/assets'))

/* ------------------------------------------------------- */
// Synchronization:
// require('./src/sync')()

// errorHandler:
app.use(require('./src/errorHandler'))

app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT))

