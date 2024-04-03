document.getElementById('hamburger').addEventListener('click', function() {
    var navList = document.getElementById('nav-list');
    navList.classList.toggle('active');
});

$(document).ready(function(){
    $('.carousel').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1
    });
});

