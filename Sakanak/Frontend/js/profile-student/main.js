const roommates = [
  {
    name: "Karim Ahmed",
    details: "Computer Science • Cairo University (from Giza)",
    initials: "KA"
  },
  {
    name: "Mostafa Ali",
    details: "Engineering • Cairo University (from Alexandria)",
    initials: "MA"
  }
];

function renderRoommates(list) {
  const grid = document.getElementById("roommatesGrid");
  if (!grid) return;

  grid.innerHTML = list
    .map(
      (r) => `
        <div class="roommate-card">
          <div>
            <p class="roommate-name">${r.name}</p>
            <p class="roommate-meta">${r.details}</p>
          </div>
          <div class="roommate-initials">${r.initials}</div>
        </div>
      `
    )
    .join("");
}

function setupCancelButton() {
  const btn = document.getElementById("cancelBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const confirmed = confirm("Are you sure you want to cancel this booking?");
    if (confirmed) {
      alert("Cancellation request sent (placeholder)");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderRoommates(roommates);
  setupCancelButton();
});