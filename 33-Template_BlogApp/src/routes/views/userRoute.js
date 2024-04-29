"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require('express').Router()

const { User } = require('../../controllers/views/userController')

// ------------------------------------------
// User
// ------------------------------------------

//işin içine template girdiğinde get, post ayrılmaz direkt all yapılır

// Login/logout:
router.all('/login', User.login)
router.all('/logout', User.logout)


// router.route('/')
//     .get(User.list)
//     .post(User.create)

// router.route('/:userId')
//     .get(User.read)
//     .put(User.update)
//     .delete(User.delete)

router.all('/user', User.list)
//template de post olmadığı için create işlemine yönlendirmek için /create diyoruz,yani URL den alıyoruz
router.all('/user/create', User.create)
router.all('/user/:id', User.read)
//template de put olmadığı için update işlemine yönlendirmek için /update diyoruz,yani URL den alıyoruz
router.all('/user/:id/update', User.update)
//template de delete olmadığı için delete işlemine yönlendirmek için /delete diyoruz,yani URL den alıyoruz
router.all('/user/:id/delete', User.delete)

module.exports = router