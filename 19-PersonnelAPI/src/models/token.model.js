"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const {mongoose} = require('../configs/dbConnection')//bu tarz çağırma sağlıklı, her seferinde modül require etmek belleğe yük getirir

/*------------------------------------------------------- *
    ÖRNEK DATA;
{
    "userId": "65343222b67e9681f937f001",
    "token": "...tokenKey..." => kendimiz oluştrucaz
  }
/* ------------------------------------------------------- */

//TOKEN MODEL

const TokenSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, //foreign key
        ref: 'Personnel', 
        required: true,
        index: true, //daha hızlı erişim sağlamak için, RAM desteği alır, özellikle AQL vt lerde önemli
        unique: true,
    },
    token: {
        type: String,
        trim: true,
        required: true,
        index: true,
        unique: true
    },

},{
    collection: 'tokens',
    timestamps: true
})

module.exports = mongoose.model('Token',TokenSchema)