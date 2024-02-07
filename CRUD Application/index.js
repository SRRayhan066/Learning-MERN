const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const toDoHandler = require('./routerHandler/toDoHandler');
const userHandler = require('./routerHandler/userHandler');

const app = express();
dotenv.config();
app.use(express.json());

//connect with database
mongoose.connect('mongodb://localhost/newToDo')
    .then(() => console.log('Connection Successful'))
    .catch(err => console.log(err));


//application routes
app.use('/todo',toDoHandler);
app.use('/user',userHandler);


//default error handler
const errorHandler = (err, req, res, next) =>{
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({error : err});
}

app.use(errorHandler);

app.listen(4000, () =>{
    console.log('Server is running on port 4000');
});