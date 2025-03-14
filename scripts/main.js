const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-list a');

// Obtener los elementos
let modal = document.getElementById("mapa-modal");
let img = document.getElementById("redTroncal");
let modalImg = document.getElementById("modalImage");
let captionText = document.getElementById("caption");
let span = document.getElementsByClassName("close")[0];

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 50;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Cuando se hace clic en la imagen, mostrar el modal
img.onclick = function () {
    modal.classList.add("show"); // Mostrar el modal
    modalImg.src = this.src; // Copiar la fuente de la imagen al modal
    captionText.innerHTML = this.alt; // Establecer el texto alternativo de la imagen como caption
}

// Obtener el botón de cerrar
var closeBtn = document.getElementsByClassName("close")[0];

// Cuando se hace clic en el botón de cerrar, ocultar el modal
closeBtn.onclick = function () {
    modal.classList.remove("show"); // Ocultar el modal
}

// Si se hace clic fuera del modal (en el fondo oscuro), también se cierra
window.onclick = function (event) {
    if (event.target == modal) {
        modal.classList.remove("show"); // Ocultar el modal
    }
}