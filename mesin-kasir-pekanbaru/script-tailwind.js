r // Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('hidden');
        navMenu.classList.toggle('flex');
        navMenu.classList.toggle('flex-col');
        navMenu.classList.toggle('absolute');
        navMenu.classList.toggle('top-16');
        navMenu.classList.toggle('left-0');
        navMenu.classList.toggle('w-full');
        navMenu.classList.toggle('bg-white');
        navMenu.classList.toggle('shadow-lg');
        navMenu.classList.toggle('p-5');
        navMenu.classList.toggle('space-y-4');
        
        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars[0].classList.toggle('rotate-45');
        bars[0].classList.toggle('translate-y-1.5');
        bars[1].classList.toggle('opacity-0');
        bars[2].classList.toggle('-rotate-45');
        bars[2].classList.toggle('-translate-y-1.5');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.add('hidden');
            navMenu.classList.remove('flex', 'flex-col', 'absolute', 'top-16', 'left-0', 'w-full', 'bg-white', 'shadow-lg', 'p-5', 'space-y-4');
            
            // Reset hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars[0].classList.remove('rotate-45', 'translate-y-1.5');
            bars[1].classList.remove('opacity-0');
            bars[2].classList.remove('-rotate-45', '-translate-y-1.5');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        if (scrollY >= (sectionTop - headerHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-primary', 'font-bold');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('text-primary', 'font-bold');
        }
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const business = document.getElementById('business').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !phone || !business || !message) {
                showNotification('Harap isi semua field yang diperlukan!', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Harap masukkan email yang valid!', 'error');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                showNotification('Harap masukkan nomor telepon yang valid!', 'error');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `Halo, saya tertarik dengan mesin kasir untuk bisnis saya di Pekanbaru.%0A%0A` +
                                  `Nama: ${name}%0A` +
                                  `Email: ${email}%0A` +
                                  `Telepon: ${phone}%0A` +
                                  `Jenis Bisnis: ${business}%0A` +
                                  `Pesan: ${message}`;
            
            // Open WhatsApp with pre-filled message
            const whatsappURL = `https://wa.me/6281234567890?text=${whatsappMessage}`;
            window.open(whatsappURL, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Show success notification
            showNotification('Pesan Anda telah dikirim melalui WhatsApp!', 'success');
        });
    }
});

// Notification System
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 z-50`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-3 text-xl"></i>
            <p>${message}</p>
        </div>
        <button class="absolute top-2 right-2 text-white hover:text-gray-200">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Close notification when close button is clicked
    const closeBtn = notification.querySelector('button');
    closeBtn.addEventListener('click', function() {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
    
    // Auto close notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-item, .product-item, .testimonial-item, .pricing-item, .faq-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');
            }
        });
    }, observerOptions);
    
    // Set initial styles and observe elements
    animatedElements.forEach(element => {
        element.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
        observer.observe(element);
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.classList.add('shadow-lg');
    } else {
        header.classList.remove('shadow-lg');
    }
});

// Add to cart functionality (for future use)
function addToCart(productId, productName, price) {
    // This function can be implemented when e-commerce functionality is added
    console.log(`Added to cart: ${productName} (ID: ${productId}, Price: ${price})`);
    showNotification(`${productName} telah ditambahkan ke keranjang!`, 'success');
}

// Initialize tooltips (for future use)
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute bg-gray-800 text-white text-sm px-3 py-2 rounded-md shadow-lg z-50 opacity-0 transform translate-y-2 transition-all duration-300';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
            
            setTimeout(() => {
                tooltip.classList.remove('opacity-0', 'translate-y-2');
                tooltip.classList.add('opacity-100', 'translate-y-0');
            }, 10);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.absolute.bg-gray-800');
            if (tooltip) {
                tooltip.classList.add('opacity-0', 'translate-y-2');
                tooltip.classList.remove('opacity-100', 'translate-y-0');
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        document.body.removeChild(tooltip);
                    }
                }, 300);
            }
        });
    });
}

// Call initializeTooltips on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeTooltips);