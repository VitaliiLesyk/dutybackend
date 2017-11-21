const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const workerController = require('./routes/WorkerController');

const PORT = 8456;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:welcome@ds161793.mlab.com:61793/dutydb');

app.listen(PORT, function () {
    console.log("server started on port:[" + PORT + "]");
});

app.use(bodyParser.json());
app.use(validator());
app.use(workerController);
