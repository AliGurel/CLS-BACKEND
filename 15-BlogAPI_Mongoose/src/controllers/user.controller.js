"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */

require("express-async-errors")

const User = require("../models/user.model")

const passwordEncrypt = require('../helpers/passwordEncrypt')

module.exports = {

    list: async (req, res) => {
        // const data = await User.find()
        const data = await res.getModelList(User)
        res.status(200).send({
            error: false,
            data: data
        })
    },
    create: async (req, res) => {
        const data = await User.create(req.body)
        res.status(201).send({
            error: false,
            body: req.body,
            data: data
        })
    },
    read: async (req, res) => {
        const data = await User.findOne({ _id: req.params.userId })
        res.status(202).send({
            error: false,
            data: data
        })
    },
    update: async (req, res) => {
        const data = await User.updateOne({ _id: req.params.userId }, req.body)
        const newdata = await User.findOne({ _id: req.params.userId })
        res.status(202).send({
            error: false,
            body: req.body,
            data: data, // info about update
            // güncel veriyi istiyorsan tekrar çağır
            newdata: newdata
        })
    },
    delete: async (req, res) => {
        const data = await User.deleteOne({ _id: req.params.userId })
        // console.log(data);
        res.sendStatus((data.deletedCount >= 1) ? 204 : 404)
    },


    //Login / Logout
    login: async (req, res) => {
        const { email, password } = req.body

        if (email && password) {
            //const user = await User.findOne({ email:email}) //böyle bir emaile sahip user buldun mu
            const user = await User.findOne({ email }) //yukarıdakinin kısa hali

            if (user && user.password == passwordEncrypt(password)) {//kullancıdan glen pass i şifreleyip, db deki şifreli haliyle kıyaslıyoruz

                /*SESSION*/
                // req.session = {
                //     email : user.email,
                //     password: user.password
                // }
                //yukarıdakinin kısaltılmış hali aşağıda, kullanıcı bilgilerini cookielre kaydediyoruz
                //req.session.email = user.email // mail güvenli değil diye id sini verelim dedik
                req.session.id = user.id
                req.session.password = user.password //şifrelenmiş pass

                /*COOKIES*/
                if (req.body?.remindMe) {//kullancı remind me seçeneğini tıklmaışsa
                    req.session.remindMe = req.body.remindMe
                    req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3 // 3 gün boyunca sakla
                }

                res.status(200).send({
                    error: false,
                    message: 'login OK',
                    user
                })
            } else {
                res.errorStatusCode = 401
                throw new Error('Login parameters are not true.')
            }
        }
        else {
            res.errorStatusCode = 401
            throw new Error('Email and password are required')
        }
    },
    //session verilerini silersek kullanıcı çıkış yapmış olur
    logout: async (req, res) => {
        req.session = null

        res.status(200).send({
            error: false,
            message: 'logout OK',
        })
    }

}