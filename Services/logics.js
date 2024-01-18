// import db.js
const db = require('../Services/db')

const getAllContacts = () => {
    return db.contact.find().then(
        (result) => {
            if (result) {
                return {
                    statusCode: 200,
                    contacts: result
                }
            }
            else {
                return {
                    statusCode: 404,
                    message: 'Contacts not found'
                }
            }
        }
    )
}

const addContact = (id, firstname, lastname, email, phone, username, password, lat, long, city, street, number, zipcode) => {
    return db.contact.findOne({ id }).then(
        (result) => {
            if (result) {
                return {
                    statusCode: 404,
                    message: "Contact already exists"
                }
            }
            else {
                const contactData = {
                    address: {
                        geolocation: {
                            lat: lat,
                            long: long,
                        },
                        city: city,
                        street: street,
                        number: number,
                        zipcode: zipcode,
                    },
                    id: id,
                    name: {
                        firstname: firstname,
                        lastname: lastname,
                    },
                    email: email,
                    username: username,
                    password: password,
                    phone: phone,
                }
                const newContact = new db.contact(contactData)
                newContact.save();
                return {
                    statusCode: 200,
                    message: "Contact added successfully"
                }
            }
        }
    )
}

const viewContact = (id) => {
    return db.contact.findOne({ id }).then(
        (result) => {
            return {
                statusCode: 200,
                contacts: result
            }
        })
        .catch((error) => {
            return {
                statusCode: 401,
                message: "Cannot find contact"
            }
        })
}

const deleteContact = (id) => {
    return db.contact.deleteOne({ id }).then(
        (result) => {
            return {
                statusCode: 200,
                message: "Contact has been successfully deleted"
            }
        })
        .catch((error) => {
            return {
                statusCode: 401,
                message: "Cannot find contact"
            }
        })
}

const updateContact = (urlid, id, firstname, lastname, email, phone, username, password, lat, long, city, street, number, zipcode) => {
    return db.contact.findOne({ id: urlid }).then(
        (result) => {
            if (result) {
                return db.contact.findOne({ id: id }).then(
                    (resultnew) => {
                        if (resultnew && urlid != id) {
                            return {
                                statusCode: 404,
                                message: "Please enter a unique updated id"
                            }
                        }
                        else {
                            result.address.geolocation.lat = lat;
                            result.address.geolocation.long = long;
                            result.address.city = city;
                            result.address.street = street;
                            result.address.number = number;
                            result.address.zipcode = zipcode;
                            result.id = id;
                            result.name.firstname = firstname;
                            result.name.lastname = lastname;
                            result.email = email;
                            result.username = username;
                            result.password = password;
                            result.phone = phone;

                            result.save();

                            return {
                                statusCode: 200,
                                message: "Contact updated successfully"
                            }
                        }
                    }
                )
            }
            else {
                return {
                    statusCode: 404,
                    message: 'Contact not found'
                }
            }
        }
    )
}

module.exports = {
    getAllContacts,
    addContact,
    viewContact,
    deleteContact,
    updateContact
}