// Main JavaScript for Lumbung Inovasi Digital Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    closeMenuButton.addEventListener('click', function() {
        mobileMenu.classList.remove('flex');
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = ''; // Re-enable scrolling
    });

    // Close mobile menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('flex');
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    });

    // Duplicate client logos for infinite marquee
    const clientMarquee = document.querySelector('.client-marquee-content');
    if (clientMarquee) {
        const clientLogos = clientMarquee.innerHTML;
        clientMarquee.innerHTML = clientLogos + clientLogos; // Duplicate for seamless loop
    }

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .portfolio-card, h2, .about-image-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate-fadeIn');
            }
        });
    };

    // Run animation check on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Interactive AI Workflow Animation
    createWorkflowAnimation();
});

// Function to create the interactive workflow animation
function createWorkflowAnimation() {
    // This is a placeholder for the actual workflow animation
    // In a real implementation, this would be replaced with a more complex
    // animation using SVG or Canvas to create an interactive AI workflow visualization
    
    const workflowContainer = document.querySelector('.workflow-animation');
    if (!workflowContainer) return;

    // Create a simple pulsing effect for now
    setInterval(() => {
        workflowContainer.classList.toggle('pulse');
    }, 2000);

    // Add hover effect to workflow elements
    const workflowImage = workflowContainer.querySelector('img');
    if (workflowImage) {
        workflowImage.addEventListener('mouseover', function() {
            this.style.filter = 'drop-shadow(0 0 10px var(--neon-blue))';
        });
        
        workflowImage.addEventListener('mouseout', function() {
            this.style.filter = '';
        });
    }
}

// Hero text glitch animation
function animateHeroText() {
    const heroText = document.getElementById('hero-text');
    if (!heroText) return;

    const firstText = "Solve Your Problem";
    const secondText = "More Efficiently";
    let currentText = firstText;
    let isGlitching = false;

    // Initial text with terminal effect
    heroText.textContent = firstText;
    heroText.classList.add('terminal-text');

    // Function to create random glitch characters
    function getRandomGlitchText(text) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?';
        let result = '';
        for (let i = 0; i < text.length; i++) {
            // 70% chance to keep original character, 30% chance for random character
            if (Math.random() > 0.3) {
                result += text[i];
            } else {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
        }
        return result;
    }

    // Function to simulate typing effect
    function typeText(text, callback) {
        let i = 0;
        heroText.textContent = '';
        heroText.classList.add('terminal-text');
        
        function type() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50); // Typing speed
            } else if (callback) {
                callback();
            }
        }
        
        type();
    }

    // Start animation after 2 seconds
    setTimeout(() => {
        // Function to toggle between texts with glitch effect
        function toggleText() {
            if (isGlitching) return;
            isGlitching = true;

            // Remove terminal effect and add glitch effect
            heroText.classList.remove('terminal-text');
            heroText.classList.add('glitch-text');
            heroText.setAttribute('data-text', currentText);

            // Glitch text rapidly a few times before changing
            let glitchCount = 0;
            const maxGlitches = 5;
            const glitchInterval = setInterval(() => {
                if (glitchCount < maxGlitches) {
                    heroText.textContent = getRandomGlitchText(currentText);
                    glitchCount++;
                } else {
                    clearInterval(glitchInterval);
                    
                    // Change to the other text
                    currentText = currentText === firstText ? secondText : firstText;
                    heroText.textContent = currentText;
                    heroText.setAttribute('data-text', currentText);
                    
                    // Continue glitching for a short time after text change
                    setTimeout(() => {
                        // Remove glitch effect
                        heroText.classList.remove('glitch-text');
                        
                        // Type the new text with terminal effect
                        typeText(currentText, () => {
                            isGlitching = false;
                            
                            // Schedule next toggle after longer delay
                            setTimeout(toggleText, 5000);
                        });
                    }, 600); // Duration of final glitch after text change
                }
            }, 100); // Interval between glitches
        }

        // Start the toggle cycle
        toggleText();
    }, 2000); // Initial delay
}

// Add scroll reveal animations
window.addEventListener('load', function() {
    // Initialize hero text animation
    animateHeroText();
    
    // Animate hero section elements
    const heroElements = document.querySelectorAll('#hero p, #hero .btn');
    let delay = 0;
    
    heroElements.forEach(element => {
        setTimeout(() => {
            element.classList.add('animate-fadeIn');
        }, delay);
        delay += 200; // Stagger the animations
    });

    // Add parallax effect to background elements
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax for grid background
        const gridAnimation = document.querySelector('.grid-animation');
        if (gridAnimation) {
            gridAnimation.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        }
        
        // Parallax for neural network background
        const neuralNetwork = document.querySelector('.neural-network-bg');
        if (neuralNetwork) {
            neuralNetwork.style.transform = `translateY(${scrollPosition * 0.03}px)`;
        }
    });
});

// Form validation
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Here you would normally send the form data to a server
        // For demo purposes, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}