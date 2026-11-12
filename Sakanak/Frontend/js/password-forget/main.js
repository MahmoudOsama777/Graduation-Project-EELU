document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("forgotForm");
  const input = document.getElementById("identifier");
  const fieldMsg = document.getElementById("fieldMsg");
  const submitBtn = document.getElementById("submitBtn");
  const successBox = document.getElementById("successBox");
  const successText = document.getElementById("successText");

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Egyptian mobile numbers: 010 / 011 / 012 / 015 followed by 8 digits (optionally +20 prefix)
  const MOBILE_RE = /^(?:\+?20|0)?1[0125]\d{8}$/;

  function showError(message) {
    input.classList.add("invalid");
    fieldMsg.textContent = message;
    successBox.hidden = true;
  }

  function clearError() {
    input.classList.remove("invalid");
    fieldMsg.textContent = "";
  }

  function validate(value) {
    if (!value) return "Please enter your email or mobile number.";
    const isEmail = EMAIL_RE.test(value);
    const isMobile = MOBILE_RE.test(value.replace(/[\s-]/g, ""));
    if (!isEmail && !isMobile) {
      return "Enter a valid email address or an Egyptian mobile number.";
    }
    return "";
  }

  // Hide the error as soon as the user starts typing again
  input.addEventListener("input", clearError);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = input.value.trim();
    const error = validate(value);
    if (error) {
      showError(error);
      input.focus();
      return;
    }

    clearError();
    submitBtn.disabled = true;
    submitBtn.classList.add("loading");

    // Simulated request – replace with a real fetch() to your backend
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.classList.remove("loading");

      const target = EMAIL_RE.test(value) ? "email" : "mobile number";
      successText.textContent = `We sent a reset code to your ${target}. It may take a minute to arrive.`;
      successBox.hidden = false;
    }, 1200);
  });
});
