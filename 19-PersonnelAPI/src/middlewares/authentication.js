"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Token = require('../models/token.model')

module.exports = async (req,res,next)=>{

    // Authorization: Token ...
    // Authorization: ApiKey ...
    // Authorization: X-API-KEY ...
    // Authorization: x-auth-token ...
    // Authorization: Bearer ...

    const auth = req.headers?.authorization || null // Token ...tokenkey... şeklinde veri gelecek thunder cliente girdiğimiz gibi

    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...'] haline dönüştürecek split

    if (tokenKey && tokenKey[0] == 'Token'){//tokenKey var mı ve ilk. indeksi Token mi

        const tokenData = await Token.findOne({token: tokenKey[1]}).populate('userId')//personnel modelini çağırmaya gerek kalmadan ilgili personel verisini populate ile elde ettik
        if(tokenData) req.user = tokenData.userId // personnel datasını req.user isimli değişkene  ata
        console.log(req.user);
    }

    next()
}