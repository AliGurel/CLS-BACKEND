const mongoose = require('mongoose');
const { CustomError } = require('../errors/customError');

const mongooseConnection = async() => {
try {
    await mongoose.connect(process.env.MONGODB)
    console.log('DB Connected');
}catch{
    console.log('DB not connected');
    throw new CustomError("db connection is failed...")
}
    

}

module.exports = {mongooseConnection}