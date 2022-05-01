const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/^[a-zA-Z][a-zA-Z\s]*$/, 'Veuillez fournir un nom avec des lettres et espaces seulement'],
        required: 'Veuillez fournir un nom'
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Veuillez fournir une adresse email valide'],
        required: 'Veuillez fournir une adresse email'
    },
    tel: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/^[0-9]+$/, 'Veuillez fournir un numéro de téléphone avec des chiffres seulement'],
        required: 'Veuillez fournir un numéro de téléphone'
    },
    msg: {
        type: String,
        lowercase: true,
        trim: true,
        required: 'Veuillez fournir un message'
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Request', messageSchema);