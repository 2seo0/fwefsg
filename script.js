// Tabs
const tabs = document.querySelectorAll(".tabs button");
const panels = document.querySelectorAll(".tab-panel");
const tabContent = document.querySelector(".tab-content");
const buttonSound = new Audio('asset/button.mp3');

// Play button sound on every button press
document.addEventListener('DOMContentLoaded', () => {
    const allButtons = document.querySelectorAll('button');
  
    allButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Clone to allow overlapping clicks
        const clickSound = buttonSound.cloneNode();
        clickSound.play();
      });
    });
  });
  

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Activate tab button
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // Show correct content panel
    const selected = tab.textContent.toLowerCase();
    panels.forEach(panel => {
      panel.classList.toggle("active", panel.dataset.tab === selected);
    });

    // Add active-tab styling and set background color
    const colorKey = tab.dataset.color || selected;
    tabContent.classList.add("active-tab");
    tabContent.setAttribute("data-color", colorKey);
  });
});

// Screen transition
const openBtn = document.getElementById("open-button");
const openingScreen = document.getElementById("opening-screen");
const profileScreen = document.getElementById("profile-screen");
const flipSound = new Audio('asset/flip.mp3');

// When user clicks "OPEN YOUR DESIGNER"
openBtn.addEventListener("click", () => {
  openingScreen.classList.remove("visible");
  openingScreen.classList.add("hidden");
  profileScreen.classList.remove("hidden");
  profileScreen.classList.add("visible");

  // Store state in localStorage
  localStorage.setItem("designerUnlocked", "true");
});

// On page load: check if already opened
window.addEventListener("DOMContentLoaded", () => {
  const hasOpened = localStorage.getItem("designerUnlocked") === "true";

  if (hasOpened) {
    // Hide intro and show profile instantly
    openingScreen.classList.remove("visible", "js-hidden");
    openingScreen.classList.add("hidden");
    profileScreen.classList.remove("hidden");
    profileScreen.classList.add("visible");
  } else {
    // Reveal intro screen only if needed
    openingScreen.classList.remove("js-hidden");
    openingScreen.classList.add("visible");
  }
});

// Flip card only if clicking the container itself (not inner elements)
const flipContainer = document.querySelector(".card-flip-container");

if (flipContainer) {
flipContainer.addEventListener("click", (e) => {
    const isInteractive = e.target.closest("button, a, .tabs");
    if (!isInteractive) {
        flipContainer.classList.toggle("flipped");
        flipSound.play();
    }
    });
}

const track = document.querySelector('.carousel-track');
const prevBtn = document.getElementById('prev-card');
const nextBtn = document.getElementById('next-card');

let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * 100;
  track.style.transform = `translateX(${offset}%)`;
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % 3; // assuming 3 cards
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + 3) % 3;
  updateCarousel();
});
