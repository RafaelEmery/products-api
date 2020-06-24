'use strict'; //Força a padronização de código (ESLint, entre outros)

const app = require('../src/app');
const debug = require('debug')('nodestr:server'); //Dando nome para o debug
const http = require('http');

const port = normalizePort(process.env.PORT || '3000'); //Passando a porta normalizada ou 3000

//Verificar a necessidade deste método
app.set('port', port);

//Criando o servidor e as URLs
const server = http.createServer(app);

//Rodando o servidor na porta 3000
server.listen(port);
console.log('API rodando na porta: ' + port);

//Rodando os eventos para erro e debug
server.on('error', onError);
server.on('listening', onListening);

//Função do express usada para situações específicas
//Microsoft Azure necessita dela, de certa forma...
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

//Função do express para ver o erro do servidor
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        //Caso não tenha privilégios
        case 'EACCES':
            console.error(bind + ' required privileges');
            process.exit(1);
            break;
        //Caso a porta já esteja em uso
        case 'EADDRINUSE':
            console.error(bind + 'is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

//Função para iniciar o debug
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' 
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    
    debug('Listening on ' + bind);
}