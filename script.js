const SERVER = "frostvale.seedloaf.gg";
const toast = document.getElementById("toast");

document.querySelectorAll("[data-copy]").forEach(el => {
  el.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(el.dataset.copy);
      showToast(`Copied ${el.dataset.copy}`);
    } catch {
      showToast("Copy failed — select it manually.");
    }
  });
});

function showToast(message){
  if(!toast) return;
  toast.textContent=message;
  toast.classList.add("show");
  clearTimeout(window.__fvToast);
  window.__fvToast=setTimeout(()=>toast.classList.remove("show"),1700);
}

const menu=document.querySelector(".mobile-menu");
const links=document.querySelector(".nav-links");
if(menu && links){
  menu.addEventListener("click",()=>links.classList.toggle("open"));
  links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));
}

async function updateStatus(){
  const dot=document.getElementById("statusDot");
  const text=document.getElementById("statusText");
  const count=document.getElementById("playerCount");
  if(!dot || !text || !count) return;

  try{
    const r=await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(SERVER)}`,{cache:"no-store"});
    if(!r.ok) throw new Error("status");
    const d=await r.json();
    if(d.online){
      dot.classList.add("online");
      dot.classList.remove("offline");
      text.textContent="Server online";
      count.textContent=`${d.players?.online ?? 0} / ${d.players?.max ?? "?"} players`;
    }else{
      dot.classList.add("offline");
      dot.classList.remove("online");
      text.textContent="Server offline";
      count.textContent="Check Discord for status";
    }
  }catch{
    text.textContent="Status unavailable";
    count.textContent="Try refreshing";
  }
}
updateStatus();
setInterval(updateStatus,60000);
