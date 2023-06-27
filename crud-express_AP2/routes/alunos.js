var express = require('express');
var router = express.Router();

var alunoServiceMongo = require("../services/aluno.service.mongo")

router.get(
    "/listar"
    ,
    (req, res, next) => {
        alunoServiceMongo.list(req, res)
    }
)

router.post(
    '/register'
    ,
    (req, res, next) => {
        alunoServiceMongo.register(req,res)
    }
)

router.get(
    "/retrieve/:id"
    ,
    (req, res, next) => {
        alunoServiceMongo.retrieve(req, res)
    }
)

router.put(
    "/update/:id"
    ,
    (req, res, next) => {
        alunoServiceMongo.update(req, res)
    }
)

router.delete(
    "/delete/:id"
    ,
    (req, res, next) => {
        alunoServiceMongo.delete(req, res)
    }
)

module.exports = router;