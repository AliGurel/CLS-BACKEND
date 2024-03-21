'use strict'

const User = require("../models/user.model")

module.exports = async (req,res,next) => {

    if (req?.session) {
        const {id, password} = req.session

        const user = await User.findOne({_id:id}) // mongo db deki id, session dan gelen id ye eşit mi

        if(user && user.password == pasword) { //her iki pass de şifreli olduğu için tekrar şifreleme yapılmadı
            req.user = user
            req.isLogin = true

        }else{
            req.session = null
            req.isLogin = false
        }
    }
    next()

}