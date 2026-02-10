// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('mainNav');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scroll navigation
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

// Active link tracking
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
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

// Contact form with Google Sheets
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

      showMessage('Enviando...', 'info');

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
      })
      .catch(() => {
        showMessage(
          'Hubo un error al enviar el formulario. Por favor, intenta nuevamente o contáctanos directamente a soluciones@velifatech.com',
          'error'
        );
      });
    });
  }

  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.style.transition = 'opacity 0.2s ease';
    formMessage.style.opacity = '1';
    formMessage.style.padding = '12px';
    formMessage.style.borderRadius = '6px';
    formMessage.style.fontSize = '0.9rem';

    if (type === 'success') {
      formMessage.style.background = '#ecfdf5';
      formMessage.style.border = '1px solid #a7f3d0';
      formMessage.style.color = '#065f46';
    } else if (type === 'info') {
      formMessage.style.background = '#f0f9ff';
      formMessage.style.border = '1px solid #bae6fd';
      formMessage.style.color = '#0c4a6e';
    } else {
      formMessage.style.background = '#fef2f2';
      formMessage.style.border = '1px solid #fecaca';
      formMessage.style.color = '#991b1b';
    }

    if (type !== 'info') {
      setTimeout(() => {
        formMessage.style.opacity = '0';
        setTimeout(() => {
          formMessage.textContent = '';
        }, 200);
      }, 4000);
    }
  }
});

// Scroll-triggered animations
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      scrollObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', function() {
  const animateElements = document.querySelectorAll('.service-card, .about-card, .solutions-card');
  animateElements.forEach(el => {
    scrollObserver.observe(el);
  });
});

// Close navbar on outside click (mobile)
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
