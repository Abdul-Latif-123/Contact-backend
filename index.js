// import express
const express = require('express')

// import cors
const cors = require('cors')

const logic = require('./Services/logics')

// create an app using express
const ncServer = express()

// using cors to connect to frontend
ncServer.use(cors({
    origin: "http://localhost:3000"
}))

// create a middleware to parse json data
ncServer.use(express.json())

// define a port number
ncServer.listen(8000, () => {
    console.log("ncServer listening on port 8000");
})

ncServer.get('/get-all-contacts', (req, res) => {
    logic.getAllContacts().then((response) => {
        res.status(response.statusCode).json(response)
    })
})

ncServer.post('/add-contact', (req, res) => {
    logic.addContact(req.body.id, req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.username, req.body.password, req.body.lat, req.body.long, req.body.city, req.body.street, req.body.number, req.body.zipcode).then((response) => {
        res.status(response.statusCode).json(response)
    })
})

ncServer.get('/view-contact/:id', (req, res) => {
    logic.viewContact(req.params.id).then((response) => {
        res.status(response.statusCode).json(response)
    })
})

ncServer.delete('/delete-contact/:id', (req, res) => {
    logic.deleteContact(req.params.id).then((response) => {
        res.status(response.statusCode).json(response)
    })
})

ncServer.post('/update-contact/:id', (req, res) => {
    logic.updateContact(req.body.urlid, req.body.id, req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.username, req.body.password, req.body.lat, req.body.long, req.body.city, req.body.street, req.body.number, req.body.zipcode).then((response) => {
        res.status(response.statusCode).json(response)
    })
})