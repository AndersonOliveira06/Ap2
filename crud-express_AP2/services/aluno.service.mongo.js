var AlunoModel = require('../models/aluno.models.mongo')

class AlunoService {

    static list(req, res){
        AlunoModel.find()
        .then(
            (alunos) => {
                res.status(201).json(alunos)
            }
        )
        .catch(
            (error) => {
                res.status(500).json(error)
            }
        )
    }

    static register(req, res){
        AlunoModel.create(req.body)
        .then(
            (aluno) => {
                res.status(201).json(aluno)
            }
        )
        .catch(
            (error) => {
                res.status(500).json(error)
            }
        )
    }

    static retrieve(req, res){
        AlunoModel.findById(req.params.id)
        .then(
            (aluno) => {
                res.status(201).json(aluno)
            }
        )
        .catch(
            (error) => {
                res.status(500).json(error)
            }
        )
    }

    static update(req, res){
        AlunoModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        .then(
            (aluno) => {
                res.status(201).json(aluno)
            }
        )
        .catch(
            (error) => {
                res.status(500).json(error)
            }
        )
    }

    static delete(req, res){
        AlunoModel.findByIdAndRemove(req.params.id)
        .then(
            (aluno) => {
                res.status(201).json(aluno)
            }
        )
        .catch(
            (error) => {
                res.status(500).json(error)
            }
        )
    }

}

module.exports = AlunoService