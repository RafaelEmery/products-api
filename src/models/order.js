'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    //Relação com um objeto customer  
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer' //Referencia o model
    },
    number: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'], //Enum com um padrão de created
        default: 'created'
    },
    //Array que representa uma lista de items com quantidade, preço (total) e product 
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true
        },
        //Relação com um objeto product  
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
});

module.exports = mongoose.model('Order', schema);