"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

//Bu middleware ın görevi, kimlik kontrolü, token geldi mi, gelen token doğru mu, hangi personele ait gibi kontrolleri yapar

const Token = require('../models/token.model')

module.exports = async (req,res,next)=>{

    // Authorization: Token ...
    // Authorization: ApiKey ...
    // Authorization: X-API-KEY ...
    // Authorization: x-auth-token ...
    // Authorization: Bearer ...

    const auth = req.headers?.authorization || null // Token ...tokenkey... şeklinde veri gelecek thunder cliente girdiğimiz gibi
    //buradaki authorization küçük harfle başlıyor, thunder da büyük harf, bu problem değil, express anlıyor

    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...'] haline dönüştürecek split

    if (tokenKey && tokenKey[0] == 'Token'){//tokenKey var mı ve ilk indeksi Token mi

        const tokenData = await Token.findOne({token: tokenKey[1]}).populate('userId')//personnel modelini çağırmaya gerek kalmadan ilgili personel verisini populate ile elde ettik
        if(tokenData) req.user = tokenData.userId // Eğer tokenData yani token varsa, personnel datasını req.user isimli bizim oluşturduğumuz değişkene atadık, req.user önceden tanımlı bir değişken değil
        // req.user olarak tanımlamamızın sebebi onu global bir değişken haline getirmek ve her yerde çağırıp kullanilabilir kılmak, bunu ana index.js de ana route içinde kullandık mesela bir de logout işleminde 1.yöntemde kullandık, bir de permissions.js te kullandık
        // console.log(tokenData);
        // console.log(req.user);
    }

    next()
}