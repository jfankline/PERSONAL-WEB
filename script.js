// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const typedText = document.getElementById('typed-text');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const currentYear = document.getElementById('currentYear');
const consoleElement = document.getElementById('console');
const consoleClose = document.getElementById('consoleClose');
const consoleInput = document.getElementById('consoleInput');
const consoleOutput = document.getElementById('consoleOutput');
const emailLink = document.getElementById('emailLink');

// Typing Animation
const texts = [
    "Aspiring Web Developer",
    "Full-Stack Enthusiast",
    "Problem Solver",
    "Tech Learner",
    "UI/UX Explorer"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeWriter, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeWriter, 500);
    } else {
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, speed);
    }
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Animate Skill Bars on Scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        const skillLevel = bar.querySelector('.skill-level');
        skillLevel.style.setProperty('--target-width', `${level}%`);
        
        // Trigger animation
        setTimeout(() => {
            skillLevel.style.width = `${level}%`;
        }, 100);
    });
}

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Copy Email Function
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', async function() {
        const text = this.getAttribute('data-clipboard-text');
        
        try {
            await navigator.clipboard.writeText(text);
            
            // Show success
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            this.style.background = '#4CAF50';
            this.style.borderColor = '#4CAF50';
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
                this.style.borderColor = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    });
});

// Contact Form Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    // Simulate form submission
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    
    setTimeout(() => {
        // Show success message
        formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        submitBtn.disabled = false;
        btnText.textContent = originalText;
        
        // Hide status after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }, 1500);
});

// Current Year
currentYear.textContent = new Date().getFullYear();

// Cursor Trail
const cursorTrail = document.querySelector('.cursor-trail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursorTrail() {
    // Calculate new position with smoothing
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    
    // Update cursor trail position
    cursorTrail.style.left = `${trailX}px`;
    cursorTrail.style.top = `${trailY}px`;
    
    requestAnimationFrame(updateCursorTrail);
}

updateCursorTrail();

// Console Easter Egg
let consoleOpen = false;

// Open console with backtick key
document.addEventListener('keydown', (e) => {
    if (e.key === '`') {
        consoleOpen = !consoleOpen;
        consoleElement.style.display = consoleOpen ? 'block' : 'none';
        if (consoleOpen) {
            consoleInput.focus();
        }
    }
    
    // Close console with Escape
    if (e.key === 'Escape' && consoleOpen) {
        consoleOpen = false;
        consoleElement.style.display = 'none';
    }
    
    // Handle Enter in console
    if (e.key === 'Enter' && consoleOpen && document.activeElement === consoleInput) {
        handleConsoleCommand();
    }
});

consoleClose.addEventListener('click', () => {
    consoleOpen = false;
    consoleElement.style.display = 'none';
});

function handleConsoleCommand() {
    const command = consoleInput.value.toLowerCase().trim();
    consoleInput.value = '';
    
    let output = '';
    
    switch(command) {
        case 'help':
            output = `Available commands:<br>
            > help - Show this help<br>
            > clear - Clear console<br>
            > skills - Show my skills<br>
            > contact - Show contact info<br>
            > theme - Toggle theme<br>
            > secret - Easter egg`;
            break;
            
        case 'clear':
            consoleOutput.innerHTML = '';
            return;
            
        case 'skills':
            output = 'HTML: 100% | CSS: 100% | JavaScript: 80%<br>Python/Django: 60% | PHP: 80% | Java: 30%';
            break;
            
        case 'contact':
            output = 'Email: johnfranklineodongo@gmail.com<br>Phone: +254114602235<br>GitHub: github.com/jfankline';
            break;
            
        case 'theme':
            document.body.classList.toggle('light-theme');
            output = 'Theme toggled!';
            break;
            
        case 'secret':
            output = '🎉 You found the secret! Check out the animated background particles!';
            // Trigger particle explosion
            if (window.pJSDom && window.pJSDom[0]) {
                window.pJSDom[0].pJS.fn.vendors.destroypJS();
                initParticles(true);
            }
            break;
            
        default:
            output = `Command not found: "${command}"<br>Type "help" for available commands`;
    }
    
    consoleOutput.innerHTML += `<div>> ${command}</div><div>${output}</div><br>`;
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Make console draggable
let isDragging = false;
let dragOffset = {x: 0, y: 0};

const consoleHeader = consoleElement.querySelector('.console-header');

consoleHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = consoleElement.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;
    consoleElement.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;
    
    consoleElement.style.left = `${x}px`;
    consoleElement.style.top = `${y}px`;
    consoleElement.style.right = 'auto';
    consoleElement.style.bottom = 'auto';
    consoleElement.style.transform = 'none';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    consoleElement.style.cursor = '';
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(typeWriter, 1000);
    
    // Animate skill bars
    setTimeout(animateSkillBars, 2000);
    
    // Initialize particles (from particles-config.js)
    if (typeof initParticles === 'function') {
        initParticles();
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Update particle canvas size
    if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.canvas.size();
    }
});