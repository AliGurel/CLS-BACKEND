"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- *

LOGIN için örnek user bilgileri;
{
  "username": "test1",
  "password": "1234"
}

id: 6600adad38af2dba16f5bc87
departmenId: 65fb2b89110f5b884f2b9d8b
token: c2b3c3df1cfe707db0e14bab0f9507a133515ea74e467c13c5742c3f2cf125a8
/* ------------------------------------------------------- */

const auth = require('../controllers/auth.controller')

// URL: /auth

// Login/logout:
router.post('/login', auth.login)
// router.all('/logout', auth.logout) //swagger all metodunu görmez, o nedenle get yaptık
router.get('/logout', auth.logout) //swagger all metodunu görmez

/* ------------------------------------------------------- */
module.exports = router