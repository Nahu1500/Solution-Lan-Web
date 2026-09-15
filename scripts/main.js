document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-list a');
  const navbarList = document.querySelector('.navbar-list');
  const header = document.querySelector('header');

  const modal = document.getElementById('modal-map');
  const img = document.getElementById('backbone-network');
  const modalImg = document.getElementById('modalImage');
  const captionText = document.getElementById('caption');
  const closeBtn = document.getElementsByClassName('close')[0];

  const scenes = document.querySelectorAll('#home .scene');
  let currentScene = 0;
  const sceneDuration = 5500;

  function moveHighlight(tab, highlight) {
    const rect = tab.getBoundingClientRect();
    const parentRect = tab.parentElement.getBoundingClientRect();
    highlight.style.width = rect.width + 'px';
    highlight.style.transform = `translateX(${rect.left - parentRect.left - 4}px)`;
  }

  function wrapLetters() {
    const titles = document.querySelectorAll('.title-home');

    titles.forEach((title) => {
      const lines = title.querySelectorAll('.title-line');

      lines.forEach((line) => {
        if (!line.classList.contains('title-flex')) {
          const text = line.textContent;
          line.innerHTML = '';

          const span = document.createElement('span');
          span.classList.add('line');

          text.split('').forEach((char) => {
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

          text.split('').forEach((char) => {
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
    const logo = scene.querySelector('.logo-final');

    letters.forEach((letter) => {
      letter.style.animation = 'none';
      letter.style.opacity = 0;
      letter.style.transform = 'translateX(-80px)';
      const spacing = window.innerWidth <= 1000 ? '8px' : '16px';
      letter.style.letterSpacing = spacing;
    });

    if (subtitle) {
      subtitle.style.animation = 'none';
      subtitle.style.opacity = 0;
    }

    if (logo) {
      logo.classList.remove('animate');
      logo.style.opacity = 0;
      logo.style.transform = 'scale(1.2)';
    }

    scene.offsetHeight;
  }

  function showScene(index) {
    const scene = scenes[index];
    const isLastScene = index === scenes.length - 1;

    resetScene(scene);

    const letters = scene.querySelectorAll('.letter');
    const subtitle = scene.querySelector('.subtitle-home');
    const logo = scene.querySelector('.logo-final');

    scene.style.opacity = 1;

    const letterDelayStep = isLastScene ? 0.03 : 0.05;

    letters.forEach((letter, i) => {
      letter.style.animation = `slideIn 0.6s ease forwards`;
      letter.style.animationDelay = `${i * letterDelayStep}s`;

      const compressDelay = 0.6 + (letters.length - i - 1) * letterDelayStep;
      letter.style.animation += `, compressSpacing 0.6s ease forwards`;
      letter.style.animationDelay += `, ${compressDelay}s`;
    });

    if (logo) {
      const delay = (letters.length * letterDelayStep + 0.6) * 1000 + 200;
      setTimeout(() => {
        logo.classList.add('animate');
      }, delay);
    }

    if (subtitle) {
      const subtitleDelay = isLastScene ? 1 : 2;
      subtitle.style.animation = `fadeInFast 0.8s ease forwards`;
      subtitle.style.animationDelay = `${subtitleDelay}s`;
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

  window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (
        link.getAttribute('href').substring(1) === currentSection &&
        window.scrollY > 0
      ) {
        link.classList.add('active');
      }
    });

    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (img && modal) {
    img.onclick = function () {
      modal.classList.add('show');
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
      document.documentElement.classList.add('no-scroll');
    };

    closeBtn.onclick = function () {
      modal.classList.remove('show');
      document.documentElement.classList.remove('no-scroll');
    };

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.classList.remove('show');
        document.documentElement.classList.remove('no-scroll');
      }
    });
  }

  document.body.classList.add('no-scroll');

  window.onload = function () {
    document.querySelector('.spinner-container').style.display = 'none';
    document.body.classList.remove('no-scroll');

    wrapLetters();
    playScenes();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll('.title, .description-card-about-us, .value-item')
    .forEach((el) => observer.observe(el));

  [
    '#slide-ip',
    '.services-tabs',
    '.values-image',
    '.values-bottom',
    '.network-info',
    '.network-map',
    '.contact-info',
    '.contact-form',
    '.contact-logo',
  ].forEach((selector) => {
    const el = document.querySelector(selector);
    if (el) observer.observe(el);
  });

  const tabs = document.querySelectorAll('.service-tab');
  const highlight = document.querySelector('.tab-highlight');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (window.innerWidth > 1000) {
        document
          .querySelectorAll('.service-tab')
          .forEach((t) => t.classList.remove('animate'));
        tab.classList.add('animate');

        moveHighlight(tab, highlight);

        document
          .querySelectorAll('.service-slide')
          .forEach((s) => s.classList.remove('animate'));
        document.getElementById(tab.dataset.tab).classList.add('animate');
      }
    });
  });

  const initial = document.querySelector('.service-tab.animate');
  if (initial && highlight) moveHighlight(initial, highlight);

  document.querySelectorAll('.footer-service-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetSlide = link.dataset.tab;

      document
        .getElementById('services')
        .scrollIntoView({ behavior: 'smooth' });

      const targetTab = document.querySelector(
        `.service-tab[data-tab="${targetSlide}"]`
      );
      if (targetTab) targetTab.click();
    });
  });

  document.getElementById('mail-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent('Nuevo mensaje desde el sitio web');

    const body = encodeURIComponent(
      `Nuevo mensaje enviado desde el sitio web\n\n` +
        `Nombre: ${name}\nEmail: ${email}\n\nTeléfono: ${phone}\n\nMensaje:\n${message}`
    );

    window.location.href = `mailto:solutionlan@solutionlan.com?subject=${subject}&body=${body}`;
  });

  const hamburgerBtn = document.querySelector('.hamburger-btn');

  hamburgerBtn.addEventListener('click', () => {
    if (window.innerWidth <= 1200) {
      const isOpen = navbarList.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');

      if (isOpen) {
        document.documentElement.classList.add('no-scroll');
      } else {
        document.documentElement.classList.remove('no-scroll');
      }
    } else {
      navbarList.classList.remove('active');
      hamburgerBtn.classList.remove('active');
      document.documentElement.classList.remove('no-scroll');
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      if (e.target.closest('.language--mobile')) return;

      if (window.innerWidth <= 1200) {
        navbarList.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');
      }
    });
  });

  const closeLanguageModalButton = document.querySelector('.close-btn');
  const languageToggleMobile = document.getElementById(
    'language-toggle-mobile'
  );

  languageToggleMobile.addEventListener('change', () => {
    if (languageToggleMobile.checked && window.innerWidth <= 1200) {
      hamburgerBtn.style.display = 'none';
    } else {
      hamburgerBtn.style.display = 'block';
    }
  });

  closeLanguageModalButton.addEventListener('click', () => {
    if (languageToggleMobile) {
      languageToggleMobile.checked = false;
      hamburgerBtn.style.display = 'block';
    }
  });

  function initCarouselDots() {
    const servicesSlider = document.querySelector('.services-slider');
    const dots = document.querySelectorAll('.carousel-dot');
    const slides = document.querySelectorAll('.service-slide');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (window.innerWidth <= 1000) {
          const slide = slides[index];
          const left = slide.offsetLeft;
          servicesSlider.scrollTo({ left, behavior: 'smooth' });
        }
      });
    });

    servicesSlider.addEventListener('scroll', () => {
      const slideWidth = slides[0] ? slides[0].offsetWidth : 1;
      const scrollLeft = servicesSlider.scrollLeft;
      const currentIndex = Math.round(scrollLeft / slideWidth);

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    });
  }

  initCarouselDots();
});
