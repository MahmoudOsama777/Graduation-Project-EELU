document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".settings-card");
    const cancelBtn = document.querySelector(".btn-cancel");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Student preferences saved successfully! 💾");
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", function () {
            if (confirm("Are you sure you want to discard changes?")) {
                form.reset();
            }
        });
    }
});