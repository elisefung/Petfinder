// -------------------------------------------------------------------
// SERVER SETUP

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var http = require('http');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.connect('mongodb://elisefung:fung0409@ds061611.mongolab.com:61611/petfinder');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multer());
app.use(session({
    secret: 'this is the secret'
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

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
// DATA OBJECT MODEL

// Schemas
var PetSchema = new mongoose.Schema({
    name: String,
    id: String,
    picture: String
});
var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    favorites: [{
        id: String
    }],
    friends: [{
        id: String
    }]
});

// Models
var pets = mongoose.model('pets', PetSchema);
var users = mongoose.model('users', UserSchema);

// -------------------------------------------------------------------
// AUTHENTICATION

passport.use(new LocalStrategy(
    function (username, password, done) {
        users.findOne({
            username: username,
            password: password
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        })
    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.post('/login', passport.authenticate('local'), function (req, res) {
    console.log('hello ' + req.user);
    var user = req.user;
    res.json(user);
});

app.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/logout', function (req, res) {
    req.logOut();
    res.send(200);
});

app.post('/signup', function (req, res) {
    var newUser = req.body;
    users.findOne({
        username: newUser.username
    }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            res.json(null);
            return;
        }
        var newUser = new users(req.body);
        newUser.save(function (err, user) {
            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }
                res.json(user);
            });
        });
    });
});

var auth = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
};

// -------------------------------------------------------------------
// USERS

// get all registered users
app.get("/api/users", auth, function (req, res) {
    users.find(function (err, users) {
        res.json(users);
    });
});

// remove the user and return all users
app.delete("/api/users/:id", auth, function (req, res) {
    users.findById(req.params.id, function (err, user) {
        user.remove(function (err, count) {
            users.find(function (err, users) {
                res.json(users);
            });
        });
    });
});

// add the user return all users
app.post("/api/users", auth, function (req, res) {
    users.findOne({
        email: req.body.email
    }, function (err, user) {
        if (user == null) {
            user = new users(req.body);
            user.save(function (err, user) {
                users.find(function (err, users) {
                    res.json(users);
                });
            });
        } else {
            users.find(function (err, users) {
                res.json(users);
            });
        }
    });
});

// update the user and return all users
app.put("/api/users/:id", auth, function (req, res) {
    users.findById(req.params.id, function (err, user) {
        user.update(req.body, function (err, count) {
            users.find(function (err, users) {
                res.json(users);
            });
        });
    });
});

// get the user by ID and return single user
app.get('/api/user/:id', auth, function (req, res) {
    users.findById(req.params.id, function (err, user) {
        res.json(user);
    });
});

// update the user and return single user
app.put('/api/user/:id', auth, function (req, res) {
    users.findById(req.params.id, function (err, user) {

        user.update(req.body, function (err, count) {
            users.findById(req.params.id, function (err, user) {
                res.json(user);
            });
        });
    });
});



// -------------------------------------------------------------------
// PETS

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