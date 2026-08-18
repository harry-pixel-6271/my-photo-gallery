const start = document.getElementById("startBtn");
const message = document.getElementById("message");
const chooser = document.getElementById("chooser");
const last = document.getElementById("last");
const final = document.getElementById("final");

const music = new Audio();
music.loop = true;
music.preload = "auto";
music.volume = 1.0;

const songs = {
  entry: "./01_Her_Best_Images/song.mp3",
  her: "./01_Her_Best_Images/song.mp3",
  ugly: "./02_Her_Ugly_Images/song.mp3",
  friends: "./03_Her_Best_Friend/song.mp3"
};

function playSong(src) {
  if (!src) return;
  music.pause();
  music.src = src;
  music.load();
  music.volume = 1.0;
  music.play().catch(() => {});
}

start.onclick = () => {
  playSong(songs.entry);
  message.classList.remove("hidden");
  chooser.classList.remove("hidden");
  last.classList.remove("hidden");
  message.scrollIntoView({behavior:"smooth", block:"start"});
};

document.querySelectorAll(".folder-btn").forEach(btn => {
  btn.onclick = () => {
    const album = document.getElementById(btn.dataset.target);
    if (!album) return;

    chooser.classList.add("hidden");
    document.querySelectorAll(".album").forEach(x => x.classList.add("hidden"));
    album.classList.remove("hidden");

    playSong(songs[btn.dataset.target]);
    album.scrollIntoView({behavior:"smooth", block:"start"});
  };
});

document.querySelectorAll(".back").forEach(btn => {
  btn.onclick = () => {
    const album = btn.closest(".album");
    if (album) album.classList.add("hidden");
    chooser.classList.remove("hidden");
    playSong(songs.entry);
    chooser.scrollIntoView({behavior:"smooth", block:"start"});
  };
});

document.getElementById("lastBtn").onclick = () => {
  final.classList.remove("hidden");
  final.scrollIntoView({behavior:"smooth", block:"start"});

  const cadbury = document.getElementById("cadbury");
  if (cadbury) {
    cadbury.classList.add("active");
    setTimeout(() => cadbury.scrollIntoView({behavior:"smooth", block:"start"}), 450);
  }
};
