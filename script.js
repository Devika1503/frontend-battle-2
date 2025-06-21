// Loader Handling
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const body = document.querySelector('body');

  if (loader && body) {
    setTimeout(() => {
      loader.classList.add('loader-exit');
    }, 200);

    setTimeout(() => {
      loader.style.display = 'none';
      body.classList.remove('hidden');

      AOS.init({
        duration: 1000,
        once: true
      });

      const navbar = document.querySelector('.navbar');
      const hero = document.querySelector('.hero');
      if (navbar && hero) {
        const navHeight = navbar.offsetHeight;
        hero.style.paddingTop = navHeight + 40 + 'px';
      }

      if (typeof Swiper !== "undefined") {
        new Swiper('.swiper-container', {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
        });
      }

    }, 1200);
  }
});

// Sidebar Toggle
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('mobileSidebar');
const closeSidebar = document.getElementById('closeSidebar');

if (hamburger && sidebar && closeSidebar) {
  hamburger.addEventListener('click', () => {
    sidebar.classList.add('show');
  });

  closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('show');
  });

  window.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      sidebar.classList.remove('show');
    }
  });
}

// Custom Cursor Logic with Distance + Glow on Stop
const cursorCore = document.querySelector('.cursor-core');
const cursorShadow = document.querySelector('.cursor-shadow');

let mouseX = 0, mouseY = 0;
let shadowX = 0, shadowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (cursorCore) {
    cursorCore.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  }
});

function animateCursor() {
  shadowX += (mouseX - shadowX) * 0.1;
  shadowY += (mouseY - shadowY) * 0.1;

  if (cursorShadow) {
    cursorShadow.style.transform = `translate(${shadowX + 10}px, ${shadowY + 10}px)`; // offset to maintain distance
  }

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor Stop Glow Effect
let stopTimer;
document.addEventListener('mousemove', () => {
  clearTimeout(stopTimer);
  cursorCore?.classList.remove('stop-glow');
  cursorShadow?.classList.remove('stop-glow');

  stopTimer = setTimeout(() => {
    cursorCore?.classList.add('stop-glow');
    cursorShadow?.classList.add('stop-glow');
  }, 120);
});

// 3D Card Tilt Effect
const scene = document.querySelector(".scene");
const card = document.querySelector(".card3d");

if (scene && card) {
  scene.addEventListener("mousemove", (e) => {
    const rect = scene.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  });

  scene.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}

// Dynamically inject contact form (only on contact.html)
document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("dynamicForm");
  if (formContainer) {
    const formHTML = `
      <form class="contact-form fade-in-up" onsubmit="event.preventDefault(); alert('Your message has been sent!');">
        <div class="form-row">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
        </div>
        <div class="form-row">
          <input type="text" placeholder="Domain of Internship" required />
          <input type="text" placeholder="State" required />
        </div>
        <textarea placeholder="Message" rows="5" required></textarea>
        <button type="submit" class="btn-submit">Submit</button>
      </form>
    `;
    formContainer.innerHTML = formHTML;
  }
});


  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      item.classList.toggle('active');

      // Close other open FAQs
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });
    });
  });


