// Para questão 4 resolvi criar logo um modelo de usuário para o banco de dados mongoDB para continuar usando o mongoose


var mongoose = require('mongoose');

var usuarioSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        senha: { type: String, required: true }
    }
)

var UsuarioModel = mongoose.model('usuarios', usuarioSchema)

module.exports = UsuarioModel

//IR PARA O ARQUIVO: LOGIN.SERVICE.MONGO.JS