"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

// MODELS:

const { Sequelize, DataTypes } = require('sequelize')
// sequelize instance oluştur:
const sequelize = new Sequelize('sqlite:./db.sqlite3') //SQLITE bağlama

//POSTGRESQL bağlama
//npm i pg pg-hstore
//const sequelize = new Sequelize('postgres://userCH15:12345678@localhost:5432/testCH15')


// define methodu sequelize modeli oluşturur:
// her bir model, veritabanında bir tabloya denk gelir.
// sequelize.define('tableName', {  modelDetails  })

const Todo = sequelize.define('todos', {

    // ilk sutun olarak id sutunu sequelize tarafından otomatik oluşturulur/yönetilir.
    // anyField: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false, // default: true
    //     unique: true, // default: false
    //     comment: 'description',
    //     primaryKey: true, // default: false
    //     autoIncrement: true, // default: false
    //     field: 'custom_name',
    //     defaultValue: 'default', // default: null
    // },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: DataTypes.TEXT, // ShortHand Using.

    priority: { // -1: Low, 0: Norm, 1: High
        type: DataTypes.TINYINT, //postgresql desteklemiyor
        //type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }

    //? Not need define createdAt & updatedAt fields.
    //? createdAt ve updatedAt tanımlamaya gerek yoktur. Sequelize otomatik oluşturur/yönetir.
})

// Syncronization:
// Model bilgilerini db'ye uygula:
//sequelize.sync() // CREATE TABLE, tablo zaten oluşmuşsa müdahale etmez, değişikliği algılamaz, veritabanı sıfırdan oluşturulacaksa kullanılır
// sequelize.sync({ force: true }) // DROP TABLE & CREATE TABLE, taboyu siler tekrar oluşturur.
// sequelize.sync({ alter: true }) // TO BACKUP & DROP TABLE & CREATE TABLE & FROM BACKUP, önce yedekler, sonra siler, sonra yeni tablo oluşturur sonra yedekten bilgileri yükler. Veritabanı varsa sürekli bu komutu kullan

// Connect to db:
sequelize.authenticate()
    .then(() => console.log('* DB Connected *'))
    .catch(() => console.log('* DB Not Connected *'))


module.exports = Todo