const mongoose = require('mongoose');
const colors = require('colors');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true,
}

const connectDB = async () => {

    const dbConn = await mongoose.connect(process.env.MONGODB_URI, options)
    console.log(`Database connected: ${dbConn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;