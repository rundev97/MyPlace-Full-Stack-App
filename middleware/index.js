var Place = require('../models/placecamp');
var Comment = require('../models/comment');

var middlewareObj={};

middlewareObj.isTheAuthor = function(req, res, next){
    Place.findById(req.params.id, function(err, place){
        if(err){
            req.flash('error', 'Sorry didnt found this place in the database');
            res.redirect('back');
        } else {
            if( req.isAuthenticated() && place.author.id.equals(req.user._id)){
                console.log('You are loged and the owner you ll be redirect to edit page');
                next();
            } else {
                req.flash('error', 'Only the Author can modify his post');
                res.redirect('/placecamp');
                console.log('you need to login and be the owner to edit this post');
            }
        }
    });
};


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to login to access this page');
    res.redirect('/login');
};


middlewareObj.isTheCommentAuthor = function(req, res, next){
    Comment.findById(req.params.commentid, function(err, comment){
        if(err){
            req.flash('error', 'Sorry didnt found this comment in the database');
            res.redirect('back');
        } else {
            if( req.isAuthenticated() && comment.author.id.equals(req.user._id)){
                console.log('You are loged and the owner you ll be redirect to edit page');
                next();
            } else {
                req.flash('error', 'Only the Author can modify his comment');
                res.redirect('back');
                console.log('you need to login and be the owner to edit this post');
            }
        }
    });
};



module.exports = middlewareObj;