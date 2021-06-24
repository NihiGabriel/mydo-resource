const app = require('./config/app');
const connectDB = require('./config/db');
const { seedData } = require('./config/seeds/seeder.seed');
const colors = require('colors');

const connect = async() => {
    // connect to DB
    await connectDB();

    await seedData();
}

    connect();

const PORT = process.env.PORT || 5001

const server = app.listen(
    PORT,
    console.log(`Resource service is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)

process.on('unhandledRejection', (err, promise) => {
    console.log(`err: ${err.message}`.red.bold);
    server.close(() => process.exit());
})