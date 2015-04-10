// -------------------------------------------------------------------
// SERVER SETUP

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
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

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {

    // Schemas
    var PetSchema = new mongoose.Schema({
        name: String,
        id: String,
        picture: String
    });
    var UserSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        id: String,
        email: String,
        password: String,
        favorites: [{
            id: String
        }]
    });

    // Models
    var Pet = mongoose.model('Pet', PetSchema);
    var User = mongoose.model('User', UserSchema);
});