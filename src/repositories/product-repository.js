'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

//Todos os métodos estão dando erro!
//É necessário testar tudo com o código fonte

//Exportando os métodos para as rotas
exports.get = async() => {
    //Listando produtos ativos e mostrando só o título, preço e slug
    const res = await Product.find({ 
                active: true 
            }, 'title price slug');
    return res;
}

exports.getBySlug = async() => {
    //Listando o produto por slug
    const res = await Product.findOne({ 
                slug: slug,
                active: true 
            }, 'title description price slug tags');
    return res;
}

exports.getById = async() => {
    //Listando o produto por id
    const res = await Product.findById(id);
    return res;
}

exports.getByTag = async() => {
    //Listando o produto por uma tag
    const res = Product.find({ 
                tags: tag,
                active: true 
            }, 'title description price slug tags');
    return res;
}

exports.create = async(data) => {
    
    var product = new Product(data);
    await product.save();
}

exports.update = async(id, data) => {
    
    await Product.findByIdAndUpdate(id, {
                //"Settando" o que veio da request
                $set: {
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    slug: data.slug
                }});
};

exports.delete = async(id) => {

    await Product.findOneAndRemove(id);
}