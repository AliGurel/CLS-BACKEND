"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */

const mongoose = require('mongoose')


// //Password Encryption pbkdf2
// const crypto = require('node:crypto') // bu TARZ (node:) ifade grüyorsak, node modules klasörü içinde hazı olarak gelen modül demektir, tekrar npm i demeye gerek yoktur
// const keyCode = process.env?.SECRET_KEY || 'write_random_chars_in_here' // bu anahtarla şifrele
// const loopCount = 10000 //10_000 olarak da yazılabilir, _ js için farketmez // 10 bin kere tekrar tekrar şifreler
// const charCount = 32 // ne kadar veri istiyorsak yarısını yazıyoruz, bu haliyle 64 karakter çıktı verir
// const encType = 'sha512'

// const passwordEncrypt = function (password) {
//     return crypto.pbkdf2Sync(password,keyCode,loopCount,charCount,encType).toString('hex')
// }
const passwordEncrypt = require('../helpers/passwordEncrypt')

// Schema:
const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        trim: true,
        // unique: true,
        unique: [true, 'Email must be unique.'],//işe yaramayabilir
        // required: true,
        required: [true, 'Email must be required.'],
        // validate: (email) => { return true },
        // validate: [
        //     (email) => { //email datasını mongoose gönderiyoru bu fonk a
        //         if (email.includes('@') && email.includes('.')) {
        //             return true
        //         }
        //         return false
        //     },
        //     'Email type is incorrect' //return false olduğu zaman yayınlamak istediğmiz mesaj
        // ],
        //yukarıdakinin kısa yolu ;
        validate: [
            (email) => (email.includes('@') && email.includes('.')),//bunu ilerde regex ile yaptık
            'Email type is incorrect'
        ]

    },

    password: {
        type: String,
        trim: true,
        required: true,
        set: (password)=> passwordEncrypt(password)
        //set: passwordEncrypt //yukarıdakinin kısayolu
    },

    firstName: String,

    lastName: String,

}, {
    collection: 'user',
    timestamps: true
})

// module.exports = {
//     User: mongoose.model('User', UserSchema)
// }

module.exports = mongoose.model('User', UserSchema)