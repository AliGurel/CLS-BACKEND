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

router.all('/', User.list)
router.all('/create', User.create)
router.all('/:id', User.read)
router.all('/:id/update', User.update)
router.all('/:id/delete', User.delete)

module.exports = router