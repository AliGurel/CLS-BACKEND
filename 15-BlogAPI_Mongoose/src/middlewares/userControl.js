'use strict'

//Cookie-Session daki verilerin doğru olup olmadığını kontrol eder bu maiddleware

const User = require("../models/user.model")

module.exports = async (req,res,next) => {

    if (req?.session?.id) { //önce session da id verisi var mı onu kontrol ediyoruz
        const {id, password} = req.session //sessiponda veri varsa id ve pass i al sessiondan

        const user = await User.findOne({_id:id}) // mongo db deki _id, session dan gelen id ye eşit mi

        if(user && user.password == password) { //her iki pass de şifreli olduğu için tekrar şifreleme yapılmadı
            req.user = user
            req.isLogin = true

        }else{
            req.session = null //gelen veri doğru değlse session u sil, güvenlik amaçlı
            req.isLogin = false
        }
    }
    next()

}