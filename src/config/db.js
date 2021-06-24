const mongoose = require('mongoose');
const colors = require('colors');

const nats = require('../events/nats');

// listeners
const UserCreated = require('../events/listeners/user-created');

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

const connectNats = async () => {
    
    if(!process.env.NATS_CLUSTER_ID){
        throw new Error(`NATS_CLUSTER_ID must be defined`);
    }

    if(!process.env.NATS_URI){
        throw new Error(`NATS_URI must be defined`);
    }

    // connect to Nats
    await nats.connect(process.env.NATS_CLUSTER_ID, 'do-res-service', process.env.NATS_URI);

    process.on(`SIGINT`, () => nats.client.close());  //sigint is to watch for intercept or interruptions
    process.on(`SIGTERM`, () => nats.client.close()); // close server if there is an interruption

    nats.client.on('close', () => {
        console.log('NATS connection closed');
        process.exit();
    })
}

const listenNats = async () => {

    await new UserCreated(nats.client).listen();
}

const connectDB = async () => {
    await connectNats();

    listenNats();
    
    const dbConn = await mongoose.connect(process.env.MONGODB_URI, options)
    console.log(`Database connected: ${dbConn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;