/**
 * ----------------------------------------------------------------
 * Main JavaScript File for Future Organix India
 *
 * Organizes all interactive functionalities:
 * 1. Mobile Menu Toggle
 * 2. Header Style on Scroll
 * 3. Animate Elements on Scroll (Unified System)
 * 4. Smooth Scrolling for Anchor Links
 * 5. FAQ Accordion
 * 6. Contact Form Submission Simulation
 * ----------------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", () => {

    /**
     * 1. Mobile Menu Toggle
     * Handles the opening and closing of the mobile navigation.
     */
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileNav = document.getElementById("mobileNav");
    const menuIcon = document.getElementById("menuIcon");

    if (mobileMenuBtn && mobileNav) {
        const toggleMenu = () => {
            const isMenuOpen = mobileNav.classList.toggle("show");
            mobileMenuBtn.setAttribute("aria-expanded", isMenuOpen);
            menuIcon.classList.toggle("fa-bars", !isMenuOpen);
            menuIcon.classList.toggle("fa-times", isMenuOpen);
            // Prevent scrolling of the body when the menu is open
            document.body.style.overflow = isMenuOpen ? "hidden" : "";
        };

        mobileMenuBtn.addEventListener("click", toggleMenu);

        // Close the menu when any of the mobile navigation links are clicked
        mobileNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                if (mobileNav.classList.contains("show")) {
                    toggleMenu();
                }
            });
        });
    }

    /**
     * 2. Header Style on Scroll
     * Adds a class to the header when the user scrolls down.
     */
    const header = document.getElementById("header");
    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("header-scrolled", window.scrollY > 50);
        });
    }

    /**
     * 3. Animate Elements on Scroll (Unified System)
     * Uses Intersection Observer to add a 'is-visible' class to elements
     * with a `data-animation` attribute when they enter the viewport.
     * This is the single system used for all scroll animations.
     */
    const animatedElements = document.querySelectorAll('[data-animation]');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get delay from data-attribute for staggered effects
                    const delay = entry.target.getAttribute('data-delay') || '0ms';
                    entry.target.style.transitionDelay = delay;

                    // Add the class to trigger the animation
                    entry.target.classList.add('is-visible');

                    // Animation is done, no need to observe it anymore
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * 4. Smooth Scrolling for Anchor Links
     * Scrolls smoothly to sections when an anchor link is clicked.
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            // Ensure it's a valid selector and not just "#"
            if (targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = 72; // Height of your fixed header
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    /**
     * 5. FAQ Accordion
     * Manages the show/hide functionality of the FAQ section.
     */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';

                // Close all other items first for a true accordion effect
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.style.maxHeight = '0px';
                        otherAnswer.style.paddingBottom = '0px';
                    }
                });

                // Toggle the clicked item
                if (!isExpanded) {
                    question.setAttribute('aria-expanded', 'true');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.paddingBottom = 'var(--spacing-lg)';
                } else {
                    question.setAttribute('aria-expanded', 'false');
                    answer.style.maxHeight = '0px';
                    answer.style.paddingBottom = '0px';
                }
            });
        }
    });

    /**
     * 6. Contact Form Submission Simulation
     * Provides user feedback on form submission.
     */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');

            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;

            if (!name || !email || !message) {
                alert("Please fill out all required fields.");
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                const successMessage = document.createElement('p');
                successMessage.textContent = "Thank you! Your inquiry has been sent.";
                successMessage.style.color = "var(--color-primary)";
                successMessage.style.marginTop = "1rem";
                this.parentNode.insertBefore(successMessage, this.nextSibling);

                this.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = "Send Inquiry";

                setTimeout(() => successMessage.remove(), 4000);
            }, 1500);
        });
    }

});