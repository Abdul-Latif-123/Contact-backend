// import express
const express = require('express')

// import cors
const cors = require('cors')

const logic = require('./Services/logics')

// create an app using express
const emsServer = express()

// using cors to connect to frontend
emsServer.use(cors({
    origin: "http://localhost:3000"
}))

// create a middleware to parse json data
emsServer.use(express.json())

// define a port number
emsServer.listen(8000, () => {
    console.log("emsServer listening on port 8000");
})

emsServer.get('/get-all-contacts', (req, res) => {
    logic.getAllContacts().then((response) => {
        res.status(response.statusCode).json(response)
    })
})

emsServer.post('/add-contact', (req, res) => {
    logic.addContact(req.body.id, req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.username, req.body.password, req.body.lat, req.body.long, req.body.city, req.body.street, req.body.number, req.body.zipcode).then((response) => {
        res.status(response.statusCode).json(response)
    })
})

emsServer.get('/view-contact/:id', (req, res) => {
    logic.viewContact(req.params.id).then((response) => {
        res.status(response.statusCode).json(response)
    })
})

emsServer.delete('/delete-contact/:id', (req, res) => {
    logic.deleteContact(req.params.id).then((response) => {
        res.status(response.statusCode).json(response)
    })
})

emsServer.post('/update-contact/:id', (req, res) => {
    logic.updateContact(req.body.urlid, req.body.id, req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.username, req.body.password, req.body.lat, req.body.long, req.body.city, req.body.street, req.body.number, req.body.zipcode).then((response) => {
        res.status(response.statusCode).json(response)
    })
})