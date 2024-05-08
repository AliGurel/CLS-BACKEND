"use strict"

const express = require("express")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT || 8000

/*-------------------------------------------------------*
//? ROUTER
//router da sadece URL ye hizmet eden bir application dur
//express.Router()


const router = express.Router()
//buradaki router artık yönlendirme yapabileceğim bir değişkendir.Bundan sonra artık app.get gibi yaptığımız tüm işlemleri router.get gibi yapacağız.
// router.get('/', (req,res)=>res.send({message:'Home Area'}))
// router.get('/about', (req,res)=>res.send({message:'About Area'}))
// router.get('/user/:id', (req,res)=>res.send({message:'User Area'}))

//2.YONTEM
//router aşağıdaki gibi de tanımlanabilir;
//İki yöntemin en önemli farkı; bu yöntemin daha derli toplu olmasıdır, tek url ye birden fazla metod tanımlaması yapılabilir.Yukardaki gibi yaparsak kod uzar
router.route('/')
    .get((req,res)=>res.send({message:'get'}))
    .post((req,res)=>res.send({message:'post'}))
    .put((req,res)=>res.send({message:'put'}))
    .delete((req,res)=>res.send({message:'delete'}))

//router ile yaptığımız yönlendirmeleri app anlasın diye ona bildirmemiz lazım;
app.use(router)


/*-------------------------------------------------------*/

//route ları farklı bir dosyaya taşıdık onu da burda çağırdık
// const router = require('./routes/index.js')
// const router = require('./routes/index')
// const router = require('./routes/')//dosyanın adı index.js ise yazmaya gerek bile yok
//yukarıdakilerin üçü de aynı işe yarar
// app.use(router)

//hepsinin kısa hali aşağıdaki
app.use(require('./routes/'))

app.listen(PORT, ()=>console.log("Server runned on http://127.0.0.1:"+PORT))