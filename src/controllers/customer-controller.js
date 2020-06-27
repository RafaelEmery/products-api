'use strict';

const mongoose = require('mongoose'); //Precisa ter?
const Customer = mongoose.model('Customer'); //Precisa ter?
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');

//Falta testar
exports.post = async(req, res, next) => {
    //Validações do validator
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'Email inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 3 caracteres');

    //Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY) //SALT_KEY vazia no momento
        });
        res.status(201).send({ 
            message: "Cliente cadastrado com sucesso!"
        });
    } catch (e) {
        res.status(500).send({ 
            message: "Falha ao cadastrar um cliente!", 
            data: e
        });
    }
};
