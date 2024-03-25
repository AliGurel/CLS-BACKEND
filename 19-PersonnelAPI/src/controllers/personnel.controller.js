"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require('../models/personnel.model')

module.exports = {

    list: async (req, res) => {

        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "List Personnels"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Personnel, {}, 'departmentId')

        res.status(200).send({
            error: false,
            detail: await res.getModelListDetails(Personnel),
            data
        })

    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Create Personnels"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    departmentId: 'id',
                    username: "test",
                    password: "12345",
                    firstName: "test",
                    lastName: "deneme",
                    phone: "055555555",
                    email: "deneme@test.com",
                    title: "CEO"
                }
            }
        */

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
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Get Single Personnel"
        */

        const data = await Personnel.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Update Personnel"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    departmentId: 'id',
                    username: "test",
                    password: "12345",
                    firstName: "test",
                    lastName: "deneme",
                    phone: "055555555",
                    email: "deneme@test.com",
                    title: "CEO"
                }
            }
        */

        //personelin kendi bilgilerinden bazılarını değiştirmeye engel olmak
        // kendini admin/lead yapamıcak, maaşını değiştiremicek gibi
        if (!req.user.isAdmin) {
            req.user.isAdmin = false
            //req.user.isLead = false
            delete req.body.isLead // yukardaki gibi de olur bu da olur 
            delete req.body.salary //req body den gelen salary i sildi, admin olmayan personel maaşını değiştiremesin diye
        }

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



        const data = await Personnel.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Personnel.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Delete Personnel"
        */
        const data = await Personnel.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}