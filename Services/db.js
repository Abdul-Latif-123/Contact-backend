// node + mongodb connection

// 1. import mongoose
const mongoose = require('mongoose')

// connection string
mongoose.connect('mongodb://localhost:27017/NexusCallsDB')

// create model
const contact = mongoose.model('contact', {
    address: {
        geolocation: {
            lat: String,
            long: String,
        },
        city: String,
        street: String,
        number: Number,
        zipcode: String,
    },
    id: Number,
    name: {
        firstname: String,
        lastname: String,
    },
    email: String,
    username: String,
    password: String,
    phone: String
});

module.exports = {
    contact
}