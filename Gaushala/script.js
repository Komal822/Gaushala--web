
  const slides = document.querySelectorAll('#hero-slides > div');
  let current = 0;

  function nextSlide() {
    slides[current].style.opacity = '0';
    current = (current + 1) % slides.length;
    slides[current].style.opacity = '1';
  }

  setInterval(nextSlide, 8000); // change image every 8 seconds

  function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    counters.forEach(counter => {
      let started = false;
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace('+', '');
        const inc = Math.ceil(target / speed);
        if (count < target) {
          counter.innerText = (count + inc) + '+';
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target + '+';
        }
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !started) {
            started = true;
            updateCount();
          }
        });
      }, { threshold: 0.5 });
      observer.observe(counter);
    });
  }
  // Call after page loads
  document.addEventListener("DOMContentLoaded", () => {
    initializeCounters();
    // Fix scroll offset for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').replace('#', '');
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          const yOffset = -80; // Adjust for header height
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("donate-popup");
    const closeBtn = document.getElementById("close-donate-popup");

    // Show popup after 9 seconds (only once per session)
    if (!sessionStorage.getItem("donatePopupShown")) {
      setTimeout(() => {
        popup.classList.remove("hidden");
        sessionStorage.setItem("donatePopupShown", "true");
      }, 9000);
    }

    // Close popup
    closeBtn.addEventListener("click", () => {
      popup.classList.add("hidden");
    });

    // Close when clicking outside
    popup.addEventListener("click", e => {
      if (e.target === popup) {
        popup.classList.add("hidden");
      }
    });
  });


  window.addEventListener("load", function () {
    setTimeout(function () {
      if (!sessionStorage.getItem("popupShown")) {
        const popup = document.getElementById("autoPopup");
        popup.classList.remove("hidden");
        popup.classList.add("flex");
        sessionStorage.setItem("popupShown", "true");
      }
    }, 9000); // 6 seconds delay
  });

  function closePopup() {
    document.getElementById("autoPopup").classList.add("hidden");
    document.getElementById("autoPopup").classList.remove("flex");
  }


 
  // Counter Animation on Scroll (0 to Target Number)
  const counters = document.querySelectorAll('.counter-number');
  let counterStarted = false;

  function startCounters() {
    if (counterStarted) return; // Run only once

    const section = document.getElementById('impact');
    const sectionTop = section.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    // Start animation when section is visible
    if (sectionTop < screenHeight - 100) {
      counterStarted = true;

      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;

        const speed = 200; // lower = faster animation
        const increment = target / speed;

        const updateCounter = () => {
          count += increment;

          if (count < target) {
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target.toLocaleString(); // adds 1,000 format
          }
        };

        updateCounter();
      });
    }
  }

  // Trigger on scroll and on load
  window.addEventListener('scroll', startCounters);
  window.addEventListener('load', startCounters);

  (function () {
    "use strict";

    // Disable Right Click (Context Menu)
    // document.addEventListener("contextmenu", function (e) {
    //   e.preventDefault();
    // }, false);

    // Disable Key Shortcuts for Inspect & View Source
    document.addEventListener("keydown", function (e) {

      // F12 (DevTools)
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // Ctrl + Shift + I (Inspect)
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        return false;
      }

      // Ctrl + Shift + J (Console)
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
        e.preventDefault();
        return false;
      }

      // Ctrl + Shift + C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        return false;
      }

      // Ctrl + U (View Source)
      if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
        return false;
      }

      // Ctrl + S (Save Page)
      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        return false;
      }
    });

    // Disable Drag & Drop (extra protection)
    document.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });

    // Disable Text Selection (optional strong protection)
    document.addEventListener("selectstart", function (e) {
      e.preventDefault();
    });

  })();


  



  // ✅ MOBILE NAVBAR TOGGLE
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', function () {
    const isOpen = !mobileMenu.classList.contains('hidden');

    if (isOpen) {
      mobileMenu.classList.add('hidden');
      if (menuIcon) {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
      }
    } else {
      mobileMenu.classList.remove('hidden');
      if (menuIcon) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
      }
    }
  });

  // Nav link click केल्यावर menu बंद
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      if (menuIcon) {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
      }
    });
  });
}



// ✅ MOBILE ACCORDION
document.querySelectorAll('.mobile-accordion-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const content = this.nextElementSibling;
    if (!content) return;
    const chevron = this.querySelector('i');
    content.classList.toggle('hidden');
    if (chevron) {
      chevron.style.transform = content.classList.contains('hidden') 
        ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  });
});