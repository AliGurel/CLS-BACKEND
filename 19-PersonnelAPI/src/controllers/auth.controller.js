"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require('../models/personnel.model')
const Token = require('../models/token.model')
const passwordEncrypt = require('../helpers/passwordEncrypt')

module.exports = {

    // LOGIN & LOGOUT

    login: async (req, res) => {
        //gruplama yapmak için #swagger.tags kullanıyoruz
        // bu tags, summary vs onları https://swagger-autogen.github.io/docs/endpoints/ sitesinde bulabilr
        /*
            #swagger.tags = ['Authentication'] 
            #swagger.summary = 'Login' 
            #swagger.description = 'Login with username and password'
            #swagger.parameters['body'] = {
                in: 'body', 
                required: 'true',
                schema: {
                    username: "testF0",
                    password: "1234"
                }
            }
        */
        // gruplandırma yapmak içn tags kullanılıe
        //in: 'body' bu parametrelerin kullanılcağı yerler
        //schema objesinin içine örnek parametreler ve değerleri yazılıyor.
        //Normalde bu parametreleri swagger yakalar dedi ama yakalamzsa maneul bu şekilde yapabiliyormuşuz

        const { username, password } = req.body

        if (username && password) {

            const user = await Personnel.findOne({ username, password })
            //? findOne, passwordu modeldeki set metodundaki encrypt i kullanarak şifreler ve db'de şifreli haliyle filtreleme/arama yapar

            if (user && user.isActive) { // böyle bir user var mı ve aktif mi banlı değil mi
                /*SESSION*
                // Set Session:
                req.session = {
                    id: user._id,
                    password: user.password
                }
                // Set Cookie:
                if (req.body?.rememberMe) {
                    req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3 // 3 Days
                }
                /*SESSION*/

                /*TOKEN*/
                let tokenData = await Token.findOne({ userId: user._id }) //token zaten var mı kontrolü
                //userId token.model de, user._id => personnel modelde

                if (!tokenData) { //eğer token daha önce oluşturulmamışsa oluştur
                    const tokenKey = passwordEncrypt(user._id + Date.now()) //yeni token oluşturduk ve o anki zamanın sayısal değerini ıd ye ekleyerek üzerinde bir de şifreleyrek token çakışma ihtimalini imkansıza yaklaştırdık
                    tokenData = await Token.create({ userId: user._id, token: tokenKey })
                }

                /*TOKEN*/
                res.status(200).send({
                    error: false,
                    token: tokenData.token, //token i FE ye gönderdik
                    user
                })

            } else {
                res.errorStatusCode = 401
                throw new Error('Wrong Username or Password.')
            }
        } else {
            res.errorStatusCode = 401
            throw new Error('Please entry username and password.')
        }
    },

    logout: async (req, res) => {

        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'Delete Token'
        */


        /*SESSION*
        // Set session to null:
        req.session = null
        /*SESSION*/

        /*TOKEN*/
        // var olan token i sileceğiz
        
        //* 1.Yöntem (kısa yöntem) Her kullanıcının 1 adet token i var ise bu yöntemi kullan
        //? tüm cihazlardan çıkış yap demek bu
        //const deleted = await Token.deleteOne({userId: req.user._id}) //ilgili userId e ait token ı bul ve sil
        // buradaki req.user ı, authentication.js middlewareinde kendimiz oluşturmuştuk

        //*2.Yöntem (Bu yöntemi kullanmak daha iyi)
        //?bir kullanıcıya birden fazla token vermek istersek bu yöntemi kullanacaz (çoklu cihaz)
        const auth = req.headers?.authorization || null // Token ...tokenKey... veri authoizationda bu şekilde gelir
        //istekteki header da authorizaiton bilgisi var mı yani token var mı ? kontrolü

        const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...']
        //bize sadece tokenKey lazım olduğu için split ettik ve array elde ettik

        let deleted = null; //bunu isteğe bağlı yaptk, ekrana verileri bassın diye
        if (tokenKey && tokenKey[0] == 'Token') {
            deleted = await Token.deleteOne({ token: tokenKey[1] })
            console.log(deleted); // çıktısı => { acknowledged: true, deletedCount: 1 }
        }

        /*TOKEN*/
        res.status(200).send({
            error: false,
            // message: 'Logout: Sessions Deleted.'
            message: 'Logout: Token Deleted.',
            deleted// silinen veriyi gösterir
        })
    },
}