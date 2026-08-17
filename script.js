const start=document.getElementById("startBtn"),message=document.getElementById("message"),chooser=document.getElementById("chooser"),last=document.getElementById("last"),final=document.getElementById("final");
const music=new Audio("./01_Her_Best_Images/song.mp3");music.loop=true;music.volume=.55;
function play(){music.play().catch(()=>{})} play(); document.addEventListener("pointerdown",play,{once:true});
start.onclick=()=>{play();message.classList.remove("hidden");chooser.classList.remove("hidden");last.classList.remove("hidden");message.scrollIntoView({behavior:"smooth"})};
const songs={her:"./01_Her_Best_Images/song.mp3",ugly:"./02_Her_Ugly_Images/song.mp3",friends:"./03_Her_Best_Friend/song.mp3"};
document.querySelectorAll(".folder-btn").forEach(btn=>btn.onclick=()=>{chooser.classList.add("hidden");document.querySelectorAll(".album").forEach(x=>x.classList.add("hidden"));const a=document.getElementById(btn.dataset.target);a.classList.remove("hidden");music.pause();music.src=songs[btn.dataset.target];music.load();play();a.scrollIntoView({behavior:"smooth",block:"start"})});
document.querySelectorAll(".back").forEach(btn=>btn.onclick=()=>{btn.closest(".album").classList.add("hidden");chooser.classList.remove("hidden");chooser.scrollIntoView({behavior:"smooth"})});
document.getElementById("lastBtn").onclick=()=>{final.classList.remove("hidden");final.scrollIntoView({behavior:"smooth"});};
