// Loader
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loader').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loader').style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true
        });

        // Typed.js initialization
        var typed = new Typed('#typed-text', {
            strings: ['Backend Java Developer', 'Microservices Architect', 'Payment Systems Expert'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            backDelay: 2000
        });

        // Mobile menu toggle
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Close mobile menu if open
                    document.getElementById('mobile-menu').classList.add('hidden');
                }
            });
        });

        // Particle animation
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            };
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push(createParticle());
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx = -particle.vx;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy = -particle.vy;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
                ctx.fill();
                
                // Draw lines between nearby particles
                particles.forEach((otherParticle, otherIndex) => {
                    if (index !== otherIndex) {
                        const dx = particle.x - otherParticle.x;
                        const dy = particle.y - otherParticle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(otherParticle.x, otherParticle.y);
                            ctx.strokeStyle = `rgba(102, 126, 234, ${0.1 * (1 - distance / 100)})`;
                            ctx.stroke();
                        }
                    }
                });
            });
            
            requestAnimationFrame(drawParticles);
        }

        resizeCanvas();
        initParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });

        // Add scroll animations
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero-gradient');
            if (parallax) {
                const speed = 0.5;
                parallax.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });