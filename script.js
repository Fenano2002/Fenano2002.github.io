/* --- LÓGICA PARA EL MENÚ DE HAMBURGUESA --- */
let menuIcono = document.querySelector('#menu-icono');
let navegacion = document.querySelector('.navegacion');

menuIcono.onclick = () => {
    // Alterna el icono entre "bars" (hamburguesa) y "x" (cerrar)
    menuIcono.classList.toggle('fa-xmark');
    // Muestra u oculta el menú
    navegacion.classList.toggle('active');
}

/* --- SECCIONES ACTIVAS SEGÚN EL SCROLL --- */
let secciones = document.querySelectorAll('section');
let enlacesNav = document.querySelectorAll('header nav a');

window.onscroll = () => {
    secciones.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            enlacesNav.forEach(enlaces => {
                enlaces.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /* --- QUITAR ICONO Y MENÚ AL HACER SCROLL --- */
    // Esto asegura que si el usuario hace scroll, el menú se cierre solo
    menuIcono.classList.remove('fa-xmark');
    navegacion.classList.remove('active');
};