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

// Updated Slick carousel initialization
$(document).ready(function () {
    $('.carousel').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: 'linear',
        arrows: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px'
                }
            }
        ]
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

// Certificate Viewer Modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('certModal');
    const certImage = document.getElementById('certImage');
    const closeBtn = document.getElementById('closeModal');
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const certContainer = document.getElementById('certContainer');
    const viewBtns = document.querySelectorAll('.view-cert-btn');
    
    // Current zoom level
    let scale = 1;
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;
    
    // Open modal when View Certificate button is clicked
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const certPath = this.closest('.resource-card').getAttribute('data-cert');
            certImage.src = certPath;
            certImage.style.transform = 'scale(1)';
            scale = 1;
            translateX = 0;
            translateY = 0;
            updateCertTransform();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal when X button is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
    
    // Zoom functionality
    zoomInBtn.addEventListener('click', function() {
        if (scale < 2) {
            scale += 0.1;
            updateCertTransform();
        }
    });
    
    zoomOutBtn.addEventListener('click', function() {
        if (scale > 0.5) {
            scale -= 0.1;
            updateCertTransform();
        }
    });
    
    // Update transform for zoom and pan
    function updateCertTransform() {
        certImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    }
    
    // Drag functionality
    certContainer.addEventListener('mousedown', startDrag);
    certContainer.addEventListener('touchstart', startDrag, { passive: false });
    
    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        
        if (e.type === 'mousedown') {
            startX = e.clientX;
            startY = e.clientY;
        } else if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        let currentX, currentY;
        if (e.type === 'mousemove') {
            currentX = e.clientX;
            currentY = e.clientY;
        } else if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        }
        
        const dx = (currentX - startX) / scale;
        const dy = (currentY - startY) / scale;
        
        translateX += dx;
        translateY += dy;
        
        updateCertTransform();
        
        startX = currentX;
        startY = currentY;
    }
    
    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
    }
    
    // Mouse wheel zoom
    certContainer.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        if (e.deltaY < 0 && scale < 2) {
            // Zoom in
            scale += 0.1;
        } else if (e.deltaY > 0 && scale > 0.5) {
            // Zoom out
            scale -= 0.1;
        }
        
        updateCertTransform();
    });
    
    // Handle keyboard events (ESC to close)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
});

// PDF VIEWER WITH ZOOM CONTROLS
let currentPdfUrl = '';
let currentZoom = 100;
let minZoom = 25;
let maxZoom = 300;

function openPDF(pdfUrl, title) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    const titleElement = document.getElementById('pdfTitle');
    const spinner = document.getElementById('loadingSpinner');
    
    currentPdfUrl = pdfUrl;
    titleElement.textContent = title;
    
    // Reset zoom
    currentZoom = 100;
    updateZoomDisplay();
    
    // Show modal and loading spinner
    modal.classList.add('active');
    spinner.style.display = 'block';
    viewer.style.display = 'none';
    
    // Load PDF with zoom parameter
    const pdfUrlWithZoom = `${pdfUrl}#zoom=${currentZoom}`;
    viewer.src = pdfUrlWithZoom;
    
    // Hide spinner when PDF loads
    viewer.onload = function() {
        spinner.style.display = 'none';
        viewer.style.display = 'block';
        updateZoomButtons();
    };
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closePDF() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    
    modal.classList.remove('active');
    viewer.src = '';
    currentZoom = 100;
    updateZoomDisplay();
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function zoomIn() {
    if (currentZoom < maxZoom) {
        currentZoom += 25;
        applyZoom();
    }
}

function zoomOut() {
    if (currentZoom > minZoom) {
        currentZoom -= 25;
        applyZoom();
    }
}

function resetZoom() {
    currentZoom = 100;
    applyZoom();
}

function fitToWidth() {
    // Set to a good mobile-friendly zoom level
    const isMobile = window.innerWidth <= 768;
    currentZoom = isMobile ? 75 : 85;
    applyZoom();
}

function applyZoom() {
    const viewer = document.getElementById('pdfViewer');
    if (viewer && currentPdfUrl) {
        const pdfUrlWithZoom = `${currentPdfUrl}#zoom=${currentZoom}`;
        viewer.src = pdfUrlWithZoom;
    }
    updateZoomDisplay();
    updateZoomButtons();
}

function updateZoomDisplay() {
    const zoomDisplay = document.getElementById('zoomDisplay');
    if (zoomDisplay) {
        zoomDisplay.textContent = `${currentZoom}%`;
    }
}

function updateZoomButtons() {
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    
    if (zoomInBtn) {
        zoomInBtn.disabled = currentZoom >= maxZoom;
    }
    if (zoomOutBtn) {
        zoomOutBtn.disabled = currentZoom <= minZoom;
    }
}

// Close modal when clicking outside
document.getElementById('pdfModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closePDF();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('pdfModal').classList.contains('active')) {
        closePDF();
    }
});

// Handle zoom with keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (document.getElementById('pdfModal').classList.contains('active')) {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === '=' || e.key === '+') {
                e.preventDefault();
                zoomIn();
            } else if (e.key === '-') {
                e.preventDefault();
                zoomOut();
            } else if (e.key === '0') {
                e.preventDefault();
                resetZoom();
            }
        }
    }
});

// Auto-fit on mobile when PDF loads
window.addEventListener('resize', function() {
    if (document.getElementById('pdfModal').classList.contains('active')) {
        const isMobile = window.innerWidth <= 768;
        if (isMobile && currentZoom > 100) {
            fitToWidth();
        }
    }
});

// Initialize fit-to-width for mobile on load
document.addEventListener('DOMContentLoaded', function() {
    // Auto-apply mobile-friendly zoom when opening PDFs on mobile
    const originalOpenPDF = openPDF;
    window.openPDF = function(pdfUrl, title) {
        originalOpenPDF.call(this, pdfUrl, title);
        // Small delay to ensure PDF loads before applying mobile zoom
        setTimeout(() => {
            if (window.innerWidth <= 768) {
                fitToWidth();
            }
        }, 500);
    };
});
