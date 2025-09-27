// --- Preloader Logic ---
window.onload = function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Fade out the preloader
        preloader.style.opacity = '0';
        // Hide it after the transition
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // This should match the CSS transition duration
    }
};

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: true,     // Whether animation should happen only once - while scrolling down
});

// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a navigation link is clicked
const mobileLinks = document.querySelectorAll('#mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// --- Header Style on Scroll ---
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        // Add shadow and blur effect when scrolled down
        header.classList.add('shadow-lg');
    } else {
        // Remove effects when at the top
        header.classList.remove('shadow-lg');
    }
});

// --- Active Navigation Link Highlighting ---
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Check if the user has scrolled past the top of the section
        if (pageYOffset >= sectionTop - 70) { // 70px offset for header height
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- Scroll to Top Button ---
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
     // Show button if scrolled more than 100px
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "flex";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});
scrollToTopBtn.addEventListener('click', function() {
    // Smooth scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Dark/Light Mode Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Function to set the theme
const setTheme = (isDark) => {
    if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
};

// Check for saved theme in localStorage or system preference on initial load
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    setTheme(true);
} else {
    setTheme(false);
}

// Add click listener for the theme toggle button
themeToggle.addEventListener('click', () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    setTheme(!isCurrentlyDark);
});

// --- Typing Effect on Home Section ---
var typed = new Typed('#typing-effect', {
    strings: ['Aspiring Web Developer', 'Creative Problem Solver', 'Passionate Learner'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});

// --- Scroll Progress Bar ---
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// --- 3D Animated Background ---
try {
    const canvas = document.getElementById('bg-canvas');
    let scene, camera, renderer, stars;

    function init3DBackground() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 1;
        camera.rotation.x = Math.PI / 2;

        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const starGeo = new THREE.BufferGeometry();
        const starCount = 6000;
        const positions = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 600;
        }

        starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        let starMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.7
        });

        stars = new THREE.Points(starGeo, starMaterial);
        scene.add(stars);

        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('mousemove', onMouseMove, false);

        animate();
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onMouseMove(event) {
        const mouseX = event.clientX - window.innerWidth / 2;
        const mouseY = event.clientY - window.innerHeight / 2;
        if (stars) {
            stars.rotation.y = mouseX * 0.00005;
            stars.rotation.x = mouseY * 0.00005;
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        if (stars) {
            stars.rotation.z += 0.0003;
        }
        renderer.render(scene, camera);
    }

    init3DBackground();
} catch (e) {
    console.error("3D background initialization failed:", e);
    // Fallback for browsers that might not support WebGL
    document.body.style.background = "#111827";
}
