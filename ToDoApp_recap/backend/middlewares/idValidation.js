'use strict'

const { default: mongoose } = require("mongoose")
const { CustomError } = require("../errors/customError")

const idValidation = (req,res,next) => {
    const idIsValid = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!idIsValid) throw new CustomError("ID is not valid", 400)
    next()
}

module.exports = idValidation