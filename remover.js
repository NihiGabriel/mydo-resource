const mongoose = require('mongoose');
const { config } = require('dotenv')
const colors = require('colors');

config();

const Country = require('./src/models/Country.model');
const Language = require('./src/models/Language.model');
const Payment = require('./src/models/Payment.model');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
    keepAlive: true,        
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true,
}

if(process.env.NODE_ENV === 'test'){
    mongoose.connect(process.env.MONGODB_TEST_URI, options);
}

if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production'){
    mongoose.connect(process.env.MONGODB_URI, options)
}

const deleteData = async () => {
    try {

        await Country.deleteMany();
        await Language.deleteMany();
        await Payment.deleteMany();

        console.log('Data destroyed successfully...'.red.inverse);
        process.exit();

    } catch (err) {
        console.log(err)
    }
}

if(process.argv[2] === '-d'){
    deleteData();
}