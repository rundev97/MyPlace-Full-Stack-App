var express = require('express');
var router = express.Router({mergeParams: true}); // make all paramter like :id availabe  in this comment route
var Place = require('../models/placecamp');
var Comment = require('../models/comment');
var middleware = require('../middleware');



// New Comment Form
router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('./comment/new', {id: req.params.id});
});




// Post new comment 
router.post('/', middleware.isLoggedIn, function(req, res){
    var id = req.params.id;
    var comment = req.body.comment;
    
    Place.findById(id, function(err, place){
        if (err || !place){
            req.flash('error', 'Sorry Didnt found this place in the database');
            res.redirect('/placecamp/page/0');
        } else {
            Comment.create(comment, function(err, comment){
                if(err || !comment){
                    req.flash('error', 'Sorry Didnt found this comment in the database');
                    res.redirect('/placecamp/page/0');
                } else {
                    // add comment user based on the commentSchema and save it 
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // push the comment inside the place and save it then redirect to placecamp
                    place.comment.push(comment);
                    place.save();
                    req.flash('success', 'Comment successfully created');
                    res.redirect('/placecamp/' + id);
                    
                }
            });
            
        }
    });
});






// Edit comment form
router.get('/:commentid/edit', middleware.isTheCommentAuthor, function(req, res){
    Comment.findById(req.params.commentid, function(err, comment){
        if(err || !comment){
            req.flash('error', 'Sorry Didnt found this comment in the database');
            res.redirect('/placecamp/page/0');
        } else {
            res.render('./comment/edit', {id: req.params.id, comment: comment });
        }
    });
});






//Edit comment Logic
router.put('/:commentid', middleware.isTheCommentAuthor, function(req, res){
    Comment.findByIdAndUpdate(req.params.commentid, req.body.comment, function(err, comment){
        if (err || !comment){
            req.flash('error', 'Sorry Didnt found this comment in the database');
            res.redirect('/placecamp/page/0');
        } else {
            req.flash('success', 'Comment successfully edited');
            res.redirect('/placecamp/' + req.params.id);
        }
        
    });
});





//Delete comment
router.delete('/:commentid', middleware.isTheCommentAuthor, function(req, res){
    Comment.findByIdAndRemove(req.params.commentid , function(err){
        if(err){
            req.flash('error', 'Sorry Didnt found this comment in the database');
            res.redirect('back');
        } else {
            req.flash('success', 'Comment successfully deleted');
            res.redirect('/placecamp');
        }
    });
});




module.exports = router;