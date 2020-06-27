'use strict';

const mongoose = require('mongoose'); //Precisa ter?
const Order = mongoose.model('Order'); //Precisa ter?
const repository = require('../repositories/order-repository');
const guid = require('guid');

exports.get = async(req, res, next) => {
    try {
        //Listando produtos ativos e mostrando só o título, preço e slug
        const data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição!'
         });
    }
};

//Falta testar
exports.post = async(req, res, next) => {

    try {
        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6), 
            items: req.body.items
        });
        res.status(201).send({ 
            message: "Ordem cadastrado com sucesso!"
        });
    } catch (e) {
        res.status(500).send({ 
            message: "Falha ao cadastrar uma ordem!", 
            data: e
        });
    }
};
