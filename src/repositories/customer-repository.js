'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

// exports.get = async() => {
//     //Listando produtos ativos e mostrando só o título, preço e slug
//     const res = await Product.find({ 
//                 active: true 
//             }, 'title price slug');
//     return res;
// }

exports.create = async(data) => {
    
    var customer = new Customer(data);
    await customer.save();
}