// Hamburger
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        // Toggle active classes
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Make sure nav list is visible when menu is active
        if (nav.classList.contains('active')) {
            nav.style.left = '0';
            navList.style.display = 'flex';
        } else {
            nav.style.left = '-100%';
        }
    });
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
            nav.style.left = '-100%';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !hamburger.contains(event.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
            nav.style.left = '-100%';
        }
    });
});

// Slick carousel initialization
$(document).ready(function () {
    $('.carousel').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1
    });
});

// Manual photo carousel
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.gallery .photo');
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Transcript zoom and drag logic
let scale = 1;

function openTranscript() {
    const modal = document.getElementById("transcriptModal");
    modal.classList.add("show");
    scale = 1;
    updateTransform();
}

function closeTranscript() {
    document.getElementById("transcriptModal").classList.remove("show");
}

function zoomIn() {
    scale += 0.1;
    updateTransform();
}

function zoomOut() {
    scale = Math.max(0.1, scale - 0.1);
    updateTransform();
}

function updateTransform() {
    const img = document.getElementById("transcriptImage");
    img.style.transform = `scale(${scale})`;
}

// Drag-to-scroll logic for transcript
const wrapper = document.getElementById('transcriptWrapper');
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;

wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    wrapper.style.cursor = 'grabbing';
    startX = e.pageX - wrapper.offsetLeft;
    startY = e.pageY - wrapper.offsetTop;
    scrollLeft = wrapper.scrollLeft;
    scrollTop = wrapper.scrollTop;
});

wrapper.addEventListener('mouseup', () => {
    isDragging = false;
    wrapper.style.cursor = 'grab';
});

wrapper.addEventListener('mouseleave', () => {
    isDragging = false;
    wrapper.style.cursor = 'grab';
});

wrapper.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const y = e.pageY - wrapper.offsetTop;
    const walkX = x - startX;
    const walkY = y - startY;
    wrapper.scrollLeft = scrollLeft - walkX;
    wrapper.scrollTop = scrollTop - walkY;
});

// Combined DOMContentLoaded logic
document.addEventListener("DOMContentLoaded", function () {
    // Initialize gallery slide
    showSlide(currentSlide);

    // Intersection Observer for section highlighting
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".aside-link");
    
    // Handle manual clicks on aside links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Improved Intersection Observer with lower threshold and options
    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -20% 0px", // Adjusted margin to better detect sections
        threshold: 0.1 // Lower threshold for easier detection
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");
            const link = document.querySelector(`.aside-link[href="#${id}"]`);
            
            if (entry.isIntersecting) {
                // Only update active class when section is in view
                navLinks.forEach(l => l.classList.remove("active"));
                if (link) link.classList.add("active");
                
                // Debug output to check which section is being detected
                console.log(`Section #${id} is in view`);
            }
        });
    }, observerOptions);

    // Observe all sections including projects
    sections.forEach((section) => {
        observer.observe(section);
        console.log(`Now observing section: ${section.id}`);
    });

    // Special handling for projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectsSection.addEventListener('click', function() {
            const projectsLink = document.querySelector('.aside-link[href="#projects"]');
            if (projectsLink) {
                navLinks.forEach(l => l.classList.remove("active"));
                projectsLink.classList.add("active");
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all philosophy points
    const points = document.querySelectorAll('.philosophy-point');
    
    // Add click event to each point
    points.forEach(point => {
        point.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
            
            // Get all other points
            const otherPoints = Array.from(points).filter(p => p !== this);
            
            // Toggle visibility of other points
            otherPoints.forEach(p => {
                if (this.classList.contains('active')) {
                    p.style.opacity = '0.5';
                } else {
                    p.style.opacity = '1';
                }
            });
        });
    });
});
