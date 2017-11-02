var express = require('express');
var router = express.Router();
var Place = require('../models/placecamp');
var middleware = require('../middleware');
var geocoder = require('geocoder');

// Place 
router.get('/', function(req, res){
    // find place in the databse with the search query
    if(req.query.search){
        // escape all dangerous caracther for security and stock the query string in a variable
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        
        Place.find({name: regex}, function(err, placeCampList){
            console.log(placeCampList);
            if (err){
                console.log(' an arror occur while finding the data in the database');
            } else if (placeCampList.length === 0){
                req.flash('error', 'Sorry We Didnt found this place in the database');
                res.redirect('back');
            } else {
                res.render('./place/list', {placeList: placeCampList});
            }
        });
    // if no query search find all the place  
    } else {
        Place.find({}, function(err, placeCampList){
            if (err){
                console.log(' an arror occur while finding the data in the database');
            } else {
                res.render('./place/list', {placeList: placeCampList});
            }
        });
    }
});



// New Place Form
router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('./place/new');
});



// New Place Logic
router.post('/', middleware.isLoggedIn,  function(req, res){
    var newname = req.body.newname;
    var newcity = req.body.newcity;
    var newimage = req.body.newimage;
    var newcountry = req.body.newcountry;
    var description = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    geocoder.geocode(req.body.location, function (err, data) {
        if(err){
            console.log(err);
        } else {
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            var location = data.results[0].formatted_address;
            var newplace = {
                name: newname,
                country: newcountry,
                city: newcity,
                image: newimage,
                description: description,
                author: author,
                location: location, 
                lat: lat, 
                lng: lng
            };
            
            // insert a new place in the databsee 
            Place.create(newplace, function(err, placecreated){
               if (err){
                   req.flash('error', 'Sorry Didnt found this place in the database');
                   res.redirect('back');
               } else {
                   req.flash('success', 'New place successfully created ');
                   res.redirect('/placecamp');
               }
            });
        }
    });
});




// Show Place
router.get('/:id', function(req, res){
    // populate the id founded with comment and then execute the callback
    Place.findById(req.params.id).populate('comment').exec(function(err, placeReceive){
        if (err){
            req.flash('error', 'err.message');
            res.redirect('back');
        } else {
            res.render('./place/show', {place: placeReceive });
        }
    });
});




// Edit Place Form
router.get('/:id/edit', middleware.isTheAuthor, function(req, res){
    Place.findById(req.params.id, function(err, place){
        if (err){
            req.flash('error', 'Sorry Didnt found this place in the database');
            res.redirect('back');
        } else {
            res.render('place/edit', {place: place});
        } 
            
    });
});


// Edit Place Logic
router.put('/:id', middleware.isTheAuthor, function(req, res){
    geocoder.geocode(req.body.place.location, function (err, data) {
        if(err){
            console.log(err);
        } else {
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            var location = data.results[0].formatted_address;
            req.body.place.lat = lat;
            req.body.place.lng = lng;
            req.body.place.location = location;
            // find the id and update with the data object updated 
            Place.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatedPlace){
                if(err){
                    req.flash('error', 'Sorry Didnt found this place in the database');
                    res.redirect('/placecamp/'+  req.params.id );
                } else {
                   req.flash('success', 'Place successfully edited');
                   res.redirect('/placecamp/'+  req.params.id );
                }
            });
        }
    });
});


// Remove Place
router.delete('/:id', middleware.isTheAuthor, function(req, res){
    Place.findByIdAndRemove(req.params.id, function(err){
        if (err){
            console.log(err);
        } else {
            req.flash('success', 'Place successfully removed from the database');
            res.redirect('/placecamp');
        }
    });
    
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;