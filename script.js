const entryMusic=new Audio("./entry.mp4");
entryMusic.loop=true; entryMusic.volume=.55;
const sectionSongs={
  her:"./01_Her_Best_Images/her_pic.mp4",
  ugly:"./02_Her_Ugly_Images/ugly_pic.mpeg",
  friends:"./03_Her_Best_Friend/friends.mp4"
};
let currentMusic=entryMusic;

function playMusic(){ if(currentMusic) currentMusic.play().catch(()=>{}); }
playMusic();
document.addEventListener("pointerdown",playMusic,{once:true});

const start=document.getElementById("startBtn");
const message=document.getElementById("message");
const chooser=document.getElementById("chooser");
const last=document.getElementById("last");

function reveal(el){
  if(!el)return;
  el.classList.remove("hidden");
  requestAnimationFrame(()=>el.classList.add("show"));
}
if(start){
  start.onclick=()=>{
    playMusic();
    reveal(message);
    reveal(chooser);
    reveal(last);
    message.scrollIntoView({behavior:"smooth"});
  };
}

function switchMusic(id){
  const src=sectionSongs[id];
  if(!src)return;
  if(currentMusic){currentMusic.pause();currentMusic.currentTime=0;}
  currentMusic=new Audio(src);
  currentMusic.loop=true;
  currentMusic.volume=.55;
  playMusic();
}

document.querySelectorAll(".folder").forEach(button=>{
  button.addEventListener("click",()=>{
    const id=button.dataset.target;
    document.querySelectorAll(".memory-section").forEach(section=>section.classList.remove("active"));
    const target=document.getElementById(id);
    if(target){
      target.classList.add("active");
      switchMusic(id);
      target.scrollIntoView({behavior:"smooth",block:"start"});
    }
  });
});

document.querySelectorAll(".back").forEach(button=>{
  button.addEventListener("click",()=>{
    document.querySelectorAll(".memory-section").forEach(section=>section.classList.remove("active"));
    if(chooser)chooser.scrollIntoView({behavior:"smooth"});
    if(currentMusic!==entryMusic){
      currentMusic.pause();
      entryMusic.currentTime=0;
      currentMusic=entryMusic;
      playMusic();
    }
  });
});

const lastBtn=document.getElementById("lastBtn");
if(lastBtn){
  lastBtn.onclick=()=>{
    const final=document.getElementById("final");
    if(final){final.classList.add("active");final.scrollIntoView({behavior:"smooth",block:"start"});}
    const cadbury=document.getElementById("cadbury");
    if(cadbury){
      cadbury.classList.add("active");
      setTimeout(()=>cadbury.scrollIntoView({behavior:"smooth",block:"start"}),450);
    }
  };
}
