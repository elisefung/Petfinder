// -------------------------------------------------------------------
// SERVER SETUP

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var http = require('http');
var mongoose = require('mongoose');
mongoose.connect('mongodb://elisefung:fung0409@ds061611.mongolab.com:61611/petfinder');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multer());
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.send('hello world! Petfinder app is coming soon!');
});

app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response) {
    var result = ''
    var times = process.env.TIMES || 5
    for (i = 0; i < times; i++)
        result += cool();
    response.send(result);
});

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'))
})

// -------------------------------------------------------------------
// DATABASE SETUP

// Schemas
var PetSchema = new mongoose.Schema({
    name: String,
    id: String,
    picture: String
});
var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    favorites: [{
        id: String
        }]
});

// Models
var pets = mongoose.model('pets', PetSchema);
var users = mongoose.model('ssers', UserSchema);

// -------------------------------------------------------------------
// PASSING DATABASE TO CLIENT

// Render all pets
app.get('/api/pets', function (req, res) {
    pets.find(function (err, docs) {
        res.json(docs);
    });
});

// Render one pet
app.get('/api/pets/:id', function (req, res) {
    pets.findById(req.params.id, function (err, doc) {
        res.json(doc);
    });
});

// Delete pet by ID
app.delete('/api/pets/:id', function (req, res) {
    pets.remove({
        _id: req.params.id
    }, function () {
        res.json(docs);
    });
});