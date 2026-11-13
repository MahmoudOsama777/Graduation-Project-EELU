const form = document.getElementById("propertyForm");
const studentsPerRoomInput = document.getElementById("studentsPerRoom");
const numberOfRoomsInput = document.getElementById("numberOfRooms");
const capacityOutput = document.getElementById("capacityOutput");
const photoInput = document.getElementById("photos");
const uploadZone = document.getElementById("uploadZone");
const photoPreview = document.getElementById("photoPreview");
const photoError = document.getElementById("photoError");
const formMessage = document.getElementById("formMessage");

const MAX_PHOTOS = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
let selectedPhotos = [];

function updateCapacity() {
  const students = Number(studentsPerRoomInput.value) || 0;
  const rooms = Number(numberOfRoomsInput.value) || 0;
  const total = students * rooms;
  capacityOutput.textContent = `${total} students (${rooms} rooms × ${students})`;
}

studentsPerRoomInput.addEventListener("input", updateCapacity);
numberOfRoomsInput.addEventListener("input", updateCapacity);

function showPhotoError(message = "") {
  photoError.textContent = message;
}

function renderPhotos() {
  photoPreview.innerHTML = "";

  selectedPhotos.forEach((file, index) => {
    const item = document.createElement("div");
    item.className = "preview-item";

    const image = document.createElement("img");
    image.src = URL.createObjectURL(file);
    image.alt = `Uploaded housing photo ${index + 1}`;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", `Remove photo ${index + 1}`);
    removeButton.addEventListener("click", () => {
      selectedPhotos.splice(index, 1);
      renderPhotos();
      syncFileInput();
    });

    item.append(image, removeButton);
    photoPreview.append(item);
  });
}

function syncFileInput() {
  const dataTransfer = new DataTransfer();
  selectedPhotos.forEach(file => dataTransfer.items.add(file));
  photoInput.files = dataTransfer.files;
}

function addPhotos(files) {
  showPhotoError("");
  const incomingFiles = Array.from(files);

  for (const file of incomingFiles) {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      showPhotoError("Please choose JPG or PNG images only.");
      continue;
    }
    if (file.size > MAX_FILE_SIZE) {
      showPhotoError(`${file.name} is larger than 5 MB.`);
      continue;
    }
    if (selectedPhotos.length >= MAX_PHOTOS) {
      showPhotoError("You can upload a maximum of 5 photos.");
      break;
    }
    if (!selectedPhotos.some(existing => existing.name === file.name && existing.size === file.size)) {
      selectedPhotos.push(file);
    }
  }

  renderPhotos();
  syncFileInput();
}

photoInput.addEventListener("change", event => addPhotos(event.target.files));

["dragenter", "dragover"].forEach(eventName => {
  uploadZone.addEventListener(eventName, event => {
    event.preventDefault();
    uploadZone.classList.add("drag-over");
  });
});

["dragleave", "drop"].forEach(eventName => {
  uploadZone.addEventListener(eventName, event => {
    event.preventDefault();
    uploadZone.classList.remove("drag-over");
  });
});

uploadZone.addEventListener("drop", event => addPhotos(event.dataTransfer.files));
uploadZone.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    photoInput.click();
  }
});

form.addEventListener("submit", event => {
  event.preventDefault();
  formMessage.className = "form-message";

  if (!form.reportValidity()) return;

  if (selectedPhotos.length === 0) {
    showPhotoError("Please upload at least one housing photo.");
    photoInput.focus();
    return;
  }

  const formData = new FormData(form);
  const property = Object.fromEntries(formData.entries());
  property.photos = selectedPhotos.map(file => file.name);
  property.totalCapacity =
    Number(property.studentsPerRoom) * Number(property.numberOfRooms);

  // Demo behavior: connect this object to your project's API when the backend is ready.
  console.log("Property ready to publish:", property);

  formMessage.textContent =
    "Your property details are ready! Connect the Publish button to the project backend to save them.";
  formMessage.classList.add("success");
});

form.addEventListener("reset", () => {
  selectedPhotos = [];
  photoPreview.innerHTML = "";
  showPhotoError("");
  formMessage.textContent = "";
  formMessage.className = "form-message";
  setTimeout(updateCapacity, 0);
});

document.getElementById("backLink").addEventListener("click", event => {
  event.preventDefault();
  const shouldLeave = window.confirm("Return to the owner profile? Any unsaved changes will be lost.");
  if (shouldLeave) form.reset();
});

updateCapacity();