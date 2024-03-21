'use strict'

// const express = require('express').Router()
const {todo} = require("../controllers/todo.controller")
const idValidation = require("../middlewares/idValidation")
const todoRouter = require('express').Router()


todoRouter.route("/")
    .get(todo.list)
    .post(todo.create)

todoRouter.route("/:id")
    .all(idValidation)
    .get(todo.read)
    .put(todo.update)
    //.post(todo.create)
    .delete(todo.delete)

module.exports= {todoRouter}