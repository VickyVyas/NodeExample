var express = require('express');
var app = express();

var path = require("path");
var fs = require('fs');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var students = [
      {
          "id": 1,
          "name": "Vikas",
          "Roll": "3"
      },
      {
          "id": 2,
          "name": "Doli",
          "Roll": "4"
      }
];

// get all student
app.get('/api/getStudent', function (req, res) {
    res.send(students);
});

// get perticuler Student
app.get('/api/getStudent/:id', function (req, res) {
    var studentData = students.find(s => s.id === parseInt(req.params.id))
    if (!studentData)
        res.send({ "status": "No Record found !!" });
    else
        res.send({ "status": "Success", "data": studentData });
});

// Delete student
app.get('/api/deleteStudent/:id', (req, res) => {
    let indexId = students.findIndex((studentData) => { return studentData.id == parseInt(req.params.id); });
    if (indexId) {
        students.splice(indexId, 1);
        res.send({ "status": "Success", "Message": "Record deleted successfully !!", "data": students });
    }
    else {
        res.send({ "status": "No Record found for the delete !!" });
    }
});

// Edit student
app.post('/api/editStudent/:id', (req, res) => {
    let id = parseInt(req.params.id);
    students.find((student) => {
        if (student.id == id) {
            student.name = req.body.name;
            student.Roll = req.body.Roll;
            res.send({ "status": "Success", "Message": "Record updated successfully!!", "data": students });
        }

    });
});
// Add new student
app.post('/api/addStudent', function (req, res) {
    let lastId = students[students.length - 1].id + 1;
    console.log(lastId);
    students.push({ id: lastId, name: req.body.name, Roll: req.body.Roll });
    res.send({ "status": "Success", "Message": "Record inserted successfully!!", "data": students });
});


var server = app.listen(5000, function () {
    console.log('Node server is running..');
});