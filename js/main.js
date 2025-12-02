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
        if (sectionTitle) sectionTitle.classList.remove('animate');
        if (aboutText) aboutText.classList.remove('animate');
        if (aboutFeatures) aboutFeatures.classList.remove('animate');
        
        // Force reflow to reset animations
        void aboutSection.offsetHeight;
        
        // Add animate class to trigger CSS animations
        setTimeout(() => {
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
    const heroSection = document.querySelector('.hero-section');
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

    // Ensure video background plays smoothly with custom time range (15-21 seconds)
    const heroVideo = document.querySelector('.hero-video') || document.getElementById('heroVideo');
    if (heroVideo) {
        const START_TIME = 15; // Start at 15 seconds
        const END_TIME = 21;   // End at 21 seconds
        
        // Set initial time when video metadata loads
        heroVideo.addEventListener('loadedmetadata', function() {
            this.currentTime = START_TIME;
            this.play().catch(function(error) {
                // Video autoplay prevented
            });
        });
        
        // Monitor video time and loop between 15-21 seconds
        heroVideo.addEventListener('timeupdate', function() {
            // If video reaches or exceeds 21 seconds, loop back to 15 seconds
            if (this.currentTime >= END_TIME) {
                this.currentTime = START_TIME;
            }
            // If video somehow goes before 15 seconds (e.g., on load), set to 15
            if (this.currentTime < START_TIME) {
                this.currentTime = START_TIME;
            }
        });
        
        // Ensure video loops smoothly
        heroVideo.addEventListener('ended', function() {
            this.currentTime = START_TIME;
            this.play();
        });
        
        // Force play on user interaction if needed
        document.addEventListener('click', function() {
            if (heroVideo.paused) {
                heroVideo.currentTime = START_TIME;
                heroVideo.play();
            }
        }, { once: true });
        
        // Ensure video starts at correct time when it can play
        heroVideo.addEventListener('canplay', function() {
            if (this.currentTime < START_TIME || this.currentTime > END_TIME) {
                this.currentTime = START_TIME;
            }
        });
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

    // Kids MMA Section Video Control - Power-saving resistant
    const mmaVideo = document.querySelector('.mma-background-video') || document.getElementById('mmaKidsVideo');
    const mmaVideoBackground = document.querySelector('.mma-video-background');
    const mmaPlayBtn = document.getElementById('mmaVideoPlayBtn');
    
    if (mmaVideo) {
        // Set video attributes
        mmaVideo.muted = true;
        mmaVideo.loop = true;
        mmaVideo.playsInline = true;
        mmaVideo.setAttribute('playsinline', '');
        mmaVideo.setAttribute('webkit-playsinline', '');
        mmaVideo.setAttribute('muted', '');
        mmaVideo.setAttribute('autoplay', '');
        
        let videoPlaying = false;
        let playAttempts = 0;
        const maxAttempts = 5;
        
        // Function to play video aggressively
        const playVideo = () => {
            if (mmaVideo.readyState >= 2) { // HAVE_CURRENT_DATA or higher
                const playPromise = mmaVideo.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        videoPlaying = true;
                        playAttempts = 0;
                        mmaVideo.style.opacity = '1';
                        mmaVideo.style.display = 'block';
                        if (mmaPlayBtn) mmaPlayBtn.style.display = 'none';
                        if (mmaVideoBackground) {
                            mmaVideoBackground.style.opacity = '1';
                        }
                    }).catch(error => {
                        videoPlaying = false;
                        playAttempts++;
                        if (mmaPlayBtn) mmaPlayBtn.style.display = 'flex';
                    });
                }
            }
        };
        
        // Show play button if video fails to play
        if (mmaPlayBtn) {
            mmaPlayBtn.addEventListener('click', () => {
                playVideo();
            });
        }
        
        // Aggressive play attempts
        mmaVideo.addEventListener('loadedmetadata', playVideo);
        mmaVideo.addEventListener('loadeddata', playVideo);
        mmaVideo.addEventListener('canplay', playVideo);
        mmaVideo.addEventListener('canplaythrough', playVideo);
        
        // Prevent pause from power saving
        mmaVideo.addEventListener('pause', function(e) {
            if (!this.ended && !document.hidden && videoPlaying) {
                setTimeout(() => {
                    if (this.paused) {
                        this.play().then(() => {
                            videoPlaying = true;
                        }).catch(() => {
                            if (mmaPlayBtn) mmaPlayBtn.style.display = 'flex';
                        });
                    }
                }, 100);
            }
        });
        
        // Ensure video plays after splash animation
        setTimeout(() => {
            playVideo();
            if (mmaVideoBackground) {
                mmaVideoBackground.style.opacity = '1';
            }
        }, 4000);
        
        // Force play after animation completes
        setTimeout(() => {
            playVideo();
        }, 6000);
        
        // Video loop handler
        mmaVideo.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play().then(() => {
                this.style.opacity = '1';
                this.style.display = 'block';
            }).catch(() => {
                if (mmaPlayBtn) mmaPlayBtn.style.display = 'flex';
            });
        });
        
        // Show video when playing
        mmaVideo.addEventListener('playing', function() {
            this.style.opacity = '1';
            this.style.display = 'block';
            videoPlaying = true;
            if (mmaVideoBackground) {
                mmaVideoBackground.style.opacity = '1';
            }
        });
        
        // Ensure video is visible after splash animation
        setTimeout(() => {
            mmaVideo.style.opacity = '1';
            mmaVideo.style.display = 'block';
            if (mmaVideoBackground) {
                mmaVideoBackground.style.opacity = '1';
            }
        }, 6000);
        
        // Handle page visibility
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden && mmaVideo.paused && videoPlaying) {
                setTimeout(() => playVideo(), 500);
            }
        });
        
        // Intersection Observer - play when section is visible
        const kidsMmaSection = document.querySelector('.kids-mma-section');
        if (kidsMmaSection && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                        playVideo();
                        if (mmaVideoBackground) {
                            mmaVideoBackground.style.opacity = '1';
                        }
                    }
                });
            }, { threshold: [0.3, 0.5, 0.7] });
            
            observer.observe(kidsMmaSection);
        }
        
        // Aggressive periodic check (every 1 second)
        const playCheckInterval = setInterval(() => {
            if (mmaVideo.paused && !mmaVideo.ended && !document.hidden && playAttempts < maxAttempts) {
                playVideo();
            } else if (playAttempts >= maxAttempts && mmaPlayBtn) {
                mmaPlayBtn.style.display = 'flex';
            }
        }, 1000);
        
        // Clean up interval when video is playing
        mmaVideo.addEventListener('playing', () => {
            videoPlaying = true;
            playAttempts = 0;
        });
        
        // User interaction triggers
        const userInteractionPlay = () => {
            if (mmaVideo.paused) {
                playVideo();
            }
        };
        
        document.addEventListener('click', userInteractionPlay, { once: true });
        document.addEventListener('touchstart', userInteractionPlay, { once: true });
        document.addEventListener('scroll', userInteractionPlay, { once: true });
        window.addEventListener('focus', userInteractionPlay, { once: true });
    }

    // Simple MMA Section Video Control
    const simpleMmaVideo = document.getElementById('simpleMmaVideo');
    if (simpleMmaVideo) {
        simpleMmaVideo.muted = true;
        simpleMmaVideo.loop = true;
        simpleMmaVideo.playsInline = true;
        
        const playSimpleVideo = () => {
            const playPromise = simpleMmaVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Simple MMA video playing successfully
                }).catch(error => {
                    // Simple video autoplay prevented
                    document.addEventListener('click', () => simpleMmaVideo.play(), { once: true });
                    document.addEventListener('touchstart', () => simpleMmaVideo.play(), { once: true });
                });
            }
        };
        
        simpleMmaVideo.addEventListener('canplay', playSimpleVideo, { once: true });
        simpleMmaVideo.addEventListener('loadeddata', playSimpleVideo, { once: true });
        
        // Ensure video loops
        simpleMmaVideo.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        });
        
        // Play on section visibility
        const simpleMmaSection = document.querySelector('.simple-mma-section');
        if (simpleMmaSection && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        playSimpleVideo();
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(simpleMmaSection);
        }
    }

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
