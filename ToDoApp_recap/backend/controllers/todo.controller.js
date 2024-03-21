'use strict'

const { CustomError } = require("../errors/customError")
const { Todo } = require("../models/todo.model")
const mongoose = require('mongoose')

const todo = {
    list: async (req, res) => {
        const data = await Todo.find({})
        res.status(200).send(data)
    },


    create: async (req, res) => {
        const data = await Todo.create(req.body);
        res.status(201).send({
          body: data,
          isError: false,
        })
      },
    read: async (req, res) => {
        // const idIsValid = mongoose.Types.ObjectId.isValid(req.params.id)
        // if (!idIsValid) throw new CustomError("ID is not valid", 400)
        const data = await Todo.findOne({ _id: req.params.id })
        res.status(200).send({
            isError: false,
            body: data
        })
    },
    update: async (req, res) => {
        // const idIsValid = mongoose.Types.ObjectId.isValid(req.params.id)
        // if (!idIsValid) throw new CustomError("ID is not valid", 400)
        const data = await Todo.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        const updated = await Todo.findOne({ _id: req.params.id })
        res.status(202).send({
            isError: false,
            data,
            body: updated,

        })
    },
    delete: async (req, res) => {
        // const idIsValid = mongoose.Types.ObjectId.isValid(req.params.id)
        // if (!idIsValid) throw new CustomError("ID is not valid", 400)
        const data = await Todo.deleteOne({ _id: req.params.id })
        if(!data.deletedCount) throw new CustomError("No data found to delete",409)
        res.status(204).send({
            isError: false,
            body: data,
        })
    }
}


module.exports = {todo}