'use strict';

const mongoose = require('mongoose'); //Precisa ter?
const Product = mongoose.model('Product'); //Precisa ter?
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

//Todos os métodos estão dando erro!
//É necessário testar tudo com o código fonte
//Necessário fazer mais validações (?)

//Exportando os métodos para as rotas
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

exports.getBySlug = async(req, res, next) => {
    try {
        //Listando o produto por slug
        const data = await repository.getBySlug(req.params.slug)   
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição!'
        });  
    }      
}; 

//Falta testar
exports.getById = async(req, res, next) => {
    try {
        //Listando o produto por Id
        const data = await repository.getById(req.params.id)   
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição!'
        });  
    }   
};

//Falta testar
exports.getByTag = async(req, res, next) => {
    try {
        //Listando o produto por Tag
        const data = await repository.getByTag(req.params.tag)   
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição!'
        });  
    } 
};

//Falta testar
exports.post = async(req, res, next) => {
    //Validações do validator
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O description deve conter pelo menos 3 caracteres');

    //Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try {
        await repository.create(req.body);
        res.status(201).send({ 
            message: "Produto cadastrado com sucesso!"
        });
    } catch (e) {
        res.status(400).send({ 
            message: "Falha ao cadastrar um produto!", 
            data: e
        });
    }
};

// Falta testar
exports.put = async(req, res, next) => {
    const id = req.params.id; //Atribui o id passado como query param (/:id)
    
    try {
        await repository.update(req.params.id, req.body);
        res.status(201).send({ 
            message: "Produto atualizado com sucesso!"
        });
    } catch (e) {
        res.status(400).send({ 
            message: "Falha ao atualizar um produto!", 
            data: e
        });
    }
};

// Falta testar
exports.delete = async(req, res, next) => {
    const id = req.params.id; 
    
    //Pode usar um req.body.id em vez de fazer na rota
    try {
        await repository.delete(id);
        res.status(201).send({ 
            message: "Produto deletado com sucesso!"
        });
    } catch (e) {
        res.status(400).send({ 
            message: "Falha ao deletar um produto!", 
            data: e
        });
    }
};