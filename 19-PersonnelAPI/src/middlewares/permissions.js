"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Middleware: permissions (authorization) -- yetki kontrolü

module.exports = {
    // 4 tane kontrol permisson middleware i yazdık, hepsi middleware dir (isLogin, isAdmin ...)
    // departman isimlerini login olan herkes görebilir, kaç departman vb var gibi
    isLogin: (req, res, next) => {
        if(req.user && req.user.isActive){ //kullanıcı hesabı varsa ve tipi aktif se, banlanmamışsa
            //req.user authentication.js middlewareindan geliyor, global erişimi olan bir değişkendi o
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
    isAdminOrLead: (req, res, next) => {

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

    isAdminOrOwn: (req,res,next)=>{
    //personelin kendi bilgilerini update edebilmesi için bu middleware yazıldı

        const personnelId = req.params?.id
        if(
            req.user 
            && req.user.isActive 
            && (req.user.isAdmin || ( req.user._id  == personnelId))) //admin mi veya kendi id sinde mi değişiklik yapıyor kontrolü yapıldı, admin her personelin bilgilerini update edebilir anca personel sadece kendi bilglerini update edebilir
            {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Admin or Record Ownner.')
        }
    }
}


