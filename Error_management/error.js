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
        // next içinde bir hata objesi gönderirsek, errorHanler yakalar.
        //next(err)


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
app.get('/async', async (req, res, next) =>{
    await asyncFunction().then().catch(next)
})


/* ------------------------------------------------------- */

// npm i express-async-errors (otomatk hata kontrolü yapar yukarıdakine gerek yok)

require('express-async-errors')

app.get('/async', async (req, res, next) =>{
    throw new Error ('Error in async function')
})


/* ------------------------------------------------------- */
/* ------------------------------------------------------- */

// //* ERROR HANDLER
// const errorHandler = (err, req,res,nex) => {
//     console.log('ErrorHandler runned');

//     const errorStatusCode = res?.errorStatusCode || 500

//     res.status(errorStatusCode).send({
//         error : true,
//         message : err.message
//     })
// }
// //? for run errorHandler call in use.
// //? It must be at last middleware.
// app.use(errorHandler)
/* ------------------------------------------------------- */

// error handler
app.use(require('./errorHandler'))


app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));