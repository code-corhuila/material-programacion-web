










// ========================================
// MÓDULO: ANIMACIÓN DE BARRAS DE HABILIDADES
// ========================================

const HabilidadesManager = (() => {
    const skillProgressBars = document.querySelectorAll('.skill-progress');

    // Inicializar
    const init = () => {
        if (skillProgressBars.length === 0) return;

        // Establecer ancho inicial en 0
        skillProgressBars.forEach(bar => {
            bar.style.width = '0%';
        });

        // Obsevrar cuando entran en viewport
        observarBarras();
    };

    // Observer para animar barras cuando entran en view
    const observarBarras = () => {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.style.getPropertyValue('--target') || '0';
                    
                    animarBarra(progressBar, parseFloat(targetWidth));
                    observer.unobserve(progressBar);
                }
            });
        }, observerOptions);

        skillProgressBars.forEach(bar => observer.observe(bar));
    };

    // Animar una barra
    const animarBarra = (element, targetWidth) => {
        let currentWidth = 0;
        const increment = targetWidth / 50;
        
        const interval = setInterval(() => {
            currentWidth += increment;
            if (currentWidth >= targetWidth) {
                currentWidth = targetWidth;
                clearInterval(interval);
            }
            element.style.width = currentWidth + '%';
        }, 20);
    };

    return { init };
})();
