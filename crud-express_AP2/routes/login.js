var express = require('express');
var router = express.Router();

var loginServiceMongo = require("../services/login.service.mongo")

router.get(
    "/listar"
    ,
    (req, res, next) => {
        loginServiceMongo.listOne(req, res)
    }
)

router.post(
    "/registrar"
    ,
    (req, res, next) => {
        loginServiceMongo.register(req, res)
    }
)

module.exports = router;