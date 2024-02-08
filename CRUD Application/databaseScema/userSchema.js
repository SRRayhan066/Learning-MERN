const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    todos : [
        {
            type : mongoose.Types.ObjectId,
            ref : "ToDo"
        }
    ]
});

module.exports = userSchema;