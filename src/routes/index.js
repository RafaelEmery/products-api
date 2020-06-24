'use strict';

const express = require('express');
const router = express.Router();    

router.get('/', (req, res, next) => {
    //Caso a resposta seja positiva (Ok!), envia um objeto
    res.status(200).send({
        title: 'Node JS API',
        version: '0.0.3'
    });
});

module.exports = router;