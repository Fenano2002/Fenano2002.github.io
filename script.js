'use strict';

const menuIcono = document.querySelector('#menu-icono');
const navegacion = document.querySelector('.navegacion');
const enlacesNav = document.querySelectorAll('header nav a');

menuIcono.addEventListener('click', () => {
    menuIcono.classList.toggle('fa-xmark');
    navegacion.classList.toggle('active');
});

window.addEventListener('scroll', () => {
    menuIcono.classList.remove('fa-xmark');
    navegacion.classList.remove('active');
}, { passive: true });

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            enlacesNav.forEach(enlace => {
                enlace.classList.remove('active');
                if (enlace.getAttribute('href') === `#${id}`) {
                    enlace.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(sec => navObserver.observe(sec));


const sliders = document.querySelectorAll('.proyecto-slider');

sliders.forEach(slider => {
    const wrapper = slider.querySelector('.slider-wrapper');
    const slides = slider.querySelectorAll('.slider-wrapper img');
    const btnPrev = slider.querySelector('.prev');
    const btnNext = slider.querySelector('.next');
    const dots = slider.querySelectorAll('.dot');
    
    let currentIndex = 0;

    function updateSlider() {
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach(dot => dot.classList.remove('active'));
        if(dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    }

    if(btnNext) {
        btnNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });
    }

    if(btnPrev) {
        btnPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
});


emailjs.init("NeGNFdyO_1Bbnz4sJ");

const btnSend = document.getElementById('button-send');
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const originalText = btnSend.innerHTML;
        btnSend.disabled = true;
        btnSend.innerHTML = '<span class="loader"></span> Enviando...';

        const serviceID = 'service_460c6ve';
        const templateID = 'template_qwd3hk6';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btnSend.innerHTML = '<i class="fa-solid fa-check"></i> ¡Mensaje Enviado!';
                btnSend.classList.add('success');
                
                contactForm.reset(); 
                
                setTimeout(() => {
                    btnSend.disabled = false;
                    btnSend.innerHTML = originalText;
                    btnSend.classList.remove('success');
                }, 4000);
            })
            .catch((err) => {
                console.error('EmailJS Error:', err);
                btnSend.innerHTML = '<i class="fa-solid fa-xmark"></i> Error al enviar';
                btnSend.classList.add('error');
                
                setTimeout(() => {
                    btnSend.disabled = false;
                    btnSend.innerHTML = originalText;
                    btnSend.classList.remove('error'); 
                }, 4000);
            });
    });
}