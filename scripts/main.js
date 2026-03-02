const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-list a');

let modal = document.getElementById("modal-map");
let img = document.getElementById("backbone-network");
let modalImg = document.getElementById("modalImage");
let captionText = document.getElementById("caption");
let span = document.getElementsByClassName("close")[0];

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;

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

const serviceSlideIp = document.querySelector('#slide-ip');
const servicesTabs = document.querySelector('.services-tabs');
const titles = document.querySelectorAll('.title');
const card_about_us = document.querySelectorAll('.description-card-about-us');
const values_image = document.querySelector('.values-image');
const values_item = document.querySelectorAll('.value-item');
const values_bottom = document.querySelector('.values-bottom');
const ourNetworkDescription = document.querySelector('.network-info');
const ourNetworkMap = document.querySelector('.network-map');
const contactInfo = document.querySelector('.contact-info');
const contactForm = document.querySelector('.contact-form');
const contactLogo = document.querySelector('.contact-logo');

titles.forEach(title => {
    observer.observe(title);
});

card_about_us.forEach(card => {
    observer.observe(card);
});

values_item.forEach(value => {
    observer.observe(value);
});

observer.observe(serviceSlideIp);
observer.observe(servicesTabs);
observer.observe(ourNetworkDescription);
observer.observe(values_bottom);
observer.observe(values_image);
observer.observe(ourNetworkMap);
observer.observe(contactInfo);
observer.observe(contactForm);
observer.observe(contactLogo);

const scenes = document.querySelectorAll('#home .scene');
let currentScene = 0;
const sceneDuration = 7000;

function wrapLetters() {
  const titles = document.querySelectorAll('.title-home:not(.single)');

  titles.forEach(title => {
    const lines = title.querySelectorAll('.title-line');

    lines.forEach(line => {
      if (!line.classList.contains('title-flex')) {
        const text = line.textContent;
        line.innerHTML = '';

        const span = document.createElement('span');
        span.classList.add('line');

        text.split('').forEach(char => {
          const letter = document.createElement('span');
          letter.classList.add('letter');
          letter.textContent = char === ' ' ? '\u00A0' : char;
          span.appendChild(letter);
        });

        line.appendChild(span);
        return;
      }

      const mainWord = line.querySelector('.main-word');

      if (mainWord) {
        const text = mainWord.textContent;
        mainWord.innerHTML = '';

        const span = document.createElement('span');
        span.classList.add('line');

        text.split('').forEach(char => {
          const letter = document.createElement('span');
          letter.classList.add('letter');
          letter.textContent = char;
          span.appendChild(letter);
        });

        mainWord.appendChild(span);
      }
    });
  });
}

function resetScene(scene) {
  const letters = scene.querySelectorAll('.letter');
  const subtitle = scene.querySelector('.subtitle-home');

  letters.forEach(letter => {
    letter.style.animation = 'none';
    letter.style.opacity = 0;
    letter.style.transform = 'translateX(-80px)';
    letter.style.letterSpacing = '1em';
  });

  if (subtitle) {
    subtitle.style.animation = 'none';
    subtitle.style.opacity = 0;
  }

  scene.offsetHeight;
}

function showScene(index) {
  const scene = scenes[index];

  resetScene(scene);

  const letters = scene.querySelectorAll('.letter');
  const subtitle = scene.querySelector('.subtitle-home');

  scene.style.opacity = 1;

  letters.forEach((letter, i) => {
    letter.style.animation = `slideIn 0.6s ease forwards`;
    letter.style.animationDelay = `${i * 0.05}s`;

    const compressDelay = 0.6 + (letters.length - i - 1) * 0.05;
    letter.style.animation += `, compressSpacing 0.6s ease forwards`;
    letter.style.animationDelay += `, ${compressDelay}s`;
  });

  if (subtitle) {
    subtitle.style.animation = `fadeInFast 0.8s ease forwards`;
    subtitle.style.animationDelay = `2s`;
  }

  setTimeout(() => {
    if (subtitle) {
      subtitle.style.animation = `fadeOut 0.5s ease forwards`;
    }

    scene.style.opacity = 0;
  }, sceneDuration - 800);
}

function playScenes() {
  showScene(currentScene);

  setTimeout(() => {
    currentScene = (currentScene + 1) % scenes.length;
    playScenes();
  }, sceneDuration);
}

wrapLetters();
playScenes();

document.querySelectorAll(".service-tab").forEach(tab => {
  tab.addEventListener("click", () => {

    document.querySelectorAll(".service-tab")
            .forEach(t => t.classList.remove("animate"));
    tab.classList.add("animate");

    document.querySelectorAll(".service-slide")
            .forEach(s => s.classList.remove("animate"));

    document.getElementById(tab.dataset.tab).classList.add("animate");
  });
});

const tabs = document.querySelectorAll(".service-tab");
const highlight = document.querySelector(".tab-highlight");

function moveHighlight(tab) {
  const rect = tab.getBoundingClientRect();
  const parentRect = tab.parentElement.getBoundingClientRect();
  highlight.style.width = rect.width + "px";
  highlight.style.transform = `translateX(${rect.left - parentRect.left -4}px)`;
}

const initialAnimate = document.querySelector(".service-tab.animate");
moveHighlight(initialAnimate);

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    document.querySelectorAll(".service-tab").forEach(t => t.classList.remove("animate"));
    tab.classList.add("animate");

    moveHighlight(tab);

    document.querySelectorAll(".service-slide").forEach(s => s.classList.remove("animate"));
    document.getElementById(tab.dataset.tab).classList.add("animate");
  });
});

document.querySelectorAll(".footer-service-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const targetSlide = link.dataset.tab;

    document.getElementById("services")
      .scrollIntoView({ behavior: "smooth" });

    const targetTab = document.querySelector(
      `.service-tab[data-tab="${targetSlide}"]`
    );

    if (targetTab) {
      targetTab.click();
    }
  });
});

document.getElementById("mail-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent(
      "Nuevo mensaje desde el sitio web"
    );

    const body = encodeURIComponent(
      `Nuevo mensaje enviado desde el sitio web\n\n` +
      `Nombre: ${name}\n` +
      `Email: ${email}\n\n` +
      `Teléfono: ${phone}\n\n` +
      `Mensaje:\n${message}\n\n` +
      `—\n` +
      `Este mensaje fue enviado desde el formulario del sitio web.`
    );

    window.location.href =
      `mailto:solutionlan@solutionlan.com?subject=${subject}&body=${body}`;
  });