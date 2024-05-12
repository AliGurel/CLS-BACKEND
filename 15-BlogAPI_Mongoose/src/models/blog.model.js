'use strict'

/* BLOG API MODELS*/

const mongoose = require('mongoose')

//BLOG CATEGORY
const blogCategorySchema = new mongoose.Schema({
    // Mongoose JS veri tiplerini tanıyor
    name: {
        type: String,
        trim: true,
        required: true
    }

}, {
    collection: 'blogCategory',
    timestamps: true
})


//BLOG POST
const blogPostSchema = new mongoose.Schema(
    {
        //_id
        //categoryId,
        blogCategoryId:{
            type: mongoose.Schema.Types.ObjectId,// Foreign key tanımlanmış oldu
            ref: 'BlogCategory', // aşağıdaki model oluşturma kısmındaki parantez içindeki isimle aynı olmak zorunda
            required: true
        },

        title: {
            type: String,
            trim: true,
            required: true
        },
        content: {
            type: String,
            trim: true,
            required: true
        },

        published: {
            type: Boolean,
            default: true
        }
        //createdAt,
        //updatedAt
    },
    {
        collection: 'blogPost',
        timestamps: true
    }
)

//mongoose.model('model ismi', 'hangi şemadan')
/*
const BlogPostModel = mongoose.model('BlogPost',blogPostSchema)

module.exports={
    BlogPost : BlogPostModel
}
*/
//yukarıdakinin kısa hali aşağıdaki
module.exports = {
    BlogCategory: mongoose.model('BlogCategory', blogCategorySchema),
    BlogPost: mongoose.model('BlogPost', blogPostSchema)
}



//const nameSchema = new mongoose.Schema({fields},{tabloName})

/* TASLAKKK
const nameSchema = new mongoose.Schema(
    {
        //_id: //auto created and increment
        //fieldName : Type (String vb)

        fieldNAme: {
            type : String,
            default: null,
            trim : true,
            unique: false,
            select: false, // model çağrıldığında gelsin mi
            index: false, // aramalrda erişimi hızlandırır
            required: true,// veri girişi gerekli mi
            required: [true, 'error message yazabilirsin'],
            enum: [[1,2,3],'error message ayzabilirsin'], // belirli bir pattern e göre veri girişi kısıtlanabilir,
            //mesela burada kullanıcı sadece 1,2 ve 3 dn birini girebilir.
            validate: [function(data){return true},'error messgae yazabilirsin'], // veriyi fonk ile doğrulama
            get: function(data){return data}, // veri çağırırken çalışacak fonk
            set: function(data){return data}, // veri kaydederken çalışacak fonk
        }

    },
    {
        collection : 'collectionName', // tablo ismi, çoğul isim oluyor piyasa standardı
        timestamps : true, // obje kayıt tarihi, obje içerik update tarihini tutar

    }
)*/


