document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Nav shadow on scroll ---
    const nav = document.querySelector('nav');
    const onScroll = () => {
        if (window.scrollY > 12) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Hero typing effect ---
    const typedEl = document.getElementById('typedGreeting');
    if (typedEl) {
        const message = 'Hi, I am Dipika Singh';
        if (prefersReducedMotion) {
            typedEl.textContent = message;
        } else {
            let i = 0;
            const type = () => {
                if (i <= message.length) {
                    typedEl.textContent = message.slice(0, i);
                    i++;
                    setTimeout(type, 55);
                }
            };
            type();
        }
    }

    if (prefersReducedMotion) return;

    // --- Scroll reveal for content blocks ---
    const revealTargets = document.querySelectorAll('section, .cert-plate, .card, .ledger-row, .skill-pill');

    revealTargets.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealTargets.forEach(el => observer.observe(el));
});
