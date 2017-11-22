const db = require('mongoose');
var Schema = db.Schema;

var TaskSchema = new Schema({
    name:{
        type:String,
        require:[true, "Name must be"]
    },
    description:{
        type:String
    }
});

var Task = db.model('TASK',TaskSchema);
module.exports.Task = Task;