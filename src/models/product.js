'use strict';

//Criamos um schema para realizar validações, já que o BD não possui
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema =  new Schema({
    title: {
        type: String,
        required: [true, 'O título é obrigatório!'],
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'O slug é obrigatório!'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'A descrição é obrigatória!']
    },
    price: {
        type: Number,
        required: [true, 'O preço é obrigatório!']
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    //Definindo como um array de String
    tags: [{
        type: String,
        required: [true, 'As tags são obrigatórias!']
    }],
    image: {
        type: String,
        required: false,
        trim: true
    }
});

module.exports = mongoose.model('Product', schema); //Product é no nome do schema