"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const token = require('../controllers/token.controller')
// const permission = require('../middlewares/permissions') // permissions daki tüm middlewarelere gerek yok onedenle sadece isAdmin i çağırdık aşağıda

// URL: /tokens

// router.route('/')
//     .get(permission.isAdmin, token.list)
//     .post(permission.isAdmin, token.create)

// router.route('/:id')
//     .get(permission.isAdmin, token.read)
//     .put(permission.isAdmin, token.update)
//     .patch(permission.isAdmin, token.update)
//     .delete(permission.isAdmin, token.delete)
// yukarıdaki uzun yöntem, her router a isAdmin kontrolü getirildi
// aşağıdaki ise kısa yöntem

// router.use(permission.isAdmin)    

const {isAdmin} = require('../middlewares/permissions') // permissions tan sadece isAdmin middleware ini çağırdık, diğerleri lazım değil çünkü
router.use(isAdmin) // isAdmin i tüm router a uyguladık

router.route('/')
    .get(token.list)
    .post(token.create)

router.route('/:id')
    .get(token.read)
    .put(token.update)
    .patch(token.update)
    .delete(token.delete)

/* ------------------------------------------------------- */
module.exports = router