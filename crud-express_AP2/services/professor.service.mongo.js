var ProfessorModel = require("../models/professor.models.mongo")

class ProfessorService {

    static list(req, res){
        ProfessorModel.find()
        .then(
            (professores) => {
                res.status(201).json(professores)
            }
        )
        .catch(
            (error) => {
                res.status(500).json(error)
            }
        )
    }

    static register(req, res){
        ProfessorModel.create(req.body)
        .then(
            (professor) => {
                res.status(201).json(professor)
            }
        )
        .catch(
            (error) => {
                res.status(500).json(error)
            }
        )
    }

    static retrieve(req, res){
        ProfessorModel.findById(req.params.id)
        .then(
            (professor) => {
                res.status(201).json(professor)
            }
        )
        .catch(
            (error) => {
                res.status(500).json(error)
            }
        )
    }

    static update(req, res){
        ProfessorModel.findByIdAndUpdate(
            req.params.id, 
            req.body,
            {new: true}
        )
        .then(
            (professor) => {
                res.status(201).json(professor)
            }
        )
        .catch(
            (error) => {
                res.status(500).json(error)
            }
        )
    }

    static delete(req, res){
        ProfessorModel.findByIdAndRemove(req.params.id)
        .then(
            (professor) => {
                res.status(201).json(professor)
            }
        )
        .catch(
            (error) => {
                res.status(500).json(error)
            }
        )
    }

}

module.exports = ProfessorService