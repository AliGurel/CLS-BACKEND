"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const department = require('../controllers/department.controller')
//kısıtlamaları yani permission kontrollerini router larda yapıyoruz
const permission = require('../middlewares/permissions')

// URL: /departments // gelen isteğin ilk parçası, index.js ten gelen

router.route('/')
    .get(permission.isLogin, department.list)//isLogin kontrolünü yap, eğer login olmuşsa list çalışsın
    .post(permission.isAdmin, department.create)//admin olmayanlar departman oluşturamaz

router.route('/:id')
    .get(permission.isLogin, department.read)
    .put(permission.isAdmin, department.update)
    .patch(permission.isAdmin, department.update)
    .delete(permission.isAdmin, department.delete)

router.get('/:id/personnels',permission.isAdminOrLead, department.personnels)

/* ------------------------------------------------------- */
module.exports = router