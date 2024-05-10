"use strict"


//? MODELS
const { Sequelize, DataTypes} = require('sequelize')
// Sequelize bir motordur
const sequelize = new Sequelize('sqlite:./db.sqlite3') //sqlite: olması lazım, ./db.sqlite3 = yolu
// db.sqlite3 diye isim vermek şart değil, uzantısı sqşite3 olması iyi olur

//? Farklı DB ler arasında geçiş yapmak için sadece connection stringleri değiştirip sycnc yapmak yeterli

//?POSTGRESQL bağlama
//npm i pg pg-hstore
//parantez içindeki connectionstring tir, örneğini documentation dan aşağıdaki gibi aldık
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')
// const sequelize = new Sequelize('postgres://userCRL:Maltepe2091@localhost:5432/testCRL')


//?MYSQL Bağlama
// npm i mysql2
// npm i mariadb // maria ile mysql aynıdır, yukardaki çalışmazsa bunu dene
// const sequelize = new Sequelize('mysql://user:pass@example.com:5432/dbname')


// define methodu sequelize modeli olusturur:
// her bir model, veritabaninda bir tabloya denk gelir.
// sequelize.define('tableName',{modelDetails})

const Todo = sequelize.define('todos',{
    //ilk sütun olarak id sütunu sequlize tarafından otomatk oluşturulup yönetilir
    // id : {
    //     type: DataTypes.INTEGER,
    //     allowNull: false, //default:true
    //     unique: true, // default: false
    //     comment: 'description',
    //     primaryKey: true, // default: false
    //     autoIncrement: true, // default: false
    //     field: 'custom_name',
    //     defaultValue: 'default', // default: null
    // }

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: DataTypes.TEXT, // kısa kullanım eğer sadece veri tipi verip başka özellik tanımlamayacaksak

    priority: { // -1 Low, 0: Normal, 1: High
        // type: DataTypes.TINYINT, // postgreSQL tinyint desteklemiyor
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    // diğerlerine (createdAt ve upatedAt)gerek yok kendi tanımlıyor oto olarak

})

//? Senkronizasyon yapmak lazım model tanımından sonra, yani model bilgilerini DB ye uygula
//?ilk defa modeli uyguluyorsak aşağıdaki komutu yazmak yeterli
//?eğer yaptığımız modelde güncelleme yapacaksak alttaki alter:true olan kodu çalıştır
// sequelize.sync()// aynı isimli tablo yoksa oluşturur, varsa işlem yapmaz, açık kalsa da içindeki veliler kalır


// sequelize.sync({force:true}) // aynı adda tablo varsa siler yeniden oluşturur, datalar varsa silinir
// bu komudu örneğin fieldname lerde bi değişiklik yapacaksak kullanmalıyız
//Bu komut sürekli açık kalmamalı, yoksa DB deki var olan veriler silinir

// sequelize.sync({alter:true}) // to backup, drop table, create table from backup, önceki veriler silinmez
// bu komut ile fieldname vs güncellemeler yapılırken varolan veriler silinmez 


// connect to db
//async fonk olduğu için then ve catch ekliyormuşuz
//Mongoda bu yok, kendi bağlanıyomuş
sequelize.authenticate()
    .then(()=>console.log('**DB connected**'))
    .catch(()=>console.log('**DB Not Connected**'))

module.exports = Todo