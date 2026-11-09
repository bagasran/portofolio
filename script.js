/* ==========================================================================
   PORTOFOLIO - BAGAS RANDIKA PRATAMA
   Interactive JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. MOBILE MENU TOGGLE =====
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link, .nav-cv-btn').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // ===== 2. ACTIVE NAVBAR LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ===== 3. COPY EMAIL BUTTON (Sesuai Referensi Gambar 3) =====
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyBtnText = document.getElementById('copyBtnText');

  if (copyEmailBtn && copyBtnText) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.dataset.email || 'bagass.randika@gmail.com';

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for older browsers
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        const originalText = copyBtnText.textContent;
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #4ade80;"></i> <span id="copyBtnText" style="color: #4ade80;">Alamat email disalin!</span>';
        
        setTimeout(() => {
          copyEmailBtn.innerHTML = '<i class="fa-regular fa-copy"></i> <span id="copyBtnText">' + originalText + '</span>';
        }, 3000);

      } catch (err) {
        console.error('Gagal menyalin:', err);
      }
    });
  }

  // ===== 4. SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
