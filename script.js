const startBtn=document.getElementById("startBtn");
const surprise=document.getElementById("surprise");
const gallery=document.getElementById("gallery");
const joke=document.getElementById("joke");
const final=document.getElementById("final");
const confettiBtn=document.getElementById("confettiBtn");
let audioStarted=false,audioCtx;

function reveal(el){el.classList.remove("hidden");requestAnimationFrame(()=>el.classList.add("show"))}

startBtn.addEventListener("click",()=>{
  reveal(surprise); reveal(gallery); reveal(document.getElementById("media")); reveal(joke); startBirthdayMusic(); launchConfetti(100);
  setTimeout(()=>surprise.scrollIntoView({behavior:"smooth",block:"start"}),150);
});

confettiBtn.addEventListener("click",()=>{
  reveal(final); launchConfetti(160);
  setTimeout(()=>final.scrollIntoView({behavior:"smooth",block:"center"}),250);
});

function launchConfetti(count){
  const pieces=["🎉","✨","💖","🎊","⭐","🌸"];
  for(let i=0;i<count;i++){
    const el=document.createElement("div"); el.className="confetti";
    el.textContent=pieces[Math.floor(Math.random()*pieces.length)];
    el.style.left=Math.random()*100+"vw";
    el.style.fontSize=(10+Math.random()*14)+"px";
    el.style.animationDelay=Math.random()*.7+"s";
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),3500);
  }
}

// Original little birthday melody generated in the browser; no external audio file is needed.
function startBirthdayMusic(){
  const music=document.getElementById("birthdayMusic");
  if(!music) return;
  music.volume=0.55;
  music.play().catch(()=>console.log("Add music/angreza.mp3 to enable the song."));
}

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.display = "none";
    const fallback = document.createElement("div");
    fallback.className = "image-fallback";
    fallback.textContent = "📸 Photo unavailable";
    img.parentElement.appendChild(fallback);
  });
});
