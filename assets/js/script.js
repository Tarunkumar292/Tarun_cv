//  Navbar Menu
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');

menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('hidden');
});

// tailwind
tailwind.config = {
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1.5s ease-in-out",
        slideIn: "slideIn 1s ease-out",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideIn: {
          '0%': { transform: 'translateY(30px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      }
    }
  }
}

// Hero section
// Initialize Particles.js
document.addEventListener('DOMContentLoaded', function () {
  if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#4fd1c5" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#4fd1c5",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          out_mode: "out"
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.5 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }

  const texts = [
    "responsive web applications",
    "beautiful user interfaces",
    "seamless user experiences",
    "modern React applications",
    "mobile-first websites"
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeText() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
  }

  typeText();

  const card = document.getElementById('tilt-card');
  if (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      card.style.transform = `perspective(1000px) rotateX(${-deltaY * 10}deg) rotateY(${deltaX * 10}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  }
});

// skills section
// Initialize progress bars
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    document.querySelectorAll('.skill-item').forEach(function (skill) {
      const level = skill.getAttribute('data-skill-level');
      const progressBar = skill.querySelector('.skill-progress');
      progressBar.style.width = level + '%';
    });
  }, 500);

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      filterButtons.forEach(function (btn) {
        btn.classList.remove('active');
      });
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');
      const skills = document.querySelectorAll('.skill-item');

      skills.forEach(function (skill) {
        skill.classList.remove('hidden-skill', 'animate-in');
      });

      setTimeout(function () {
        skills.forEach(function (skill) {
          const category = skill.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            skill.classList.add('animate-in');
            skill.classList.remove('hidden-skill');
          } else {
            skill.classList.add('hidden-skill');
            skill.classList.remove('animate-in');
          }

          const level = skill.getAttribute('data-skill-level');
          const progressBar = skill.querySelector('.skill-progress');
          progressBar.style.width = '0';

          setTimeout(function () {
            if (filter === 'all' || category === filter) {
              progressBar.style.width = level + '%';
            }
          }, 300);
        });
      }, 100);
    });
  });
});

// experience section
document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.visibility = 'visible';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.anim-fadeInUp').forEach(item => {
    item.style.visibility = 'hidden';
    observer.observe(item);
  });

  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseover', function () {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });

    tag.addEventListener('mouseout', function () {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
});

// project section
// Animation for projects
document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const grid = document.getElementById('projects-grid');
        grid.classList.add('animate-fadeIn');
        grid.classList.remove('opacity-0');

        const projects = grid.querySelectorAll('.group');
        projects.forEach((project, index) => {
          setTimeout(() => {
            project.classList.add('animate-scaleIn');
          }, 150 * index);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(document.getElementById('projects'));

  const style = document.createElement('style');
  style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes scaleIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-scaleIn {
            animation: scaleIn 0.4s ease-out forwards;
        }
        
        /* Add subtle glow effect on hover */
        .group:hover {
            box-shadow: 0 0 20px rgba(45, 212, 191, 0.15);
        }
        
        /* Animate the title underline */
        .group:hover .border-b-4 {
            border-color: #2dd4bf;
            transition: border-color 0.3s ease;
        }
    `;
  document.head.appendChild(style);
});

// button animation
document.addEventListener('DOMContentLoaded', function () {
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const grid = document.getElementById('projects-grid');
        grid.classList.add('animate-fadeIn');
        grid.classList.remove('opacity-0');

        // Staggered animation for each project card
        const projects = grid.querySelectorAll('.group');
        projects.forEach((project, index) => {
          setTimeout(() => {
            project.classList.add('animate-scaleIn');
          }, 150 * index);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  // Start observing the projects section
  observer.observe(document.getElementById('projects'));

  // Add required animations to style
  const style = document.createElement('style');
  style.textContent = `
      @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
      }
      
      @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
      }
      
      @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
      }
      
      @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
      }
      
      .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
      }
      
      .animate-scaleIn {
          animation: scaleIn 0.4s ease-out forwards;
      }
      
      .pulse-animation {
          animation: pulse 2s infinite;
      }
      
      /* Add subtle glow effect on hover */
      .group:hover {
          box-shadow: 0 0 20px rgba(45, 212, 191, 0.15);
      }
      
      /* Animate the title underline */
      .group:hover .border-b-4 {
          border-color: #2dd4bf;
          transition: border-color 0.3s ease;
      }
      
      /* Button animations */
      .project-btn {
          position: relative;
          transition: all 0.3s ease;
      }
      
      .project-btn:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
          );
          transition: 0.5s;
      }
      
      .project-btn:hover:before {
          left: 100%;
      }
      
      .project-btn:active {
          transform: scale(0.95);
      }
  `;
  document.head.appendChild(style);
});

// experience page
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.experience-item').forEach(el => {
  observer.observe(el);
});
// skills page
document.addEventListener('DOMContentLoaded', function () {
  const revealSkillItems = function () {
    const items = document.querySelectorAll('.tech-mastery-item');
    const windowHeight = window.innerHeight;

    items.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;

      if (itemTop < windowHeight - 100) {
        setTimeout(() => {
          item.classList.add('reveal');

          setTimeout(() => {
            const bar = item.querySelector('.tech-mastery-bar');
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent + '%';
          }, 300);
        }, index * 150);
      }
    });
  };

  revealSkillItems();

  window.addEventListener('scroll', revealSkillItems);

  window.addEventListener('resize', revealSkillItems);
});

// contact page
const observer1 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.fade-in').forEach(el => {
  observer1.observe(el);
});

// about page
// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('bg-white/95', 'backdrop-blur-sm');
    navbar.classList.remove('bg-white');
  } else {
    navbar.classList.remove('bg-white/95', 'backdrop-blur-sm');
    navbar.classList.add('bg-white');
  }
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Header animation
  gsap.to('#main-title', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.to('#subtitle', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
  });

  // Skills title animation
  gsap.to('#skills-title', {
    scrollTrigger: {
      trigger: '#skills-title',
      start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  });

  // CTA section animations
  gsap.to('#cta-title', {
    scrollTrigger: {
      trigger: '#cta-title',
      start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.to('#cta-text', {
    scrollTrigger: {
      trigger: '#cta-text',
      start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out'
  });

  gsap.to('#cta-buttons', {
    scrollTrigger: {
      trigger: '#cta-buttons',
      start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.4,
    ease: 'power3.out'
  });

  // Timeline animations
  const timelineLine = document.querySelector('.timeline-line');
  gsap.to(timelineLine, {
    scrollTrigger: {
      trigger: timelineLine,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true
    },
    height: '100%',
    duration: 2,
    ease: 'power1.inOut'
  });

  // Education cards animations
  const educationCards = document.querySelectorAll('.education-card');
  educationCards.forEach((card, index) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * 0.2,
      ease: 'power3.out',
      onComplete: () => {
        // Animate timeline dots
        const dot = card.querySelector('.timeline-hexagon');
        if (dot) {
          gsap.to(dot, {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.7)'
          });
        }

        // Animate badges
        const badges = card.querySelectorAll('.badge');
        badges.forEach((badge, i) => {
          gsap.to(badge, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            delay: i * 0.1,
            ease: 'back.out(1.7)'
          });
        });

        // Animate progress bars
        const progressBar = card.querySelector('.progress-bar');
        if (progressBar) {
          const width = progressBar.getAttribute('data-width');
          gsap.to(progressBar, {
            width: width + '%',
            duration: 1.5,
            ease: 'power2.out'
          });
        }
      }
    });
  });
});

// Add scroll reveal animation to each section
const sections = document.querySelectorAll('section');
sections.forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    onEnter: () => section.classList.add('animate__animated', 'animate__fadeIn')
  });
});

// Animated counter for skills
function animateCounter(el, target, duration) {
  let startTime = null;
  const start = parseInt(el.textContent, 10) || 0;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const value = Math.floor(progress * (target - start) + start);

    el.textContent = value;

    if (progress < 1) {
      window.requestAnimationFrame(animation);
    }
  }

  window.requestAnimationFrame(animation);
}

// Hover effects for education cards
const cards = document.querySelectorAll('.hover-glow');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      y: -10,
      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)',
      duration: 0.3
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      y: 0,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      duration: 0.3
    });
  });
});

// footer
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

const reveals = document.querySelectorAll(".reveal");
const handleScroll = () => {
  const trigger = window.innerHeight * 0.9;
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < trigger) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);
