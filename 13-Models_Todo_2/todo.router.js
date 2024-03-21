"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

// ROUTERS:
const Todo = require('./todo.model')

// const router = express.Router()
const router = require('express').Router()

// LIST TODOS:
router.get('/', async (req, res) => {

    // const data = await Todo.findAll()
    const data = await Todo.findAndCountAll()

    res.status(200).send({
        error: false,
        result: data
    })
})

//? CRUD Processes:

// CREATE TODO:
router.post('/', async (req, res) => {

    // const receivedData = req.body

    // const data = await Todo.create({
    //     title: receivedData.title,
    //     description: receivedData.description,
    //     priority: receivedData.priority,
    //     isDone: receivedData.isDone,
    //     // newKey: 'newValue' // Modelde tanımlanmadığı için bir işe yaramayacaktır.
    // })

    const data = await Todo.create(req.body) // yeni kayıt oluşturduk, yukarıdakiler uzun yötemdi

    res.status(201).send({
        error: false,
        result: data.dataValues
    })
})

// READ TODO:
router.get('/:id', async (req, res) => {

    // const data = await Todo.findOne({ where: { id: req.params.id } }) //klasik filtreleme
    const data = await Todo.findByPk(req.params.id) // id ile aramının kısa yolu

    res.status(200).send({
        error: false,
        result: data
    })

})

router.put('/:id', async (req,res)=>{
    //const data = Todo.update({ ...neyle güncellicez...}, { ... nereyi güncellicez...}})
    const data = await Todo.update(req.body, { where: {id: req.params.id}})

    res.status(202).send({
        error: false,
        message : 'Updated',
        body: req.body,// gönderdiğim yeni veriyi gösterir
        result: data, // güncellenen veri sayısı
        new: await Todo.findByPk(req.params.id) // güncellenmiş veriyi de gösterir
    })
})

// DELETE

router.delete('/:id', async (req,res)=>{

    //const data = Todo.destroy({ ...hangi kaydı silicez...})
    const data = await Todo.destroy({ where: { id: req.params.id}})
    console.log(data);// silinn kayıt sayısını konsola verir

    //204 NO CONTENT => ekrana çıktı vrmeyebilir, içeriği sildiği için
    // res.status(204).send({
    //     error: false,
    //     message: 'Deleted',
    //     result: data
    // })

    if (data>0){ //silme gerçekleşti ise
        //res.status(204).send()// aşağıdaki de aynı işi yapar, send olmazsa istek döngüde kalır
        res.sendStatus(204).send()
    } else{ // silme gerekleşmedi ise
        // res.status(404).send({
        //     error: true,
        //     result: data
        // })

        // eror handlera da havale edebiliriz, yukarıdaki de farklı bir yöntem
        res.errorStatusCode = 404
        throw new Error('Not Found')
    }

})


//app.use(router)

module.exports = router
