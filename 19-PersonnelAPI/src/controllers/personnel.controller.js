"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require('../models/personnel.model')

module.exports = {

    list: async (req, res) => {

        const data = await res.getModelList(Personnel, {}, 'departmentId')

        res.status(200).send({
            error: false,
            detail: await res.getModelListDetails(Personnel),
            data
        })

    },

    create: async (req, res) => {

        // isLead Control:
        const isLead = req.body?.isLead || false // isLead bilgisini req ten aldık
        if (isLead) { //isLead true ise yani varsa

            const xyz = await Personnel.updateMany({ departmentId: req.body.departmentId, isLead: true }, { isLead: false })

            //departman idsi req.departmen id sine eşit olan departmanı getir, içindeki isLEad i true olanları filtrele, bunların hepsini false yap
            //sadece son gelen istekteki işLead true kalacak, diğerleri false olacak
        }

        const data = await Personnel.create(req.body)

        res.status(201).send({
            error: false,
            data
        })

    },

    read: async (req, res) => {

        const data = await Personnel.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {

        // isLead Control:
        const isLead = req.body?.isLead || false
        if (isLead) {
            const { departmentId } = await Personnel.findOne(
                { _id: req.params.id },
                { departmentId: 1 }
            )
            await Personnel.updateMany(
                { departmentId, isLead: true },
                { isLead: false }
            )
        }

        //personel modelin içinden id si req ten gelen id ye eşit olan personeli bul, bu personelin departman id sini yani departmanını bul, 
        //bu departmandaki isLead ı true olanları çek ve false a çevir  

        //personelin kendi bilgilerinden bazılarını değiştirmeye engel olmak
        // kendini admin yapamıcak, maaşını değiştiremicek gibi
        if(!req.user.isAdmin){
            req.user.isAdmin = false
            delete req.body.salary //req body den gelen salary i sildi, admin olmayan personel maaşını değiştiremesin diye
        }

        const data = await Personnel.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Personnel.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {

        const data = await Personnel.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}