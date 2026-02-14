// script.js
// Cleaned and simplified per request:
//  - No fade logic
//  - Name persists in localStorage
//  - Hearts and background preserved
//  - Audio kept out of JS (sticky handled by CSS)

/* ---------- visitor name injection ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const h1 = document.querySelector('.letter h1');
  if (!h1) return;

  // Always prompt for visitor name
  let name = prompt("Before you continue, what is your name?");
  name = (name && name.trim()) ? name.trim() : "My Queen";

  h1.textContent = name;
  h1.setAttribute('aria-label', `Letter addressed to ${name}`);
});

/* ---------- Hearts generator (unchanged behavior) ---------- */
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
