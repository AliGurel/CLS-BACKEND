"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
//route ları ana index.js dosyasından farklı bir dosyada yazmak istiyorsak router kullanmalıyız
/* ------------------------------------------------------- */

// /auth:
router.use('/auth', require('./auth.router'))
// /token:
router.use('/tokens', require('./token.router'))
// /personnel:
router.use('/personnels', require('./personnel.router'))
// /department:
router.use('/departments', require('./department.router'))


module.exports = router