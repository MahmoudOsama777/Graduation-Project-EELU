const verificationRequests = [
  {
    id: 1,
    name: "Mahmoud El Sayed Hassan",
    nationalId: "2990101XXXXXXXX",
    phone: "01112345678",
    requirements: [
      "Photo must be clear and match the full name and unique national ID",
      "Approval adds a Verified badge to the owner's profile and allow property listings",
      "Rejected owners cannot reapply with the same account; a new account is required"
    ]
  },
  {
    id: 2,
    name: "Dr. Sara Ali Ahmed",
    nationalId: "2980512XXXXXXXX",
    phone: "01098765432",
    requirements: [
      "Photo must be clear and match the full name and unique national ID",
      "Approval adds a Verified badge to the owner's profile and allow property listings",
      "Rejected owners cannot reapply with the same account; a new account is required"
    ]
  }
];

function renderRequests() {
  const list = document.getElementById("requestList");
  if (!list) return;

  if (verificationRequests.length === 0) {
    list.innerHTML = `<p class="landlord-meta">No pending verification requests</p>`;
    return;
  }

  list.innerHTML = verificationRequests
    .map(
      (r) => `
        <div class="request-row" data-id="${r.id}">
          <div class="request-left">
            <div class="request-actions">
              <button class="btn-reject" type="button" data-action="reject">Reject ✕</button>
              <button class="btn-approve" type="button" data-action="approve">Approve verification ✓</button>
            </div>
            <div class="request-requirements">
              <h4>Request approval requirements</h4>
              <ul>
                ${r.requirements.map((req) => `<li>${req}</li>`).join("")}
              </ul>
            </div>
          </div>

          <div class="request-right">
            <div class="landlord-info">
              <span class="pending-tag">Pending review</span>
              <p class="landlord-name">${r.name}</p>
              <p class="landlord-meta">National ID: ${r.nationalId} • Phone: ${r.phone}</p>
            </div>
            <p class="id-label">Attached national ID photo</p>
            <div class="id-placeholder">National ID photo</div>
          </div>
        </div>
      `
    )
    .join("");
}

function handleAction(event) {
  const btn = event.target.closest("button[data-action]");
  if (!btn) return;

  const row = btn.closest(".request-row");
  const id = Number(row.dataset.id);
  const index = verificationRequests.findIndex((r) => r.id === id);
  if (index === -1) return;

  const name = verificationRequests[index].name;
  const action = btn.dataset.action;

  if (action === "approve") {
    alert(`Verification approved for ${name} (placeholder)`);
  } else {
    alert(`Verification rejected for ${name} (placeholder)`);
  }

  verificationRequests.splice(index, 1);
  renderRequests();
}

document.addEventListener("DOMContentLoaded", () => {
  renderRequests();

  const list = document.getElementById("requestList");
  if (list) {
    list.addEventListener("click", handleAction);
  }
});