const menuIcono = document.querySelector('#menu-icono');
const navegacion = document.querySelector('.navegacion');
const secciones = document.querySelectorAll('section');
const enlacesNav = document.querySelectorAll('header nav a');

menuIcono.addEventListener('click', () => {
    menuIcono.classList.toggle('fa-xmark');
    navegacion.classList.toggle('active');
});

/* SECCIONES ACTIVAS SEGÚN EL SCROLL*/
window.addEventListener('scroll', () => {
    let top = window.scrollY;

    secciones.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            enlacesNav.forEach(enlace => {
                enlace.classList.remove('active');
                if (enlace.getAttribute('href') === '#' + id) {
                    enlace.classList.add('active');
                }
            });
        }
    });

    /* QUITAR ICONO Y MENÚ AL HACER SCROLL */
    menuIcono.classList.remove('fa-xmark');
    navegacion.classList.remove('active');
});

/* ENVIAR CORREO CON EMAILJS */
emailjs.init("NeGNFdyO_1Bbnz4sJ");

const btn = document.getElementById('button-send');
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        btn.disabled = true;
        btn.innerHTML = '<span class="loader"></span> Enviando...';

        const serviceID = 'service_460c6ve';
        const templateID = 'template_qwd3hk6';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.disabled = false;
                btn.innerHTML = '¡Mensaje Enviado!';
                btn.style.backgroundColor = 'var(--accent-color)'; 
                
                alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
                contactForm.reset(); 
                
                setTimeout(() => {
                    btn.innerHTML = '<span class="btn-text">Enviar Mensaje</span>';
                    btn.style.backgroundColor = '';
                }, 3000);
            }, (err) => {
                btn.disabled = false;
                btn.innerHTML = 'Error al enviar';
                btn.style.backgroundColor = '#e74c3c';
                
                console.error('EmailJS Error:', err);
                alert('Hubo un problema de conexión. Por favor, inténtalo de nuevo.');
                
                setTimeout(() => {
                    btn.innerHTML = '<span class="btn-text">Enviar Mensaje</span>';
                    btn.style.backgroundColor = ''; 
                }, 3000);
            });
    });
}