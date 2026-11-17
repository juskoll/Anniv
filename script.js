
/* ==========================================
   ANNIVERSARY WEBSITE JAVASCRIPT
   Pastel Coquette Theme ♡
========================================== */


/* 1. PERSONALIZATION */

// Anniversary starting date
const ANNIVERSARY_DATE = "2025-11-18";

// Your personal anniversary letter
const LOVE_LETTER = `Dear Shenna,

It’s crazy to imagine that we were once strangers sitting in the same room for almost a decade, but it’s even harder to imagine how that opportunity turned us into something greater. Your sweet and gentle ambience pulled my heartstrings to you just like a yoyo. 

The smile that you always show is that most precious thing that my eyes perceive. Why, you ask? You have suffered countless hardships, sadness, disappointment, and misfortune. And yet, you still find a way to smile in spite of that by seeing the good in everything. I love how you still treat others so kindly because of the compassion you share with people unconditionally.

Every single day of my life has been so amazing with you. I thank God for making fate bring us together. I can’t imagine a day in my life without you, which is surprising because I expected that I would just be admiring you quietly, with all of my feelings unreciprocated till the very end.

Every single muscle in my heart pumps out blood all for the sake of seeing your sweet smile day by day.

I’m so happy to be a part of your life. One year will never be enough for me. I want us to grow old together. I love you, Shenna.

With love,
me ♡`;

// Enable or disable falling flowers
const ENABLE_FALLING_FLOWERS = true;


/* 2. GET WEBSITE ELEMENTS */

const openButton = document.getElementById("openLetter");
const intro = document.getElementById("intro");
const letterSection = document.getElementById("letterSection");

const letterText = document.getElementById("letterText");
const todayDate = document.getElementById("todayDate");

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

const flowerLayer = document.getElementById("flowerLayer");


/* 3. OPEN THE ENVELOPE */

let letterOpened = false;

openButton.addEventListener("click", function () {

  if (letterOpened) return;

  letterOpened = true;

  openButton.classList.add("opened");

  setTimeout(function () {

    intro.classList.add("leaving");

    setTimeout(function () {

      intro.classList.add("hidden");

      letterSection.classList.remove("hidden");

      // Display today's date
      todayDate.textContent = new Date().toLocaleDateString(
        undefined,
        {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      );

      // Start the letter animation
      startTyping();

      // Start anniversary counter
      updateCounter();

      setInterval(updateCounter, 1000);

      // Start falling flowers
      if (ENABLE_FALLING_FLOWERS) {
        startFlowers();
      }

      letterSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }, 650);

  }, 650);

});


/* 4. TYPING ANIMATION */

let typingTimer;

function startTyping() {

  let index = 0;

  letterText.textContent = "";

  clearInterval(typingTimer);

  typingTimer = setInterval(function () {

    letterText.textContent += LOVE_LETTER.charAt(index);

    index++;

    if (index >= LOVE_LETTER.length) {
      clearInterval(typingTimer);
    }

  }, 24);

}


/* 5. ANNIVERSARY COUNTER */

function updateCounter() {

  // Start date: November 18, 2025
  const startDate = new Date(
    ANNIVERSARY_DATE + "T00:00:00"
  );

  const currentDate = new Date();

  if (isNaN(startDate.getTime())) {
    console.error("Invalid anniversary date!");
    return;
  }

  // Prevent negative counter values
  let difference = Math.max(
    0,
    currentDate.getTime() - startDate.getTime()
  );

  const totalSeconds = Math.floor(difference / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;


  // Display counter
  document.getElementById("days").textContent = days;

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");


  // Anniversary caption
  const years = Math.floor(days / 365);

  const remainingDays = days % 365;

  const caption = years > 0
    ? `${years} year${years === 1 ? "" : "s"} and ${remainingDays} days of memories ♡`
    : `${days} days of memories and counting ♡`;

  document.getElementById("counterCaption").textContent =
    caption;

}


/* 6. FALLING FLOWERS */

let flowersStarted = false;

function startFlowers() {

  if (flowersStarted) return;

  flowersStarted = true;

  const flowerSymbols = [
    "✿",
    "❀",
    "♡",
    "✾"
  ];

  setInterval(function () {

    const flower = document.createElement("span");

    flower.className = "falling-flower";

    flower.textContent =
      flowerSymbols[
        Math.floor(Math.random() * flowerSymbols.length)
      ];

    // Random horizontal position
    flower.style.left =
      Math.random() * 100 + "%";

    // Random flower size
    flower.style.fontSize =
      (14 + Math.random() * 17) + "px";

    // Random horizontal movement
    flower.style.setProperty(
      "--drift",
      (Math.random() * 150 - 75) + "px"
    );

    // Random falling speed
    flower.style.animationDuration =
      (7 + Math.random() * 7) + "s";

    flowerLayer.appendChild(flower);

    // Remove flower after animation
    setTimeout(function () {
      flower.remove();
    }, 15000);

  }, 850);

}


/* 7. BACKGROUND MUSIC */

musicButton.addEventListener("click", async function () {

  if (music.paused) {

    try {

      await music.play();

      musicButton.textContent =
        "♫ Pause our song";

    } catch (error) {

      console.error("Music could not play:", error);

      musicButton.textContent =
        "Add music.mp3 first";

    }

  } else {

    music.pause();

    musicButton.textContent =
      "♫ Play our song";

  }

});


/* 8. INITIALIZE WEBSITE */

console.log(
  "Your anniversary website is ready! ♡"
);

// Show the correct anniversary date immediately
updateCounter();
