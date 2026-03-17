document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Countdown Timer
  const weddingDate = new Date("June 4, 2026 18:00:00").getTime();

  const updateTimer = () => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff < 0) {
      clearInterval(timerInterval);
      const timerElement = document.getElementById("countdown-timer");
      if (timerElement) timerElement.innerHTML = "\u0547\u0576\u0578\u0580\u0570\u0561\u057E\u0578\u0580";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("minutes");
    const secsEl = document.getElementById("seconds");

    // Flip animation on change
    const update = (el, val) => {
      if (!el) return;
      const str = val.toString().padStart(2, "0");
      if (el.innerText !== str) {
        el.classList.add("flip");
        setTimeout(() => el.classList.remove("flip"), 400);
        el.innerText = str;
      }
    };

    update(daysEl, days);
    update(hoursEl, hours);
    update(minsEl, minutes);
    update(secsEl, seconds);
  };

  const timerInterval = setInterval(updateTimer, 1000);
  updateTimer();

  // Floating Hearts
  const heartsContainer = document.getElementById("floating-hearts");
  if (heartsContainer) {
    const hearts = ['\u2665', '\u2764', '\u2661'];
    const createHeart = () => {
      const heart = document.createElement("span");
      heart.className = "heart-particle";
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + "%";
      heart.style.fontSize = (Math.random() * 12 + 10) + "px";
      heart.style.animationDuration = (Math.random() * 5 + 6) + "s";
      heart.style.animationDelay = (Math.random() * 2) + "s";
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 12000);
    };
    setInterval(createHeart, 3000);
  }

  // Scroll reveal for description section
  const revealElements = document.querySelectorAll('.description-section .message-title, .description-section .message-text');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), index * 200);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  revealElements.forEach(el => observer.observe(el));

  // Background Music Logic
  const audio = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");
  let isPlaying = false;

  const playMusic = () => {
    if (audio && !isPlaying) {
      audio.play().then(() => {
        isPlaying = true;
        musicToggle.classList.add("playing");
      }).catch(err => {
        console.log("Autoplay blocked, waiting for interaction.");
      });
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      musicToggle.classList.remove("playing");
    } else {
      audio.play();
      isPlaying = true;
      musicToggle.classList.add("playing");
    }
  };

  if (musicToggle) {
    musicToggle.addEventListener("click", toggleMusic);
  }

  // Smart Autoplay - Start on first interaction if blocked
  window.addEventListener("scroll", playMusic, { once: true });
  window.addEventListener("click", playMusic, { once: true });
  window.addEventListener("touchstart", playMusic, { once: true });

  // Try playing immediately
  playMusic();
});
