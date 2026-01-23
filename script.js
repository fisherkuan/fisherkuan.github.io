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
