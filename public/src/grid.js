
var list = document.querySelector('#list');
var grid = document.querySelector('#grid');


list.addEventListener('click', function(){
    var items = document.querySelectorAll('.col-xl-4, .col-lg-4, .col-md-4, .col-sm-6 .text-center');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('col-xl-4', 'col-lg-4', 'col-md-4', 'col-sm-6', 'text-center' );
            items[i].classList.add('col-md-12', 'list');
            
        }
});

grid.addEventListener('click', function(){
    var items = document.querySelectorAll('.col-md-12');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('col-md-12', 'list' );
            items[i].classList.add('col-xl-4', 'col-lg-4', 'col-md-4', 'col-sm-6', 'text-center' );
        }
    
});