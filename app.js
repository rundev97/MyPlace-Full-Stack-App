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


// call seed() methode to laod basic mokup data in our app  
// seedDB();


//Mongoose Database connection 
mongoose.connect(process.env.DATABASEURL);


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



// Middleware making the currentUser variable available in all the app
// Instead of passing the variable from the route to the view with {currentUser: req.user}
// wich make the variable ONlY available in the page render selected from the view folder
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// Routes
app.use('/placecamp/:id/comments', commentRoutes);
app.use('/placecamp', placeRoutes);
app.use(userRoutes);


// Listen on Routes
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('PlaceCamp Node Server started');
});


