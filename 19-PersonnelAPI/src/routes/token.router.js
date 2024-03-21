"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const token = require('../controllers/token.controller')
// const permission = require('../middlewares/permissions')

// URL: /tokens

// router.route('/')
//     .get(permission.isAdmin, token.list)
//     .post(permission.isAdmin, token.create)

// router.route('/:id')
//     .get(permission.isAdmin, token.read)
//     .put(permission.isAdmin, token.update)
//     .patch(permission.isAdmin, token.update)
//     .delete(permission.isAdmin, token.delete)

// router.use(permission.isAdmin)    

const {isAdmin} = require('../middlewares/permissions')
router.use(isAdmin)

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