const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-list a');

let modal = document.getElementById("mapa-modal");
let img = document.getElementById("redTroncal");
let modalImg = document.getElementById("modalImage");
let captionText = document.getElementById("caption");
let span = document.getElementsByClassName("close")[0];

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 300;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection && window.scrollY > 0) {
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

img.onclick = function () {
    modal.classList.add("show");
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}

var closeBtn = document.getElementsByClassName("close")[0];

closeBtn.onclick = function () {
    modal.classList.remove("show");
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.classList.remove("show");
    }
}

window.onload = function () {
    document.querySelector('.spinner-container').style.display = 'none';

    document.body.classList.remove('no-scroll');
};

document.body.classList.add('no-scroll');

const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            observer.unobserve(entry.target);
        }
    });
};

const observerOptions = {
    root: null,
    threshold: 0.1,
};

const observer = new IntersectionObserver(handleIntersection, observerOptions);

const serviceCards = document.querySelectorAll('.service-card');
const titles = document.querySelectorAll('.title');
const subtitles = document.querySelectorAll('.subtitle');
const about_us_divider = document.querySelector('.about-us-divider');
const about_us_phrase_type1 = document.querySelectorAll('.about-us-phrase-type1');
const about_us_phrase_type2 = document.querySelectorAll('.about-us-phrase-type2');
const valueCards = document.querySelectorAll('.value-card');
const ourNetworkDescription = document.querySelector('.network-info');
const ourNetworkMap = document.querySelector('.network-map');
const contactInfo = document.querySelector('.contact-info');
const contactForm = document.querySelector('.contact-form');
const contactLogo = document.querySelector('.contact-logo');

serviceCards.forEach(card => {
    observer.observe(card);
});

titles.forEach(title => {
    observer.observe(title);
});

subtitles.forEach(subtitle => {
    observer.observe(subtitle);
});

observer.observe(about_us_divider);

about_us_phrase_type1.forEach(phrase1 => {
    observer.observe(phrase1);
});

about_us_phrase_type2.forEach(phrase2 => {
    observer.observe(phrase2);
});

valueCards.forEach(card => {
    observer.observe(card);
});

observer.observe(ourNetworkDescription);

observer.observe(ourNetworkMap);

observer.observe(contactInfo);

observer.observe(contactForm);

observer.observe(contactLogo);

// Todos los elementos h1
const homeTitles = document.querySelectorAll('h1');
let currentTitleIndex = 0;
const totalTitles = homeTitles.length;
const duration = 5000;  // Duración de cada título visible (en ms)

// Inicializar el primer título visible
setTimeout(() => {
    homeTitles[currentTitleIndex].style.opacity = 1;
    homeTitles[currentTitleIndex].style.animation = 'rotateAndScaleIn 1.5s ease-in-out forwards';
}, 100);  // Retraso de 100ms antes de aplicar la animación

// Función para manejar la rotación de títulos
function rotateTitles() {
    // Ocultar el título actual con la animación de salida
    homeTitles[currentTitleIndex].style.animation = 'rotateAndScaleOut 2s ease-in-out forwards';

    // Incrementar el índice para el siguiente título
    currentTitleIndex = (currentTitleIndex + 1) % totalTitles;

    // Mostrar el siguiente título con la animación de entrada
    homeTitles[currentTitleIndex].style.opacity = 1;
    homeTitles[currentTitleIndex].style.animation = 'rotateAndScaleIn 2s ease-in-out forwards';
}

// Inicializar la animación
setInterval(rotateTitles, duration);  // Cambia cada 'duration' ms

window.addEventListener('load', function () {
    window.scrollTo(0, 0);
});