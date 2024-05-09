"use strict"

const express = require("express")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT || 8000


/*----------------------------------------------*
//? Middleware ler 3 parametrelidir,req, res ve next

//Middleware
app.get('/',(req, res, next)=>{
    console.log("Middleware worked");
    next()
})

//route path
app.get('/',(req,res)=>{
    res.send({
        message: 'Welcome'
    })
})


/*----------------------------------------------*
// req.params ile url deki parametre alınır, /:parametre olarak route ta yazılması gerekir
// req.query ile url deki sorgu/query alınır, route herhangi bir ekleme olmasına gerek yok ?key=value şeklinde url ye yazılır

app.get('/',(req, res, next)=>{
    if(req.query.username == 'clarusway'){
        //? verileri req/res değişkenleri ile yollama
        //hem req hem de res ile veri gönderebiliriz
        req.welcome = 'Welcome'
        res.username = req.query?.username

        next()
    }else{
        res.send({
            message : "username is wrong..."
        })
    }
})

//route path
app.get('/',(req,res)=>{
    res.send({
        // message: 'Welcome'
        message: req?.welcome + ' ' + res.username
    })
})

/*----------------------------------------------*
const middleFunc1 = (req, res, next) => {

    req.message1 = 'middleFunc1 started.'
    next()
    // next('route')
}

const middleFunc2 = (req, res, next) => {
    
    req.message2 = 'middleFunc2 started.'
    next()
}
//?Middleware leri çağırma yöntem-1
// app.use(middleFunc1, middleFunc2)
//?Middleware leri çağırma yöntem-2
// app.use(middleFunc1)
// app.use(middleFunc2)
//?Middleware leri URL den çağırma 
// app.get('/abc', [middleFunc1,middleFunc2]) //sadece get metodunda ve /abc route unda çalışır bu middlewareler
// app.use('/abc', [middleFunc1,middleFunc2]) // sadece /abc/* route larında ve tüm metodlarda çalışır bu middlewareler

//aşağıdaki örnekte middleware ler sadece bu route için çalışı
app.all('/*', middleFunc1,middleFunc2, (req,res)=>{
    res.send({
        message1: req.message1,
        message2: req.message2,
        message: "Finished"
    })
})


/*----------------------------------------------*/
//? Dosyadan middleware fonk çağırma

// array olarak göndermişsek burdan array olarak veya tek değişkenle alabiliriz
// const [ middleFunc1, middleFunc2] = require('./middlewares/index')
//diğer bir çağırma yöntemi;
// const middleFuncs = require('./middlewares/index')
// app.use(middleFuncs)

//obje olarak göndermişsek obje olarak almalıyız Destructuring
const {middleFunc1, middleFunc2} = require('./middlewares/index')
app.use(middleFunc1,middleFunc2)

app.all('/*', (req,res)=>{
    res.send({
        message1: req.message1,
        message2: req.message2,
        message: "Finished"
    })
})
/*----------------------------------------------*/
/*----------------------------------------------*/

app.listen(PORT, ()=>console.log("Server runned on http://127.0.0.1:"+PORT))