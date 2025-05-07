const mongoose = require('mongoose');

const connect = mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log("MongoDB is connected")
});

connection.on('error', (error) => {
    console.log("MongoDB has error in connection", error)
})

module.exports = mongoose;