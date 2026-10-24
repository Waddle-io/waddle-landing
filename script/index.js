// Waddle Landing Page — index.js

document.addEventListener('DOMContentLoaded', () => {
    const header  = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    // ── Navbar blur on scroll ─────────────────────────────────────────────
    const handleScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ── Active nav link with animated underline ───────────────────────────
    // Map each nav link to its target section id
    const sectionIds = [...navLinks]
        .map(a => a.getAttribute('href').slice(1))
        .filter(id => id && document.getElementById(id));

    const sections = sectionIds.map(id => document.getElementById(id));

    const setActive = (id) => {
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            if (isActive && !link.classList.contains('active')) {
                // Remove active from all, then trigger width animation via rAF
                navLinks.forEach(l => {
                    if (l.classList.contains('active')) {
                        l.classList.remove('active');
                        // Reset underline instantly (no transition) then let the new one animate
                        l.style.setProperty('--line-width', '0%');
                    }
                });
                link.classList.add('active');
            } else if (!isActive) {
                link.classList.remove('active');
            }
        });
    };

    // IntersectionObserver: fire when section enters viewport (top 20% of screen)
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        },
        {
            root: null,
            rootMargin: '-10% 0px -75% 0px', // trigger when section crosses top 10–25% of viewport
            threshold: 0,
        }
    );

    sections.forEach(section => observer.observe(section));

    // ── Smooth scroll on nav click ────────────────────────────────────────
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
