// Smooth scroll to about section (hero button)
function scrollToSection() {
    document.getElementById("about").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Play trailer function (opens modal with sound)
// Alternative: Play muted first, let user unmute manually
function playTrailer() {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("trailerVideo");
    
    if (modal && video) {
        modal.style.display = "flex";
        video.currentTime = 0;
        video.muted = true; // Start muted to ensure autoplay works
        video.play().then(() => {
            // User can click the speaker icon on the video to unmute
            console.log("Video playing muted - click speaker icon for sound");
        }).catch(e => console.log("Play error:", e));
    }
}

// Close trailer function
function closeTrailer() {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("trailerVideo");
    
    if (modal) {
        modal.style.display = "none";
    }
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
}

// RSVP BUTTONS: open google form placeholder
document.getElementById("registerBtn")?.addEventListener("click", () => {
    window.open("https://forms.gle/your-conference-registration-form", "_blank");
});

document.getElementById("ctaRegister")?.addEventListener("click", () => {
    window.open("https://forms.gle/your-conference-registration-form", "_blank");
});

// COUNTDOWN TIMER (June 19, 2026)
const countdownEl = document.getElementById("countdown");
const eventDate = new Date("June 19, 2026 09:00:00").getTime();

if (countdownEl) {
    function updateCountdown() {
        const now = new Date().getTime();
        const diff = eventDate - now;

        if (diff <= 0) {
            countdownEl.innerHTML = "🔥 LIVE NOW! 🔥";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        countdownEl.innerHTML = `${days}d ${hours}h ${mins}m ${secs}s`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Optional: Add animation on scroll reveal (simple)
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.feature, .card, .about-text, .cta-section').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(25px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    observer.observe(el);
});

// Sticky nav shadow on scroll
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
    } else {
        nav.style.boxShadow = "none";
    }
});

// Small interactive hover effect on register nav link
const registerNav = document.querySelector('.cta');
if(registerNav) {
    registerNav.addEventListener('mouseenter', () => {
        registerNav.style.transform = "scale(1.02)";
    });
    registerNav.addEventListener('mouseleave', () => {
        registerNav.style.transform = "scale(1)";
    });
}

// ============================================
// BACKGROUND SLIDESHOW WITH SIDE SCROLL & ZOOM
// ============================================

// List your background images from the /images folder
const backgroundImages = [
    "images/bg1.jpg",
    "images/bg2.jpg",
    "images/bg3.jpg",
    "images/bg4.jpg"
    // Add as many as you want — they will cycle randomly
];

// Function to shuffle array (random order)
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Create random order of images but ensure no repeats before cycling
let shuffledImages = [...backgroundImages];
let bgCurrentIndex = 0;

function getNextImage() {
    if (bgCurrentIndex >= shuffledImages.length) {
        // Reshuffle when we've shown all images
        shuffledImages = shuffleArray([...backgroundImages]);
        bgCurrentIndex = 0;
    }
    const image = shuffledImages[bgCurrentIndex];
    bgCurrentIndex++;
    return image;
}

// Create slideshow container
const slideshowContainer = document.getElementById("heroSlideshow");
if (slideshowContainer) {
    // Pre-create 3 slide elements for smooth cycling
    let slides = [];
    let activeSlideIndex = 0;
    
    // Create 3 slide elements
    for (let i = 0; i < 3; i++) {
        const slide = document.createElement("div");
        slide.className = "hero-slide";
        slides.push(slide);
        slideshowContainer.appendChild(slide);
    }
    
    // Randomly decide effect for each slide (zoom OR scroll)
    function getRandomEffect() {
        const effects = ["zooming", "scrolling"];
        return effects[Math.floor(Math.random() * effects.length)];
    }
    
    // Load first image into first slide
    function loadSlide(slideElement, imageUrl, effectType) {
        slideElement.style.backgroundImage = `url('${imageUrl}')`;
        // Remove existing animation classes
        slideElement.classList.remove("zooming", "scrolling");
        // Force reflow
        void slideElement.offsetWidth;
        // Add new animation class
        slideElement.classList.add(effectType);
    }
    
    // Preload first batch of images
    let nextImages = [];
    for (let i = 0; i < 3; i++) {
        nextImages.push({
            url: getNextImage(),
            effect: getRandomEffect()
        });
    }
    
    // Initialize slides
    for (let i = 0; i < slides.length; i++) {
        loadSlide(slides[i], nextImages[i].url, nextImages[i].effect);
        if (i === 0) {
            slides[i].classList.add("active");
        }
    }
    
    // Prepare next image in queue
    let imageQueue = [...nextImages.slice(1)];
    
    // Cycle slides every 5 seconds
    setInterval(() => {
        // Get next image from queue or generate new
        let nextImage;
        if (imageQueue.length > 0) {
            nextImage = imageQueue.shift();
        } else {
            nextImage = {
                url: getNextImage(),
                effect: getRandomEffect()
            };
        }
        
        // Find the next slide to activate (the one after active)
        const currentActiveIndex = slides.findIndex(s => s.classList.contains("active"));
        const nextSlideIndex = (currentActiveIndex + 1) % slides.length;
        
        // Load new content into the next slide
        loadSlide(slides[nextSlideIndex], nextImage.url, nextImage.effect);
        
        // Activate the next slide
        slides[nextSlideIndex].classList.add("active");
        
        // After transition, deactivate previous slide
        setTimeout(() => {
            slides[currentActiveIndex].classList.remove("active");
        }, 1500);
        
        // Preload the next image for the queue (keep 1 ahead)
        if (imageQueue.length < 1) {
            imageQueue.push({
                url: getNextImage(),
                effect: getRandomEffect()
            });
        }
        
    }, 5000); // Change image every 5 seconds
}

// Function to preload images for smoother transitions
function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload all background images for smooth playback
preloadImages(backgroundImages);


// LIGHTBOX FUNCTIONALITY
const galleryImages = document.querySelectorAll(".thumb");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");

if (galleryImages.length && lightbox && lightboxImg && closeBtn) {
    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
}

// CAROUSEL GALLERY

const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumb");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let carouselIndex = 0;

// Convert thumbnails into array of image sources (filter out broken images if needed)
const imageSources = Array.from(thumbnails).map(img => img.src);

// UPDATE MAIN IMAGE
function updateGallery(index) {
    if (!mainImage || !thumbnails.length) return;
    
    mainImage.src = imageSources[index];

    thumbnails.forEach(thumb => {
        thumb.classList.remove("active");
    });

    if (thumbnails[index]) {
        thumbnails[index].classList.add("active");
    }
}

// THUMB CLICK
if (thumbnails.length) {
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            carouselIndex = index;
            updateGallery(carouselIndex);
        });
    });
}

// NEXT BUTTON
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        carouselIndex++;

        if (carouselIndex >= imageSources.length) {
            carouselIndex = 0;
        }

        updateGallery(carouselIndex);
    });
}

// PREVIOUS BUTTON
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        carouselIndex--;

        if (carouselIndex < 0) {
            carouselIndex = imageSources.length - 1;
        }

        updateGallery(carouselIndex);
    });
}

// AUTO SLIDE
setInterval(() => {
    carouselIndex++;

    if (carouselIndex >= imageSources.length) {
        carouselIndex = 0;
    }

    updateGallery(carouselIndex);

}, 5000);
