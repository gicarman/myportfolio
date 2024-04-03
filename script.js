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

let currentSlide = 0;
const slides = document.querySelectorAll('.photo');

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function changeSlide(n) {
    showSlide(currentSlide + n);
}
