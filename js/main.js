/**
 * Forever Fit Gym Website - Main JavaScript
 * Green Theme with Matrix Effects
 */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Trigger about section animation if it's the about link
                if (this.getAttribute('href') === '#about') {
                    setTimeout(() => {
                        // Reset flag and trigger animation
                        window.aboutHasAnimated = false;
                        animateAboutSection();
                    }, 700);
                }
            }
        });
    });
    
    // About Section Animation Function - Using CSS animations
    function animateAboutSection() {
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;
        
        const sectionTitle = aboutSection.querySelector('.section-title');
        const aboutText = aboutSection.querySelector('.about-text');
        const aboutFeatures = aboutSection.querySelector('.about-features');
        
        // Remove animate class first to reset
        aboutSection.classList.remove('animate');
        if (sectionTitle) sectionTitle.classList.remove('animate');
        if (aboutText) aboutText.classList.remove('animate');
        if (aboutFeatures) aboutFeatures.classList.remove('animate');
        
        // Force reflow to reset animations
        void aboutSection.offsetHeight;
        
        // Add animate class to trigger CSS animations (including background image)
        setTimeout(() => {
            aboutSection.classList.add('animate');
            if (sectionTitle) sectionTitle.classList.add('animate');
            if (aboutText) aboutText.classList.add('animate');
            if (aboutFeatures) aboutFeatures.classList.add('animate');
        }, 100);
    }
    
    // Check if about section is in viewport and animate on scroll
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        window.aboutHasAnimated = false;
        
        // Function to trigger animation
        const triggerAnimation = () => {
            if (!window.aboutHasAnimated) {
                window.aboutHasAnimated = true;
                animateAboutSection();
            }
        };
        
        // Intersection Observer for scroll trigger
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !window.aboutHasAnimated) {
                    triggerAnimation();
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(aboutSection);
        
        // Check if section is already visible on page load
        setTimeout(() => {
            const rect = aboutSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible && !window.aboutHasAnimated) {
                triggerAnimation();
            }
        }, 1000);
    }

    // CTA Button Action
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (name && email && message) {
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(57, 255, 20, 0.5)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(57, 255, 20, 0.3)';
        }
        
        lastScroll = currentScroll;
    });

    // Gallery image lazy loading enhancement
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    observer.unobserve(img);
                }
            });
        });

        galleryItems.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            imageObserver.observe(img);
        });
    }

    // Matrix warp effect enhancement on scroll
    // Hero Section Background Animation
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.heroHasAnimated = false;
        
        const triggerHeroAnimation = () => {
            if (!window.heroHasAnimated) {
                window.heroHasAnimated = true;
                heroSection.classList.remove('animate');
                void heroSection.offsetHeight;
                setTimeout(() => {
                    heroSection.classList.add('animate');
                }, 100);
            }
        };
        
        // Animate on page load
        setTimeout(() => {
            triggerHeroAnimation();
        }, 500);
    }
    
    // Personal Trainers Section Background Animation
    const trainersSection = document.querySelector('.trainers-section');
    if (trainersSection) {
        window.trainersHasAnimated = false;
        
        const triggerTrainersAnimation = () => {
            if (!window.trainersHasAnimated) {
                window.trainersHasAnimated = true;
                trainersSection.classList.remove('animate');
                void trainersSection.offsetHeight;
                setTimeout(() => {
                    trainersSection.classList.add('animate');
                }, 100);
            }
        };
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !window.trainersHasAnimated) {
                        triggerTrainersAnimation();
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(trainersSection);
        }
        
        setTimeout(() => {
            const rect = trainersSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible && !window.trainersHasAnimated) {
                triggerTrainersAnimation();
            }
        }, 1000);
    }
    
    // Gallery Section Background Animation
    const mediaSection = document.querySelector('.media-section');
    if (mediaSection) {
        window.mediaHasAnimated = false;
        
        const triggerMediaAnimation = () => {
            if (!window.mediaHasAnimated) {
                window.mediaHasAnimated = true;
                mediaSection.classList.remove('animate');
                void mediaSection.offsetHeight;
                setTimeout(() => {
                    mediaSection.classList.add('animate');
                }, 100);
            }
        };
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !window.mediaHasAnimated) {
                        triggerMediaAnimation();
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(mediaSection);
        }
        
        setTimeout(() => {
            const rect = mediaSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible && !window.mediaHasAnimated) {
                triggerMediaAnimation();
            }
        }, 1000);
    }
    
    // Events Section Background Animation
    const eventsSection = document.querySelector('.events-section');
    if (eventsSection) {
        window.eventsHasAnimated = false;
        
        const triggerEventsAnimation = () => {
            if (!window.eventsHasAnimated) {
                window.eventsHasAnimated = true;
                eventsSection.classList.remove('animate');
                void eventsSection.offsetHeight;
                setTimeout(() => {
                    eventsSection.classList.add('animate');
                }, 100);
            }
        };
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !window.eventsHasAnimated) {
                        triggerEventsAnimation();
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(eventsSection);
        }
        
        setTimeout(() => {
            const rect = eventsSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible && !window.eventsHasAnimated) {
                triggerEventsAnimation();
            }
        }, 1000);
    }
    
    const heroSectionOld = document.querySelector('.hero-section');
    const matrixOverlay = document.querySelector('.matrix-overlay');
    
    if (heroSection && matrixOverlay) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            
            if (scrolled < heroHeight) {
                const opacity = 1 - (scrolled / heroHeight) * 0.5;
                matrixOverlay.style.opacity = opacity;
            }
        });
    }

    // Add glow effect to elements on hover
    const glowElements = document.querySelectorAll('.feature-card, .gallery-item, .contact-item');
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Hero GIF Background - GIFs auto-play and loop automatically, no JavaScript needed

    // Kids MMA Section - Background image slide animation
    const kidsMmaSection = document.querySelector('.kids-mma-section');
    if (kidsMmaSection) {
        window.kidsMmaHasAnimated = false;
        
        const triggerKidsMmaAnimation = () => {
            if (!window.kidsMmaHasAnimated) {
                window.kidsMmaHasAnimated = true;
                kidsMmaSection.classList.remove('animate');
                void kidsMmaSection.offsetHeight;
                setTimeout(() => {
                    kidsMmaSection.classList.add('animate');
                }, 100);
            }
        };
        
        // Intersection Observer for scroll trigger
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !window.kidsMmaHasAnimated) {
                        triggerKidsMmaAnimation();
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(kidsMmaSection);
        }
        
        // Check if section is already visible on page load
        setTimeout(() => {
            const rect = kidsMmaSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible && !window.kidsMmaHasAnimated) {
                triggerKidsMmaAnimation();
            }
        }, 1000);
    }

    // Trainers Carousel Functionality
    const trainersCarousel = document.querySelector('.trainers-carousel');
    const trainersTrack = document.querySelector('.trainers-track');
    const trainerCards = document.querySelectorAll('.trainer-card');
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');
    
    if (trainersCarousel && trainersTrack && trainerCards.length > 0) {
        let currentIndex = 0;
        let isScrolling = false;
        const cardWidth = trainerCards[0].offsetWidth + 48; // card width + gap (3rem = 48px)
        const totalCards = trainerCards.length;
        const visibleCards = Math.floor(trainersCarousel.offsetWidth / cardWidth);
        
        // Infinite scroll - duplicate cards for seamless loop
        const firstCardClone = trainerCards[0].cloneNode(true);
        const lastCardClone = trainerCards[totalCards - 1].cloneNode(true);
        trainersTrack.appendChild(firstCardClone);
        trainersTrack.insertBefore(lastCardClone, trainerCards[0]);
        
        function updateCarousel() {
            if (isScrolling) return;
            isScrolling = true;
            
            trainersTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            trainersTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            setTimeout(() => {
                isScrolling = false;
                
                // Reset to beginning/end for infinite scroll
                if (currentIndex >= totalCards) {
                    trainersTrack.style.transition = 'none';
                    currentIndex = 0;
                    trainersTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
                } else if (currentIndex < 0) {
                    trainersTrack.style.transition = 'none';
                    currentIndex = totalCards - 1;
                    trainersTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
                }
            }, 600);
        }
        
        // Auto-scroll carousel
        let autoScrollInterval = setInterval(() => {
            currentIndex++;
            updateCarousel();
        }, 3000); // Scroll every 3 seconds
        
        // Pause auto-scroll on hover
        trainersCarousel.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        
        trainersCarousel.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(() => {
                currentIndex++;
                updateCarousel();
            }, 3000);
        });
        
        // Arrow navigation
        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                currentIndex--;
                updateCarousel();
                clearInterval(autoScrollInterval);
                autoScrollInterval = setInterval(() => {
                    currentIndex++;
                    updateCarousel();
                }, 3000);
            });
        }
        
        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                currentIndex++;
                updateCarousel();
                clearInterval(autoScrollInterval);
                autoScrollInterval = setInterval(() => {
                    currentIndex++;
                    updateCarousel();
                }, 3000);
            });
        }
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        trainersCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        trainersCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - next
                currentIndex++;
                updateCarousel();
            }
            if (touchEndX > touchStartX + 50) {
                // Swipe right - previous
                currentIndex--;
                updateCarousel();
            }
        }
    }

    // Kids MMA Section GIF Background - GIFs auto-play and loop automatically

    // Simple MMA Section GIF Background - GIFs auto-play and loop automatically

    // AI Features Dropdown Functionality
    const aiFeatureBtns = document.querySelectorAll('.ai-feature-btn');
    aiFeatureBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const featureId = this.getAttribute('data-feature');
            const content = document.getElementById(featureId);
            
            // Close all other dropdowns
            aiFeatureBtns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.classList.remove('active');
                    const otherId = otherBtn.getAttribute('data-feature');
                    const otherContent = document.getElementById(otherId);
                    if (otherContent) {
                        otherContent.classList.remove('active');
                    }
                }
            });
            
            // Toggle current dropdown
            this.classList.toggle('active');
            if (content) {
                content.classList.toggle('active');
            }
        });
    });

    // Performance: Preload critical images
    const splashImage = new Image();
    splashImage.src = 'assets/splashenhanced.jpeg';
    
    // Events Carousel Navigation
    const eventsFeed = document.querySelector('.events-feed');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    
    if (eventsFeed && carouselPrev && carouselNext) {
        const scrollAmount = 240;
        
        carouselPrev.addEventListener('click', () => {
            eventsFeed.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        carouselNext.addEventListener('click', () => {
            eventsFeed.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        
        // Hide/show buttons based on scroll position
        const updateCarouselButtons = () => {
            const isAtStart = eventsFeed.scrollLeft <= 0;
            const isAtEnd = eventsFeed.scrollLeft >= eventsFeed.scrollWidth - eventsFeed.clientWidth - 10;
            
            carouselPrev.style.opacity = isAtStart ? '0.3' : '1';
            carouselPrev.style.pointerEvents = isAtStart ? 'none' : 'auto';
            carouselNext.style.opacity = isAtEnd ? '0.3' : '1';
            carouselNext.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        };
        
        eventsFeed.addEventListener('scroll', updateCarouselButtons);
        updateCarouselButtons();
    }
    
    // Events Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    if (filterButtons.length > 0 && eventCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter event cards
                eventCards.forEach(card => {
                    if (filter === 'all') {
                        card.classList.remove('hidden');
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        const category = card.getAttribute('data-category');
                        if (category === filter) {
                            card.classList.remove('hidden');
                            card.style.display = 'flex';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.9)';
                            setTimeout(() => {
                                card.classList.add('hidden');
                                card.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
    
    // Expanding Card Gallery Interaction
    const expandingCards = document.querySelectorAll('.expanding-card');
    if (expandingCards.length > 0) {
        expandingCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                // Remove hover class from all cards
                expandingCards.forEach(c => c.classList.remove('active'));
                // Add active class to hovered card
                this.classList.add('active');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        });
    }
    
    // Website loaded successfully
});

// Handle window resize
window.addEventListener('resize', function() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }
});
