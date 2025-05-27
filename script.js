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

// MOBILE-COMPATIBLE PDF VIEWER WITH ZOOM CONTROLS
let currentPdfUrl = '';
let currentZoom = 100;
let minZoom = 25;
let maxZoom = 300;
let isMobile = false;
let pdfContainer = null;

// Detect mobile device
function detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
           || window.innerWidth <= 768;
}

function openPDF(pdfUrl, title) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    const titleElement = document.getElementById('pdfTitle');
    const spinner = document.getElementById('loadingSpinner');
    
    currentPdfUrl = pdfUrl;
    titleElement.textContent = title;
    isMobile = detectMobile();
    
    // Reset zoom
    currentZoom = isMobile ? 75 : 100;
    updateZoomDisplay();
    
    // Show modal and loading spinner
    modal.classList.add('active');
    spinner.style.display = 'block';
    viewer.style.display = 'none';
    
    // For mobile devices, use different approach
    if (isMobile) {
        setupMobilePDFViewer(pdfUrl, viewer, spinner);
    } else {
        setupDesktopPDFViewer(pdfUrl, viewer, spinner);
    }
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function setupDesktopPDFViewer(pdfUrl, viewer, spinner) {
    const pdfUrlWithZoom = `${pdfUrl}#zoom=${currentZoom}`;
    viewer.src = pdfUrlWithZoom;
    
    viewer.onload = function() {
        spinner.style.display = 'none';
        viewer.style.display = 'block';
        updateZoomButtons();
    };
}

function setupMobilePDFViewer(pdfUrl, viewer, spinner) {
    // For mobile, create a container with transform scaling
    pdfContainer = viewer.parentElement;
    
    // Set up the PDF without zoom parameter for better mobile compatibility
    viewer.src = pdfUrl;
    
    viewer.onload = function() {
        spinner.style.display = 'none';
        viewer.style.display = 'block';
        applyMobileZoom();
        updateZoomButtons();
    };
    
    // Add touch event listeners for better mobile interaction
    addTouchSupport();
}

function applyMobileZoom() {
    const viewer = document.getElementById('pdfViewer');
    if (viewer && isMobile) {
        const scale = currentZoom / 100;
        viewer.style.transform = `scale(${scale})`;
        viewer.style.transformOrigin = 'top left';
        
        // Adjust container to accommodate scaled content
        const container = viewer.parentElement;
        if (scale < 1) {
            container.style.overflow = 'hidden';
        } else {
            container.style.overflow = 'auto';
        }
    }
}

function closePDF() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    
    modal.classList.remove('active');
    viewer.src = '';
    viewer.style.transform = '';
    currentZoom = 100;
    updateZoomDisplay();
    
    // Clean up mobile-specific styles
    if (pdfContainer) {
        pdfContainer.style.overflow = 'auto';
        pdfContainer = null;
    }
    
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
    currentZoom = isMobile ? 75 : 100;
    applyZoom();
}

function fitToWidth() {
    // Different fit strategies for mobile vs desktop
    if (isMobile) {
        currentZoom = 60; // Better mobile fit
    } else {
        currentZoom = window.innerWidth <= 992 ? 75 : 85;
    }
    applyZoom();
}

function applyZoom() {
    const viewer = document.getElementById('pdfViewer');
    if (!viewer || !currentPdfUrl) return;
    
    if (isMobile) {
        // Use CSS transform for mobile
        applyMobileZoom();
    } else {
        // Use URL parameter for desktop
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

// Add touch support for mobile devices
function addTouchSupport() {
    const viewer = document.getElementById('pdfViewer');
    if (!viewer || !isMobile) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    let initialZoom = currentZoom;
    
    viewer.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            // Pinch zoom start
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch1.clientX - touch2.clientX,
                touch1.clientY - touch2.clientY
            );
            touchStartX = distance;
            initialZoom = currentZoom;
            e.preventDefault();
        }
    }, { passive: false });
    
    viewer.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2) {
            // Pinch zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch1.clientX - touch2.clientX,
                touch1.clientY - touch2.clientY
            );
            
            const scale = distance / touchStartX;
            let newZoom = Math.round(initialZoom * scale);
            newZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
            
            if (newZoom !== currentZoom) {
                currentZoom = newZoom;
                applyMobileZoom();
                updateZoomDisplay();
                updateZoomButtons();
            }
            e.preventDefault();
        }
    }, { passive: false });
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

// Handle zoom with keyboard shortcuts (desktop only)
document.addEventListener('keydown', function(e) {
    if (document.getElementById('pdfModal').classList.contains('active') && !isMobile) {
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

// Handle orientation change on mobile
window.addEventListener('orientationchange', function() {
    if (document.getElementById('pdfModal').classList.contains('active') && isMobile) {
        setTimeout(() => {
            isMobile = detectMobile();
            applyZoom();
        }, 500);
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    const wasModal = document.getElementById('pdfModal').classList.contains('active');
    const wasMobile = isMobile;
    isMobile = detectMobile();
    
    if (wasModal) {
        // If device type changed, reinitialize viewer
        if (wasMobile !== isMobile) {
            const viewer = document.getElementById('pdfViewer');
            const spinner = document.getElementById('loadingSpinner');
            
            if (isMobile) {
                setupMobilePDFViewer(currentPdfUrl, viewer, spinner);
            } else {
                viewer.style.transform = '';
                setupDesktopPDFViewer(currentPdfUrl, viewer, spinner);
            }
        } else if (isMobile) {
            applyZoom();
        }
    }
});

// Alternative PDF opening method for better mobile compatibility
function openPDFAlternative(pdfUrl, title) {
    if (detectMobile()) {
        // For mobile, try to open in new tab/window as fallback
        const confirmOpen = confirm(`Open ${title} in new tab?`);
        if (confirmOpen) {
            window.open(pdfUrl, '_blank');
        }
    } else {
        openPDF(pdfUrl, title);
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    isMobile = detectMobile();
    
    // Add mobile-specific CSS classes
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
    
    // Override the original openPDF calls for better mobile support
    const projectLinks = document.querySelectorAll('.project-link[onclick*="openPDF"]');
    projectLinks.forEach(link => {
        const originalOnclick = link.getAttribute('onclick');
        if (originalOnclick) {
            // Extract PDF URL and title from onclick
            const matches = originalOnclick.match(/openPDF\('([^']+)',\s*'([^']+)'\)/);
            if (matches) {
                const pdfUrl = matches[1];
                const pdfTitle = matches[2];
                
                // Remove original onclick and add new event listener
                link.removeAttribute('onclick');
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    openPDF(pdfUrl, pdfTitle);
                });
            }
        }
    });
});
