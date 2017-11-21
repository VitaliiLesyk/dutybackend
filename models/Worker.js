const db = require('mongoose');
var Schema = db.Schema;

var WorkerSchema = new Schema({
    name:{
        type:String,
        require:[true, "Name should be present"]
    },
    email:{
        type:String,
        require:[true, "Email should be present"]
    },
    password:{
        type:String,
        require:[true, "Password should be present"]
    },
    status:{
        type:[{
            type: String,
            enum:['ready', 'vacation', 'sick']
        }],
        default : ['ready']
    },
    rating:{
        type:Number,
        default : 0
    }
});

var Worker = db.model('WORKER',WorkerSchema);

module.exports.Worker = Worker;