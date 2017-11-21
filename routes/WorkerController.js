const express = require('express');
const router = express.Router();
const workerService = require("../services/WorkerService");

router.post('/workers/add', function (req, res) {
    console.log('POST request: to add one worker');

    bodyValidation(req);
    req.checkBody('id', 'Id should not be present!').isEmpty();

    if(checkForValidationErrors(req)) {
        sendResponseWithErrors(res, req.validationErrors());
    }
    else
        workerService.add(req, res);
});

router.get('/workers/get/:id', function (req, res) {
    console.log('GET request: to get one worker by id=[' + req.params.id + "]");

    paramIdValidation(req);

    if(checkForValidationErrors(req))
        sendResponseWithErrors(res, req.validationErrors());
    else
        workerService.getOne(req, res);
});

router.get('/workers/get', function (req, res) {
   console.log('GET request: to get all workers');
   workerService.getAll(req, res);
});

router.put('/workers/update/:id', function (req, res) {
   console.log('PUT request: to update one worker by id=[' + req.params.id + "]");

   bodyValidation(req);
   paramIdValidation(req);

   if(checkForValidationErrors(req))
        sendResponseWithErrors(res, req.validationErrors());

   else
       workerService.update(req, res);
});

router.delete('/workers/delete/:id', function (req, res) {
   console.log('DELETE request: to delete one worker by id=[' + req.params.id + "]");

   bodyValidation(req);
   paramIdValidation(req);

   if(checkForValidationErrors(req))
        sendResponseWithErrors(res, req.validationErrors());
   else
       workerService.delete(req, res);
});

    function bodyValidation(req){
        req.checkBody('name', 'Name should be present!').notEmpty();
        req.checkBody('name', 'Name should have min size=[6]').len({min: 6});
        req.checkBody('email', 'Such email does not exists!').isEmail();
        req.checkBody('password', 'Password should be present!').notEmpty();
        req.checkBody('password', 'Password should have min size=[6]').len({min:6});
        req.checkBody('rating', 'Rating should not be present!').isEmpty();
    }

    function paramIdValidation(req) {
        req.checkParams('id', "Param id should have size=[24]").len({min:24, max:24}).notEmpty();
    }

    function checkForValidationErrors(req){
        var errors = req.validationErrors();
        return !!errors;
    }

    function sendResponseWithErrors(res, errors) {
        console.info("Errors found in WorkerController: ");
        for(var i=0;i<errors.length;i++){
            console.info("[" + errors[i].msg + "] ");
        }
        res.status(400).json(errors);
    }

module.exports = router;
