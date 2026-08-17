const startBtn=document.getElementById("startBtn");
const surprise=document.getElementById("surprise");
const gallery=document.getElementById("gallery");
const joke=document.getElementById("joke");
const final=document.getElementById("final");
const confettiBtn=document.getElementById("confettiBtn");
let audioStarted=false,audioCtx;

function reveal(el){el.classList.remove("hidden");requestAnimationFrame(()=>el.classList.add("show"))}

startBtn.addEventListener("click",()=>{
  reveal(surprise); reveal(gallery); reveal(joke); startBirthdayMusic(); launchConfetti(100);
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
  if(audioStarted)return; audioStarted=true;
  try{
    audioCtx=new(window.AudioContext||window.webkitAudioContext)();
    const notes=[[261.63,.28],[261.63,.28],[293.66,.55],[261.63,.55],[349.23,.55],[329.63,1],
                 [261.63,.28],[261.63,.28],[293.66,.55],[261.63,.55],[392,.55],[349.23,1]];
    let t=audioCtx.currentTime+.1;
    notes.forEach(([freq,duration])=>{
      const osc=audioCtx.createOscillator(),gain=audioCtx.createGain();
      osc.type="sine";osc.frequency.value=freq;
      gain.gain.setValueAtTime(.0001,t);
      gain.gain.exponentialRampToValueAtTime(.08,t+.02);
      gain.gain.exponentialRampToValueAtTime(.0001,t+duration-.03);
      osc.connect(gain).connect(audioCtx.destination);osc.start(t);osc.stop(t+duration);t+=duration;
    });
  }catch(e){console.log("Audio unavailable:",e)}
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
