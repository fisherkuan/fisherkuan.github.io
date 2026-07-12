// Theme toggle
(function() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    function currentTheme() {
        return root.dataset.theme || (media.matches ? 'dark' : 'light');
    }

    function updateLabel() {
        const dark = currentTheme() === 'dark';
        btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    btn.addEventListener('click', function() {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        try {
            if ((next === 'dark') === media.matches) {
                // Back to matching the system preference — drop the override
                delete root.dataset.theme;
                localStorage.removeItem('theme');
            } else {
                root.dataset.theme = next;
                localStorage.setItem('theme', next);
            }
        } catch (e) {
            root.dataset.theme = next;
        }
        updateLabel();
    });

    media.addEventListener('change', updateLabel);
    updateLabel();
})();

// Navigation scroll behavior
(function() {
    const nav = document.getElementById('nav');
    const hero = document.getElementById('hero');

    if (!nav || !hero) return;

    const showNavThreshold = 100;

    function updateNav() {
        const scrollY = window.scrollY;

        if (scrollY > showNavThreshold) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }
    }

    // Initial check
    updateNav();

    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateNav();
                ticking = false;
            });
            ticking = true;
        }
    });
})();
