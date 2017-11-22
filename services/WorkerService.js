const Worker = require('../models/Worker').Worker;

exports.add = function(req, res){
    Worker.create(req.body).then(function (added) {
        if(added.notEmpty)
            sendResponse(res, added, 200);
        else
            sendResponse(res, {error: "Not Added"}, 400);
    });
};

exports.getOne = function(req, res){
    Worker.find({_id:req.params.id}).then(function (found){
        if(found.notEmpty)
            sendResponse(res, found, 200);
        else
            sendResponse(res, {error: "Not Found"}, 400);
    })
};

exports.getAll = function(req, res){
    Worker.find({}).then(function (found) {
        if(found.notEmpty)
            sendResponse(res, found, 200);
        else
            sendResponse(res, {error: "Not Found"}, 400);
    });
};

exports.update = function(req, res){
    Worker.findByIdAndUpdate({_id:req.params.id},req.body).then(function () {
        Worker.find({_id:req.params.id}).then(function(updated){
            if(updated.notEmpty)
                sendResponse(res, updated, 200);
            else
                sendResponse(res, {error : "Not Found"}, 400);  //
        });
    });
};

exports.delete = function(req, res){
    Worker.findByIdAndRemove({_id:req.params.id}).then(function (deleted) {
        if(deleted.notEmpty)
            sendResponse(res, deleted, 200);
        else
            sendResponse(res, {error: "Not Found"}, 400);
    });
};

function sendResponse(res, added, status){
    res.status(status).json(added);
}