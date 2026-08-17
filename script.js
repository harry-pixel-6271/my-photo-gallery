const entryMusic = new Audio("./entry.mp4");
entryMusic.loop = true;
entryMusic.volume = 0.55;

const sectionSongs = {
  her: "./01_Her_Best_Images/her_pic.mp4",
  ugly: "./02_Her_Ugly_Images/ugly_pic.mpeg",
  friends: "./03_Her_Best_Friend/friends.mp4"
};

let currentMusic = entryMusic;

function playMusic() {
  if (currentMusic) currentMusic.play().catch(() => {});
}

function reveal(el) {
  if (!el) return;
  el.classList.remove("hidden");
}

function switchMusic(id) {
  const src = sectionSongs[id];
  if (!src) return;

  if (currentMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0;
  }

  currentMusic = new Audio(src);
  currentMusic.loop = true;
  currentMusic.volume = 0.55;
  playMusic();
}

// Try entry music immediately; mobile browsers may require a tap.
playMusic();
document.addEventListener("pointerdown", playMusic, { once: true });

// First surprise button
const startBtn = document.getElementById("startBtn");
if (startBtn) {
  startBtn.addEventListener("click", () => {
    playMusic();
    reveal(document.getElementById("message"));
    reveal(document.getElementById("chooser"));
    reveal(document.getElementById("last"));
    document.getElementById("message")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

// Three folders: switch sections on the SAME page.
document.querySelectorAll(".folder").forEach(button => {
  button.addEventListener("click", () => {
    const id = button.dataset.target;

    document.querySelectorAll(".album").forEach(section => {
      section.classList.add("hidden");
    });

    const target = document.getElementById(id);
    if (!target) return;

    target.classList.remove("hidden");
    switchMusic(id);

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// Back to folder chooser
document.querySelectorAll(".back").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".album").forEach(section => {
      section.classList.add("hidden");
    });

    const chooser = document.getElementById("chooser");
    if (chooser) {
      chooser.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    if (currentMusic !== entryMusic) {
      currentMusic.pause();
      entryMusic.currentTime = 0;
      currentMusic = entryMusic;
      playMusic();
    }
  });
});

// One More Surprise button
const lastBtn = document.getElementById("lastBtn");
if (lastBtn) {
  lastBtn.addEventListener("click", () => {
    const final = document.getElementById("final");
    const cadbury = document.getElementById("cadbury");

    reveal(final);
    if (cadbury) reveal(cadbury);

    setTimeout(() => {
      if (final) {
        final.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 100);
  });
}
