document.addEventListener("DOMContentLoaded", () => {
    /**
     * ------------------------------------------------
     * Product Image Gallery
     * ------------------------------------------------
     */
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Get the full-size image URL from the data attribute
                const fullSrc = this.dataset.fullSrc;
                if (fullSrc) {
                    mainImage.src = fullSrc;
                }
                
                // Update active state
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    /**
     * ------------------------------------------------
     * Product Details Accordion
     * ------------------------------------------------
     */
    const accordionItems = document.querySelectorAll('.product-details-accordion .faq-item');
    accordionItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            question.setAttribute('aria-expanded', !isExpanded);
            if (!isExpanded) {
                // Open the accordion
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.paddingBottom = 'var(--spacing-lg)';
            } else {
                // Close the accordion
                answer.style.maxHeight = 0;
                answer.style.paddingBottom = '0';
            }
        });
    });
});