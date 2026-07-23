document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const navLinks = document.querySelectorAll('.nav a');
  const sections = Array.from(document.querySelectorAll('main section'));
  const backToTopButton = document.querySelector('.back-to-top');
  let ticking = false;

  const setActiveLink = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        let current = '';

        sections.forEach((section) => {
          const top = section.offsetTop - 120;
          if (window.scrollY >= top) {
            current = section.id;
          }
        });

        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });

        ticking = false;
      });

      ticking = true;
    }
  };

  const toggleBackToTop = () => {
    if (backToTopButton) {
      backToTopButton.classList.toggle('visible', window.scrollY > 600);
    }
  };

  window.addEventListener('scroll', () => {
    setActiveLink();
    toggleBackToTop();
  }, { passive: true });

  setActiveLink();
  toggleBackToTop();

  if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const typingText = document.getElementById('typing-text');
  const words = ['Narkis', 'a Developer', 'a Learner'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];
    typingText.textContent = currentWord.slice(0, charIndex);

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(typeEffect, 120);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 70);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(typeEffect, 900);
    }
  }

  typeEffect();
});
