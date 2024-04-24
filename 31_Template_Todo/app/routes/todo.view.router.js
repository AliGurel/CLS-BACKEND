"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
// ROUTERS:

const todo = require('../controllers/todo.view.controller')

const router = require('express').Router()

//API leredeki router yapısı template de geçerli değil
// router.route('/')
//     .get(todo.list)
//     .post(todo.create)

// router.route('/:id')
//     .get(todo.read)
//     .put(todo.update)
//     .patch(todo.update)
//     .delete(todo.delete)

router.get('/', todo.list)
// router.get('/create', todo.create) // formu gösterir
// router.post('/create', todo.create) // formu gönderir
//yukarıdaki 2 satırın kısaltması
router.all('/create', todo.create)

module.exports = router