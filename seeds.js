var mongoose = require('mongoose');
var Place = require('./models/placecamp');
var Comment = require('./models/comment');

var data = [
         { 
            name:'Château de Gruyêre',
            country: 'Switzerland',
            city: 'Gruyère',
            image: 'http://www.swissromande.ch/images/stories/gruyere2x11.jpg',
            description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker."
        },
            
        { 
            name:'Gornergratt',
            country: 'Switzerland',
            city: 'Zermatt',
            image: 'https://db-service.toubiz.de/var/plain_site/storage/images/orte/zermatt/gornergrat/gornergrat/1151395-1-ger-DE/gornergrat_front_large.jpg',
            description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker."
        },
        { 
            name:'Cervin',
            country: 'Switzerland',
            city: 'Zermatt',
            image: 'http://www.randos.info/suisse/valais/gornergrat/img/gornergrat-riffelsee-zermatt_05.jpg',
            description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker."
        },
        { 
            name:'Château de Chillon',
            country: 'Switzerland',
            city: 'Montreux',
            image: 'http://medieval.mrugala.net/Architecture/Suisse,_Montreux,_Chateau_de_Chillon/Suisse,%20Montreux,%20Chateau%20de%20Chillon%20(7).jpg',
            description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker."
        },
        { 
            name:'Glacier 3000',
            country: 'Switzerland',
            city: 'Gstaad',
            image: 'https://lifeandtimesofalifestylejunkie.files.wordpress.com/2015/07/img_2804.jpg',
            description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker."
            
        }
];


function seedDB(){
    // Remove all the place in the db
    Place.remove({}, function(err){
        if (err){
            console.log(err);
        } else {
            console.log('all place removed from the database');
        }
    });
    
/*    // Remove all the comment in the db
    Comment.remove({}, function(err){
        if (err){
            console.log(err);
        } else {
            console.log('all comment removed from the database');
        }
    });*/
    
    // Create new Place
    data.forEach(function(item){
        Place.create(item, function(err, placeRes){
            if (err){
                console.log(err);
            } else {
                console.log('New places created');
                // Create New comment
                Comment.create({
                    author: 'Rundev97',
                    content: 'This is a comment posted today'
                    }, function(err, commentRes){
                        if (err){
                            console.log(err);
                        } else {
                            // Associate the comment with the Place
                            placeRes.comment.push(commentRes);
                            placeRes.save();
                            console.log('new comment added');
                        }
                })
            }
        });
        
    });
    
}


module.exports = seedDB;