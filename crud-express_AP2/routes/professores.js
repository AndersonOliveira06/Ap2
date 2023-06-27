var express = require('express');
var router = express.Router();

var professorServiceMongo = require("../services/professor.service.mongo")

router.get(
    "/listar"
    ,
    (req, res, next) => {
        professorServiceMongo.list(req, res)
    }
)

router.post(
    '/register',
     function(req, res, next) {
        professorServiceMongo.register(req,res)
    }
)

router.get(
    "/retrieve/:id"
    ,
    (req, res, next) => {
        professorServiceMongo.retrieve(req, res)
    }
)

router.put(
    "/update/:id"
    ,
    (req, res, next) => {
        professorServiceMongo.update(req, res)
    }
)

router.delete(
    "/delete/:id"
    ,
    (req, res, next) => {
        professorServiceMongo.delete(req, res)
    }
)

module.exports = router;
