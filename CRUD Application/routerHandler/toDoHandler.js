const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const toDoSchema = require('../databaseScema/toDoSchema');
const ToDo = new mongoose.model('ToDo',toDoSchema);

// get all task
router.get('/',(req,res)=>{
    ToDo.find().select({
        _id : 0,
        __v : 0
    })
    .then((data)=>{
        res.status(200).json({
            dataArray : data,
            message : 'All data loaded successfully'
        })
    }).catch(err =>{
        res.status(500).json({
            error : err
        })
    })
})

// get a task
router.get('/getOne',(req,res)=>{
    ToDo.find({_id: req.body.id}).select({
        _id : 0,
        __v : 0
    })
    .then((data)=>{
        res.status(200).json({
            data : data,
            message : 'Data loaded successfully'
        })
    }).catch(err =>{
        res.status(500).json({
            error : err
        })
    })
})

// post a task
router.post('/', async (req,res)=>{
    const newToDo = new ToDo(req.body);
    await newToDo.save()
        .then(()=>{
            res.status(200).json({
                message : 'Successfully task added'
            })
        }).catch(err => {
            res.status(500).json({
                error : err
            })
        })
})

// post all task
router.post('/all',(req,res)=>{
    ToDo.insertMany(req.body)
        .then(() =>{
            res.status(200).json({
                message : 'All task added succesfully'
            })
        }).catch(err =>{
            res.status(500).json({
                error : err
            })
        })
})

// update a task
router.put('/:id',(req,res)=>{
    ToDo.updateOne({_id : req.params.id},
        {
            $set : {
                status : req.body.status
            },
        }
    ).then(()=>{
        res.status(200).json({
            message : 'Updated Succesfully'
        })
    }).catch(err =>{
        res.status(500).json({
            error : err
        })
    })
})

// delete a task
router.delete('/deleteOne',(req,res)=>{
    ToDo.deleteOne({_id : req.body.id})
        .then(()=>{
            res.status(200).json({
                message : 'Successfully deleted'
            })
        }).catch(err =>{
            res.status(500).json({
                error : err
            })
        })
})

module.exports = router;