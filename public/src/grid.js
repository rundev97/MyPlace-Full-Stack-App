
var list = document.querySelector('#list');
var grid = document.querySelector('#grid');

if(grid && list){
    
    grid.style.background = '#999';
    grid.style.color = 'white'; 
    list.style.background = '#ddd';
    list.style.color = '#666';
    
        
    // List button Logic
    list.addEventListener('click', function(){
        var items = document.querySelectorAll('.col-xl-4, .col-lg-4, .col-md-4, .col-sm-12 .text-center');
            for (var i = 0; i < items.length; i++) {
                items[i].classList.remove('col-xl-4', 'col-lg-4', 'col-md-4', 'col-sm-12', 'text-center' );
                items[i].classList.add('col-md-12', 'list');
                grid.style.background = '#ddd';
                grid.style.color = '#666';
                list.style.background = '#999';
                list.style.color = 'white';
                
            }
    });
    
    
    // Grid Button logic
    grid.addEventListener('click', function(){
        var items = document.querySelectorAll('.col-md-12');
            for (var i = 0; i < items.length; i++) {
                items[i].classList.remove('col-md-12', 'list' );
                items[i].classList.add('col-xl-4', 'col-lg-4', 'col-md-4', 'col-sm-12', 'text-center' );
                grid.style.background = '#999';
                grid.style.color = 'white';
                list.style.background = '#ddd';
                list.style.color = '#666';
            }
        
    });
}


