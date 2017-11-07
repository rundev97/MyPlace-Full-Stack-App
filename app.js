var express          = require('express'),
    app              = express(),
    bodyParser       = require('body-parser'),
    mongoose         = require('mongoose'),
    User             = require('./models/user'),
    seedDB           = require('./seeds'),
    passport         = require('passport'),
    localStrategy    = require('passport-local'),
    expressSession   = require('express-session'),
    commentRoutes    = require('./routes/comment'),
    placeRoutes      = require('./routes/place'),
    methodOverride   = require('method-override'),
    flash            = require('connect-flash'),
    userRoutes       = require('./routes/user'),
    expressSanitizer = require('express-sanitizer');


// call seed() Only first time to laod basic fake data in our app  
// seedDB();


//Mongoose Database connection 
var url = (process.env.DATABASEURL || 'mongodb://localhost/placecamp' );
mongoose.connect(url);


// App setting and use
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
app.use(expressSanitizer());


app.locals.moment = require('moment');

//====== passport Security config =========
app.use(expressSession({
    secret:' Welcome in the real world',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//========================================



// Making variable available in all the app using middleware
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});


// Routes Setting
app.use('/placecamp/:id/comments', commentRoutes);
app.use('/placecamp', placeRoutes);
app.use(userRoutes);




// Listen on Routes with environement variable
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('PlaceCamp Node Server started on Port: ' + process.env.PORT + ' and ip: ' + process.env.IP);
});


