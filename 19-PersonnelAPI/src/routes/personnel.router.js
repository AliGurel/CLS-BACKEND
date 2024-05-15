"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const personnel = require('../controllers/personnel.controller')
const permission = require('../middlewares/permissions')

/*
admin;
"username" : "test1",
"password": "1234" 

user;
{
  "username":"test4",
  "password":"1234"
}
*/


// URL: /personnels
// permission işlemleri router larda yapılıyor
router.route('/')
    .get(permission.isAdmin, personnel.list)
    // .get(personnel.list)
    .post(permission.isAdmin, personnel.create)
    //.post(personnel.create)

router.route('/:id')
    .get(permission.isAdminOrOwn, personnel.read)
    .put(permission.isAdminOrOwn, personnel.update)
    // .put(personnel.update)
    .patch(permission.isAdminOrOwn, personnel.update)
    .delete(permission.isAdmin, personnel.delete)

/* ------------------------------------------------------- */
module.exports = router