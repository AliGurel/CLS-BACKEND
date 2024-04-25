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

//işin içine tarayıcı girdiği zaman route larda değişiyor, çünkü tarayıcıda get ve post (form) hariç diğer işlemler yok

// router.get('/', todo.list)
router.all('/', todo.list)
// router.get('/create', todo.create) // önce formu gösterir
// router.post('/create', todo.create) // create butonuna basınca formu gönderir, işeme alır
//yukarıdaki 2 satırın kısaltması, method un get mi post u olduğunu controller da kontorl ediyoruz
router.all('/create', todo.create)

router.all('/:id', todo.read)
router.all('/:id/update', todo.update)
router.all('/:id/delete', todo.delete)

module.exports = router