const express = require('express');
const mongoose = require('mongoose');
const toDoHandler = require('./routerHandler/toDoHandler');

const app = express();

app.use(express.json());

//connect with database
mongoose.connect('mongodb://localhost/newToDo')
    .then(() => console.log('Connection Successful'))
    .catch(err => console.log(err));


//application routes
app.use('/todo',toDoHandler);


//default error handler
function errorHandler(err, req, res, next){
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({error : err});
}

app.listen(4000, () =>{
    console.log('Server is running on port 4000');
});