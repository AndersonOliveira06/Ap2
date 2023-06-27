var mongoose = require('mongoose');

var professorSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    curso: {type: String, required: true},
    titulacao: {type: String, required: true},
    areasInteresse: {type: Object, required: true}
})

var ProfessorModel = mongoose.model('professores', professorSchema)

module.exports = ProfessorModel