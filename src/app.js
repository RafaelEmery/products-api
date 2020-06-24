// Rep. fonte: https://github.com/balta-io/1972

'use strict';

const express = require('express');
const bodyParser = require('body-parser'); //Atua como um middleware para o body das requisições
const mongoose = require('mongoose');

const app = express();
const router =  express.Router();

//Conectando ao banco de dados usando a string do Cloud MongoDB
mongoose.connect('mongodb+srv://rafael:rafael@nodeapi-lvutw.azure.mongodb.net/NodeAPI?retryWrites=true&w=majority')

const Product = require('./models/product'); //Importa os Models
const Customer = require('./models/costumer');
const Order = require('./models/order');

const index = require('./routes/index'); //Importa as rotas do routes/index.js
const products = require('./routes/products');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false //Desativa a codificação da url (%20 nos espaços, por exemplo)
}));

//Usando as rotas...
app.use('/', index); //Rota "teste"
app.use('/products', products);

//Exportando o objeto app usarmos o require()
module.exports = app;