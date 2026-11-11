const bookingRequests = [
  {
    id: 1,
    student: "Ali Osama",
    major: "Computer Science",
    property: "Dokki apartment",
    start: "1 September 2026",
    period: "6 months"
  }
];

const properties = [
  {
    id: 1,
    title: "Premium apartment near the faculty complex",
    location: "Dokki",
    rooms: 3,
    capacity: 6,
    price: 3200,
    status: "available"
  }
];

function renderRequests() {
  const list = document.getElementById("requestList");
  const pill = document.querySelector(".pending-pill");
  if (!list) return;

  if (bookingRequests.length === 0) {
    list.innerHTML = `<p class="empty-state">No pending requests</p>`;
  } else {
    list.innerHTML = bookingRequests
      .map(
        (r) => `
          <div class="request-row" data-id="${r.id}">
            <div class="request-actions">
              <button class="btn-reject" type="button" data-action="reject">Reject</button>
              <button class="btn-accept" type="button" data-action="accept">Accept</button>
            </div>
            <div class="request-info">
              <p class="request-student">Student: ${r.student} (${r.major})</p>
              <p class="request-meta">Property: ${r.property} • Start: ${r.start} • Period: ${r.period}</p>
            </div>
          </div>
        `
      )
      .join("");
  }

  if (pill) {
    pill.textContent = `${bookingRequests.length} pending request${bookingRequests.length === 1 ? "" : "s"}`;
  }
}

function handleRequestAction(event) {
  const btn = event.target.closest("button[data-action]");
  if (!btn) return;

  const row = btn.closest(".request-row");
  const id = Number(row.dataset.id);
  const index = bookingRequests.findIndex((r) => r.id === id);
  if (index === -1) return;

  const action = btn.dataset.action;
  const student = bookingRequests[index].student;

  if (action === "accept") {
    alert(`Booking request from ${student} accepted (placeholder)`);
  } else {
    alert(`Booking request from ${student} rejected (placeholder)`);
  }

  bookingRequests.splice(index, 1);
  renderRequests();
}

function renderProperties() {
  const list = document.getElementById("propertyList");
  if (!list) return;

  list.innerHTML = properties
    .map(
      (p) => `
        <div class="property-row">
          <span class="status-pill ${p.status === "available" ? "status-available" : "status-booked"}">
            ${p.status === "available" ? "Available" : "Booked"}
          </span>
          <div class="property-info">
            <p class="property-title">${p.title}</p>
            <p class="property-meta">${p.location} • ${p.rooms} rooms (capacity: ${p.capacity} students) • EGP ${p.price.toLocaleString("en-US")}/month</p>
          </div>
        </div>
      `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderRequests();
  renderProperties();

  const requestList = document.getElementById("requestList");
  if (requestList) {
    requestList.addEventListener("click", handleRequestAction);
  }
});