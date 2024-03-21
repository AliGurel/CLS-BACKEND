"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Middleware: permissions (authorization) -- yetki kontrolü

module.exports = {
    // departman isimlerini herkez görebilir, kaç departman vb var gibi
    isLogin: (req, res, next) => {
        if(req.user && req.user.isActive){ //kullanıcı hesabıvarsa ve tipi aktif se, banlanmamışsa
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must Login')
        }
    },

    //silme ekleme işlemlerini admin yapabilir
    isAdmin: (req, res, next) => {
        if(req.user && req.user.isActive && req.user.isAdmin){
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Admin.')
        }
    },
    // lead ler sadece kendi departmanlarını görebilir
    isLead: (req, res, next) => {

        const departmentId = req.params?.id // url den mutlaka bir departmentId gelmeli onu yakaladık burda

        if(
            req.user 
            && req.user.isActive 
            && (req.user.isAdmin || ( req.user.isLead && req.user.departmentId == departmentId)))
            {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Admin or Department Lead.')
        }
    },
}


