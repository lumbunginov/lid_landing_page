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

    // Add click event listeners to workflow nodes
    const workflowNodes = document.querySelectorAll('.workflow-node');
    workflowNodes.forEach(node => {
        node.addEventListener('click', function() {
            const nodeId = this.id;
            let nodeType = '';
            
            switch(nodeId) {
                case 'workflow-input':
                    nodeType = 'Input';
                    break;
                case 'workflow-agent':
                    nodeType = 'AI Agent';
                    break;
                case 'workflow-model':
                    nodeType = 'AI Model';
                    break;
                case 'workflow-tools':
                    nodeType = 'AI Tools';
                    break;
                case 'workflow-output':
                    nodeType = 'Output';
                    break;
                default:
                    nodeType = 'Unknown Node';
            }
            
            // You can customize this alert or replace with modal/tooltip
            alert(`Clicked on: ${nodeType}\n\nThis node represents the ${nodeType.toLowerCase()} stage of our AI workflow.`);
        });
        
        // Add ripple effect on click
        node.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('div');
            const size = 50;
            
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(80, 201, 242, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-effect 0.6s linear';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Remove the pulsing effect since we want individual hover effects
    // const workflowImage = workflowContainer.querySelector('img');
    // if (workflowImage) {
    //     workflowImage.addEventListener('mouseover', function() {
    //         this.style.filter = 'drop-shadow(0 0 10px var(--neon-blue))';
    //     });
        
    //     workflowImage.addEventListener('mouseout', function() {
    //         this.style.filter = '';
    //     });
    // }
}

// Hero text glitch animation
function animateHeroText() {
    const heroText = document.getElementById('hero-text');
    if (!heroText) return;

    const firstText = "Solving Your Problems";
    const secondText = "Faster and More Efficiently";
    let isAnimating = false;

    // Clear initial text
    heroText.textContent = '';
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

    // Function to simulate slow typing effect with visible caret at the end
    function typeText(text, callback) {
        let i = 0;
        heroText.textContent = '';
        heroText.classList.add('terminal-text');
        
        function type() {
            if (i < text.length) {
                // Pastikan teks diupdate dengan cara yang mempertahankan posisi caret
                heroText.textContent = text.substring(0, i+1);
                i++;
                setTimeout(type, 100); // Slower typing speed (100ms instead of 50ms)
            } else if (callback) {
                callback();
            }
        }
        
        type();
    }

    // Function to perform glitch animation and switch to second text
    function glitchToSecondText() {
        if (isAnimating) return;
        isAnimating = true;

        // Remove terminal effect and add glitch effect
        heroText.classList.remove('terminal-text');
        heroText.classList.add('glitch-text');
        heroText.setAttribute('data-text', firstText);

        // Glitch text rapidly a few times before changing
        let glitchCount = 0;
        const maxGlitches = 5;
        const glitchInterval = setInterval(() => {
            if (glitchCount < maxGlitches) {
                heroText.textContent = getRandomGlitchText(firstText);
                glitchCount++;
            } else {
                clearInterval(glitchInterval);
                
                // Change to second text
                heroText.textContent = secondText;
                heroText.setAttribute('data-text', secondText);
                
                // Continue glitching for a short time after text change
                setTimeout(() => {
                    // Remove glitch effect but keep text
                    heroText.classList.remove('glitch-text');
                    heroText.classList.add('terminal-text');
                    
                    // Wait 3 seconds before starting cycle again
                    setTimeout(() => {
                        isAnimating = false;
                        // Start cycle again with typing first text
                        startCycle();
                    }, 3000); // Wait 3 seconds with second text visible
                }, 600); // Duration of final glitch after text change
            }
        }, 100); // Interval between glitches
    }

    // Function to start the animation cycle
    function startCycle() {
        // Type the first text slowly
        typeText(firstText, () => {
            // Wait 3 seconds after typing completes before glitching
            setTimeout(() => {
                glitchToSecondText();
            }, 3000); // Wait 3 seconds with first text visible
        });
    }

    // Start the animation cycle after a short delay
    setTimeout(startCycle, 1000);
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