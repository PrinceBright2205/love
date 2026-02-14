// Prompt for name on each visit (no saving)
let name = prompt("Before you continue, what is your name?") || "My Queen";

// Select the H1 and inject name directly
const h1 = document.querySelector(".letter h1");
if (h1) {
  h1.textContent = name;
}


// ---------- Hearts IIFE runs after the name prompt ----------
(() => {
  const container = document.querySelector(".hearts");
  if (!container) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const colors = [
    "rgba(255, 182, 200, 0.85)",
    "rgba(255, 156, 184, 0.8)",
    "rgba(255, 210, 220, 0.75)"
  ];

  const settings = reduceMotion
    ? { initial: 6, interval: 1500, minDuration: 14, maxDuration: 20, drift: 30 }
    : { initial: 25, interval: 250, minDuration: 6, maxDuration: 10, drift: 70 };

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function spawnHeart() {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "❤";

    const size = Math.round(randomBetween(22, 64));
    const left = randomBetween(4, 96);
    const duration = randomBetween(settings.minDuration, settings.maxDuration);
    const drift = Math.round(randomBetween(-settings.drift, settings.drift));
    const color = colors[Math.floor(Math.random() * colors.length)];

    heart.style.setProperty("--size", `${size}px`);
    heart.style.setProperty("--duration", `${duration}s`);
    heart.style.setProperty("--drift", `${drift}px`);
    heart.style.left = `${left}%`;
    heart.style.color = color;

    container.appendChild(heart);

    heart.addEventListener("animationend", () => {
      heart.remove();
    });
  }

  for (let i = 0; i < settings.initial; i += 1) {
    setTimeout(spawnHeart, i * 200);
  }

  setInterval(spawnHeart, settings.interval);
})();

const letter = document.querySelector('.letter');
const audio = document.querySelector('.audio');

function updateLetterFade() {
  if (!letter || !audio) return;

  const audioTop = audio.offsetTop;
  const audioHeight = audio.offsetHeight;
  const scrollTop = window.scrollY;
  const letterRect = letter.getBoundingClientRect();

  // Distance from viewport top to bottom of audio
  const killZoneBottom = audioTop + audioHeight;

  // Calculate how much the letter's top is inside the kill zone
  const overlap = killZoneBottom - letterRect.top;

  if (overlap > 0) {
    // Fade out proportionally
    const opacity = Math.max(0, 1 - overlap / letterRect.height);
    letter.style.opacity = opacity;
  } else {
    letter.style.opacity = 1;
  }
}

// Run on scroll
window.addEventListener('scroll', updateLetterFade);
// Initial check
updateLetterFade();
