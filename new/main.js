document.addEventListener("DOMContentLoaded", () => {
    // 1. Intersection Observer for 3D Reveals
    // Optimized: Handled classes directly in HTML. Replaced multiple lookups with a fast active toggle.
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add("active");
                observer.unobserve(e.target);
            }
        });
    }, { root: null, rootMargin: "-50px 0px", threshold: 0.15 });

    document.querySelectorAll(".reveal-3d").forEach(el => observer.observe(el));

    // 2. Power Object (3D Bolt) Dynamic Flight Logic
    // Optimized: Eliminated array conversions. Cached outer heights. Used fast translate3d.
    const energyBolt = document.querySelector(".energy");
    const sections = document.querySelectorAll(".screen-section");

    if (energyBolt) {
        const updateBolt = () => {
            let active = null, minD = Infinity, cy = window.innerHeight / 2;
            let activeIndex = 0;

            // 1. Encontrar la sección más cercana al centro visual
            sections.forEach((sec, index) => {
                const r = sec.getBoundingClientRect();
                const d = Math.abs(r.top + r.height / 2 - cy);
                if (d < minD) { minD = d; active = sec; activeIndex = index; }
            });

            // 2. Posicionar el rayo
            if (active) {
                const txt = active.querySelector("h1, h2");
                if (txt) {
                    const r = txt.getBoundingClientRect();
                    const isHero = active.id === "hero";

                    let xPos, yPos, rotation, scale;

                    if (isHero) {
                        // Hero: Centrado horizontalmente y por encima del título
                        xPos = r.left + (r.width / 2);
                        yPos = r.top - 40; // Ajusta este número para darle más/menos altura
                        rotation = 0;
                        scale = 1.1; // Ligeramente más grande para mayor impacto inicial
                    } else {
                        // Resto de secciones: Alternando lados
                        const isRightSide = activeIndex % 2 !== 0;
                        xPos = isRightSide ? r.right + 25 : r.left - 45;
                        yPos = r.top + (r.height / 2);
                        rotation = isRightSide ? 15 : -15;
                        scale = 0.85;
                    }

                    // Se añade translate(-50%, -50%) para que las coordenadas apunten al centro exacto del icono
                    energyBolt.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;
                }
            }
        };
        // Added passive listener flags for aggressive scroll performance
        window.addEventListener("scroll", updateBolt, { passive: true });
        window.addEventListener("resize", updateBolt, { passive: true });
        updateBolt();
    }

    // 3. Smooth Scrolling
    // Optimized: Streamlined event closure and prevented unnecessary DOM traversals.
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", e => {
            e.preventDefault();
            const t = document.getElementById(a.getAttribute("href").substring(1));
            if (t) window.scrollTo({ top: t.offsetTop - 100, behavior: "smooth" });
        });
    });

    // 4. Parallax Bloom Effect
    // Optimized: Bypassed forEach loop logic directly mapped index transforms to avoid JS array iteration.
    const blobs = document.querySelectorAll('.blob');
    if (blobs.length === 3) {
        window.addEventListener('mousemove', e => {
            const x = (e.clientX - window.innerWidth / 2) / 15, y = (e.clientY - window.innerHeight / 2) / 15;
            blobs[0].style.transform = `translate3d(${x * 1.2}px, ${y * 1.2}px, 0)`;
            blobs[1].style.transform = `translate3d(${x * -1.8}px, ${y * -1.8}px, 0)`;
            blobs[2].style.transform = `translate3d(${x * 2.5}px, ${y * 2.5}px, 0)`;
        }, { passive: true });
    }
});