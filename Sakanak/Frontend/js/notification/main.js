document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("notifList");
  const badge = document.getElementById("newBadge");
  const bellDot = document.getElementById("bellDot");
  const markAllBtn = document.getElementById("markAllBtn");

  // Recalculate unread count and update badge, bell dot and button state
  function updateCounter() {
    const unread = list.querySelectorAll(".notif.unread").length;

    badge.textContent = `${unread} New`;
    badge.classList.toggle("hidden", unread === 0);
    bellDot.classList.toggle("hidden", unread === 0);
    markAllBtn.disabled = unread === 0;
  }

  // Turn a single notification into the "read" state
  function markAsRead(card) {
    card.classList.remove("unread", "accent-indigo", "accent-amber", "accent-green");
    card.classList.add("read");
    card.removeAttribute("data-unread");
  }

  // Click a card to mark it as read
  list.addEventListener("click", (e) => {
    const card = e.target.closest(".notif.unread");
    if (!card) return;
    markAsRead(card);
    updateCounter();
  });

  // Mark all as read
  markAllBtn.addEventListener("click", () => {
    list.querySelectorAll(".notif.unread").forEach(markAsRead);
    updateCounter();
  });

  updateCounter();
});
