function initParticles(explosion = false) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: explosion ? 400 : 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#00eeff", "#ff00c8", "#9d4edd"]
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00eeff",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: explosion ? 6 : 2,
                direction: explosion ? "none" : "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: explosion ? "repulse" : "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 200,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                }
            }
        },
        retina_detect: true
    });
}

// Initialize particles when the script loads
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
});