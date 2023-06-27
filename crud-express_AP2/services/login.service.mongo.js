var UsuarioModel = require('../models/usuario.models.mongo')


class LoginService {
    //Criei um método para listar apenas UM usuário no banco de dados e mandar para a requisição feita no front
    static listOne(req, res){
        UsuarioModel.findOne(req.body)
        .then(
            (usuario) => {
                res.status(201).json(usuario)
            }
        )
        .catch(
            (error) => {
                res.status(500).json(error)
            }
        )
    }

    //Criei um método para registrar um usuário no banco de dados e para criá-lo usei o Insomnia
    static register(req, res){
        UsuarioModel.create(req.body)
        .then(
            (usuario) => {
                res.status(201).json(usuario)
            }
        )
        .catch(
            (error) => {
                res.status(500).json(error)
            }
        )
    }
}

module.exports = LoginService

