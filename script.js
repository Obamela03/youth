// Smooth scroll to about section (hero button)
function scrollToSection() {
    document.getElementById("about").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Play trailer alert (demo function)
function playTrailer() {
    alert("🔥 Watch the official conference trailer: Coming soon! Stay tuned for a powerful preview.");
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