const CONFIG = {
  javaAddress: "frostvale.seedloaf.gg",
  discordInvite: "https://discord.gg/zsXkpkxPqH",

  // This uses a free public status API. If you later use your own API,
  // replace the URL in updateStatus().
  statusAddress: "frostvale.seedloaf.gg"
};

const toast = document.getElementById("toast");

document.querySelectorAll("[data-copy]").forEach(button => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast(`Copied ${value}`);
    } catch {
      showToast("Copy failed — select the IP manually.");
    }
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

async function updateStatus() {
  const dot = document.getElementById("statusDot");
  const text = document.getElementById("statusText");
  const count = document.getElementById("playerCount");

  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(CONFIG.statusAddress)}`, {
      cache: "no-store"
    });
    if (!res.ok) throw new Error("Status request failed");

    const data = await res.json();
    if (data.online) {
      dot.classList.add("online");
      dot.classList.remove("offline");
      text.textContent = "Server online";
      const online = data.players?.online ?? 0;
      const max = data.players?.max ?? "?";
      count.textContent = `${online} / ${max} players`;
    } else {
      dot.classList.add("offline");
      dot.classList.remove("online");
      text.textContent = "Server offline";
      count.textContent = "Start FrostVale to play";
    }
  } catch (err) {
    dot.classList.remove("online", "offline");
    text.textContent = "Status unavailable";
    count.textContent = "Try refreshing";
  }
}

updateStatus();
setInterval(updateStatus, 60000);
