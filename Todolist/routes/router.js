var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// 连接数据库
// 管理员名称user：Todo pwd：Todo
mongoose.connect('mongodb://Todo:Todo@localhost:27017/ToDoList',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));

const taskSchema = new mongoose.Schema({
    complete: {
        type: Boolean
    },
    title: {
        type: String
    }
}, { versionKey: false });

const taskModel = mongoose.model('tasks', taskSchema);


router.get('/task', function (req, res) {
    taskModel.find({}, function (err, result) {
        if (err) {
            res.json('fail')
        } else {
            res.json(result)
        }
    })
});

router.post('/addTask', function (req, res, next) {
    req.on('data', function (data) {
        obj = JSON.parse(data);
        taskModel.create(obj, function (err, result) {
            if (err) {
                return console.log(err);
            }
            res.json(result)
        });
    });
});

router.delete('/delTask', function (req, res) {
    taskModel.deleteMany({ '_id': req.query["_id"] }, function (err, result) {
        if (err) {
            return console.log(err);
        }
        res.json(result)
    });
});

router.put('/togTask', function (req, res) {
    req.on('data', function (data) {
        obj = JSON.parse(data);
        taskModel.findByIdAndUpdate({ '_id': obj._id }, { $set: { 'complete': obj.complete } }, { new: true }, function (err, result) {
            if (err) {
                return console.log(err);
            }
            res.send(result)
        });
    });

});


router.put('/editTask', function (req, res) {
    req.on('data', function (data) {
        obj = JSON.parse(data);
        taskModel.findByIdAndUpdate({ '_id': obj._id }, { $set: { 'title': obj.title } }, { new: true }, function (err, result) {
            if (err) {
                return console.log(err);
            }
            res.send(result)
        });
    });
});


module.exports = router; 
