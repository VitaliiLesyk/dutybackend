const express = require('express');
const router = express.Router();
const taskService = require("../services/TaskService");

router.post('/tasks/add',function (req,res) {
    console.log("Post request: add one task");

    bodyValidation(req);
    req.checkBody('id', 'Id should not be present!').isEmpty();

    if(checkForValidationErrors(req)) {
        sendResponseWithErrors(res, req.validationErrors());
    }
    else
        taskService.add(req, res);
});

router.get('/tasks/get/:id', function (req, res) {
    console.log('GET request: to get one task by id=[' + req.params.id + "]");

    paramIdValidation(req);

    if(checkForValidationErrors(req))
        sendResponseWithErrors(res, req.validationErrors());
    else
        taskService.getOne(req, res);
});

router.get('/tasks/get', function (req, res) {
    console.log('GET request: to get all tasks');
    taskService.getAll(req, res);
});

router.put('/tasks/update/:id', function (req, res) {
    console.log('PUT request: to update one Task by id=[' + req.params.id + "]");

    bodyValidation(req);
    paramIdValidation(req);

    if(checkForValidationErrors(req))
        sendResponseWithErrors(res, req.validationErrors());

    else
        taskService.update(req, res);
});
router.delete('/tasks/delete/:id', function (req, res) {
    console.log('DELETE request: to delete one task by id=[' + req.params.id + "]");

    bodyValidation(req);
    paramIdValidation(req);

    if(checkForValidationErrors(req))
        sendResponseWithErrors(res, req.validationErrors());
    else
        taskService.delete(req, res);
});

function bodyValidation(req){
    req.checkBody('name', 'Name should be present!').notEmpty();
    req.checkBody('name', 'Name should have min size=[6]').len({min: 6});
}

function paramIdValidation(req) {
    req.checkParams('id', "Param id should have size=[24]").len({min:24, max:24}).notEmpty();
}

function checkForValidationErrors(req){
    var errors = req.validationErrors();
    return !!errors;
}

function sendResponseWithErrors(res, errors) {
    console.info("Errors found in TaskController: ");
    for(var i=0;i<errors.length;i++){
        console.info("[" + errors[i].msg + "] ");
    }
    res.status(400).json(errors);
}

module.exports = router;

