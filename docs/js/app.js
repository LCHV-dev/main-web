window.addEventListener('scroll', function() {
  const navbar = document.getElementById('mainNav');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.getElementById('mainNav').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  });
});

window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateCounter(stat, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
  const statsSection = document.querySelector('#nosotros');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('#heroCarousel');
  if (carousel) {
    const bsCarousel = new bootstrap.Carousel(carousel, {
      interval: 5000,
      ride: 'carousel',
      pause: 'hover',
      wrap: true
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzm66Zg2K7SNCy-wzZCLZbQxyIsGis3KFXW59JBNn1aUpY-5dnaePYiMMtLVMl-oz1eMA/exec';

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
      };

      if (!formData.name || !formData.email || !formData.message) {
        showMessage('Por favor, complete todos los campos requeridos.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showMessage('Por favor, ingrese un email válido.', 'error');
        return;
      }

      // Mostrar mensaje de envío
      showMessage('Enviando...', 'info');

      // Enviar datos a Google Sheets
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      .then(() => {
        showMessage(
          '¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.',
          'success'
        );
        contactForm.reset();
        console.log('Formulario enviado exitosamente a Google Sheets');
      })
      .catch((error) => {
        console.error('Error al enviar:', error);
        showMessage(
          'Hubo un error al enviar el formulario. Por favor, intenta nuevamente o contáctanos directamente a soluciones@velifatech.com',
          'error'
        );
      });
    });
  }

  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'mt-3 show';
    formMessage.style.transition = 'opacity 0.3s ease-in-out';
    formMessage.style.opacity = '1';

    if (type === 'success') {
      formMessage.classList.add('success');
      formMessage.style.background = '#d4edda';
      formMessage.style.border = '1px solid #c3e6cb';
      formMessage.style.color = '#155724';
      formMessage.style.padding = '12px';
      formMessage.style.borderRadius = '4px';
    } else if (type === 'info') {
      formMessage.style.background = '#d1ecf1';
      formMessage.style.border = '1px solid #bee5eb';
      formMessage.style.color = '#0c5460';
      formMessage.style.padding = '12px';
      formMessage.style.borderRadius = '4px';
    } else {
      formMessage.style.background = '#f8d7da';
      formMessage.style.border = '1px solid #f5c6cb';
      formMessage.style.color = '#721c24';
      formMessage.style.padding = '12px';
      formMessage.style.borderRadius = '4px';
    }

    // Ocultar mensaje después de 4 segundos con fade out
    setTimeout(() => {
      formMessage.style.opacity = '0';
      setTimeout(() => {
        formMessage.classList.remove('show');
        formMessage.textContent = '';
      }, 300);
    }, 4000);
  }
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
  const animateElements = document.querySelectorAll('.service-card, .card, .stat-card');
  animateElements.forEach(el => {
    scrollObserver.observe(el);
  });
});

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUpSmooth {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeInUpSmooth 0.6s ease-out forwards;
  }
`;
document.head.appendChild(style);

window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

document.addEventListener('click', function(event) {
  const navbar = document.getElementById('mainNav');
  const navbarToggler = navbar.querySelector('.navbar-toggler');
  const navbarCollapse = navbar.querySelector('.navbar-collapse');

  if (navbarCollapse.classList.contains('show')) {
    if (!navbar.contains(event.target)) {
      navbarToggler.click();
    }
  }
});

if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}

if (isTouchDevice()) {
  document.body.classList.add('touch-device');
}

console.log('%c🚀 Velifa Tech - Website Loaded Successfully',
  'color: #B8944D; font-size: 16px; font-weight: bold;');
console.log('%cMás de 4 años impulsando la innovación tecnológica',
  'color: #1B3A5F; font-size: 12px;');
console.log('%cEmail: soluciones@velifatech.com | Tel: +51 951 879 501',
  'color: #5A9B9E; font-size: 11px;');
