"use strict";
/* -------------------------------------------------------
    EXPRESSJS - ERROR MANAGEMENT
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- *
app.get('/', (req, res) => {
    throw new Error('Error Message')
})

app.get('/user/:id', (req, res) => {

    const id = req.params?.id || 0

    try {

        if (isNaN(id)) {
            throw new Error('ID is not a number');
        } else {
            res.send({
                message: 'OK',
                id
            })
        }
    } catch (err) {
        next içinde bir hata objesi gönderirsek, errorHanler yakalar.
        next(err)


        res.send({
            error : true,
            message : err.message
        })
    }

})

/* ------------------------------------------------------- *

app.get('/*', (req, res) => {

    res.errorStatusCode = 404 // rastgele verdi
    throw new Error('Error Message')
})



/* ------------------------------------------------------- *

const asyncFunction = async() => {
    throw new Error ('Error in async function')
}
//? async fonksiyon içinden err yakalama, catch(next) ile
// bu hatayı artık errorHndler yakalar
app.get('/async', async (req, res, next) =>{
    //await asyncFunction().then().catch((err)=>{next(err)}) // aşağıdaki bu yazımın kısaltılmış halidir
    await asyncFunction().then().catch(next) // hata errorHandler a havale edildi
})


/* ------------------------------------------------------- */

// npm i express-async-errors (async çalışan fonksiyonlarda otomatk hata kontrolü yapar yukarıdakine gerek yok)

require('express-async-errors')

app.get('/async', async (req, res, next) =>{
    throw new Error ('Error in async function')
})


/* ------------------------------------------------------- */
/* ------------------------------------------------------- */

// //* ERROR HANDLER
// errorHandler, 4 parametreli özel bir middleware dir
// errorhandler da next kullanılmaz, sebebi bir hata varsa devam etmesin program çalışmaya
// const errorHandler = (err, req,res,nex) => {
//     console.log('ErrorHandler runned');

//     const errorStatusCode = res?.errorStatusCode || 500

//     res.status(errorStatusCode).send({
//         error : true,
//         message : err.message,
//         stack: errorHandler.stack // sistemin hata mesajını json çıktısına ekler
//     })
// }
// //? for run errorHandler call in use.
// //? It must be at last middleware.
// app.use(errorHandler)
/* ------------------------------------------------------- */

// errorhandler çağrıldı import edildi, en sonda olması lazım errorHandler ın
app.use(require('./errorHandler'))


app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));