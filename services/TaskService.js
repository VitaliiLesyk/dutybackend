const Task = require('../models/Task').Task;

exports.add = function(req, res){
    Task.create(req.body).then(function (added) {
        sendResponse(res, added, 200);
    });
};
exports.getOne = function(req, res){
    Task.find({_id:req.params.id}).then(function (found){
        if(found.notEmpty)
            sendResponse(res, found, 200);
        else
            sendResponse(res, {error: "Not Found"}, 400);
    })
};
exports.getAll = function(req, res){
    Task.find({}).then(function (found) {
        if(found.notEmpty)
            sendResponse(res, found, 200);
        else
            sendResponse(res, {error: "Not Found"}, 400);
    });
};
exports.delete = function(req, res){
    Task.findByIdAndRemove({_id:req.params.id}).then(function (deleted) {
        if(deleted.notEmpty)
            sendResponse(res, deleted, 200);
        else
            sendResponse(res, {error: "Not Found"}, 400);
    });
};
function sendResponse(res, added, status){
    res.status(status).json(added);
}