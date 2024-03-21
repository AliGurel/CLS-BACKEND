"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */

//Password Encryption pbkdf2
const crypto = require('node:crypto') // bu TARZ (node:) ifade grüyorsak, node modules klasörü içinde hazı olarak gelen modül demektir, tekrar npm i demeye gerek yoktur
const keyCode = process.env?.SECRET_KEY || 'write_random_chars_in_here' // bu anahtarla şifrele
const loopCount = 10000 //10_000 olarak da yazılabilir, _ js için farketmez // 10 bin kere tekrar tekrar şifreler
const charCount = 32 // ne kadar veri istiyorsak yarısını yazıyoruz, bu haliyle 64 karakter çıktı verir
const encType = 'sha512'

module.exports = function (password) {
    return crypto.pbkdf2Sync(password,keyCode,loopCount,charCount,encType).toString('hex')
}

