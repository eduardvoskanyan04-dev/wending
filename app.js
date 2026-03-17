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
      if (timerElement) timerElement.innerHTML = "Շնորհավոր";
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

    if (daysEl) daysEl.innerText = days.toString().padStart(2, "0");
    if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, "0");
    if (minsEl) minsEl.innerText = minutes.toString().padStart(2, "0");
    if (secsEl) secsEl.innerText = seconds.toString().padStart(2, "0");
  };

  const timerInterval = setInterval(updateTimer, 1000);
  updateTimer();


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
