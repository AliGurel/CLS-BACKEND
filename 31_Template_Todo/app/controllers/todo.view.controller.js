"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
// CONTROLLERS:

const Todo = require('../models/todo.model')

const PRIORITY = {
    '-1': 'Low',
    '0': 'Norm',
    '1': 'High'
}

module.exports = {

    list: async (req, res) => {

        // const data = await Todo.findAll()
        const data = await Todo.findAndCountAll()

        // res.status(200).send({
        //     error: false,
        //     result: data
        // })
        //View
        //2. parametredeki obje içinde todoList.ejs içine gönderilecek datalar var,
        // buradaki key ler ile todoList içindeki değişken adlrı aynı olmak zorunda
        res.render('todoList.ejs', {todos: data.rows, count: data.count, priority: PRIORITY})
    },

    // CRUD:

    create: async (req, res) => {

        // const data = await Todo.create(req.body)

        // res.status(201).send({
        //     error: false,
        //     result: data.dataValues
        // })
        if (req.method == 'POST') {
            //method post ise datayı ekle
            //CREATE yap
            const data = await Todo.create(req.body)
            //errorhandler çalıştığı için hata yönetimine gerek yok
            // if (data) {
            //     //create başarılıysa ana sayfaya geri dön
            //     res.redirect('/view')
            // }else { //create yapılmamışsa içinde bulunduğum sayfaya geri gel
            //     res.redirect('/view/create')
            // }
            res.redirect('/view')
        }else {
            // metod get ise sadece formu göster
            //FORM Görüntüle
            res.render('todoCreate', {priority: PRIORITY})
        }
        
    },

    read: async (req, res) => {

        // const data = await Todo.findOne({ where: { id: req.params.id } })
        const data = await Todo.findByPk(req.params.id)

        res.status(200).send({
            error: false,
            result: data
        })

    },

    update: async (req, res) => {

        // const data = await Todo.update({ ...newData }, { ...where })
        const data = await Todo.update(req.body, { where: { id: req.params.id } })

        res.status(202).send({
            error: false,
            message: 'Updated',
            body: req.body, // Gönderdiğim veriyi göster.
            result: data,
            new: await Todo.findByPk(req.params.id) // Güncellenmiş veriyi de göster.
        })
    },

    delete: async (req, res) => {

        // const data = await Todo.destroy({ ...where })
        const data = await Todo.destroy({ where: { id: req.params.id } })
        // console.log(data)

        // //? 204 No Content -> Ekrana çıktı vermeyebilir.
        // res.status(204).send({
        //     error: false,
        //     message: 'Deleted',
        //     result: data
        // })

        if (data > 0) { // Silme gerçekleşti ise:
            // res.status(204).send()
            //? Sadece status çıktı ver:
            res.sendStatus(204)
        } else { // Silme gerçekleşmedi ise:
            // res.status(404).send({
            //     error: true,
            //     result: data
            // })
            //? ErrorHandler'a havale edebilirim:
            res.errorStatusCode = 404
            throw new Error('Not Found.')
        }
    }
}