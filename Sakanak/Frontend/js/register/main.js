
document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("student-form");
    const landlordForm = document.getElementById("landlord-form");
    const studentTab = document.getElementById("tab-student");
    const landlordTab = document.getElementById("tab-landlord");
    const formTitle = document.getElementById("form-title");

    function switchRole(role) {
        const isStudent = role === "student";

        studentForm.classList.toggle("hidden", !isStudent);
        landlordForm.classList.toggle("hidden", isStudent);

        studentTab.classList.toggle("active", isStudent);
        landlordTab.classList.toggle("active", !isStudent);

        formTitle.textContent = isStudent
            ? "Student Sign Up"
            : "Landlord Sign Up";
    }

    studentTab.addEventListener("click", () => {
        switchRole("student");
    });

    landlordTab.addEventListener("click", () => {
        switchRole("landlord");
    });

    studentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const password = document.getElementById("student-password").value;
        const confirmPassword = document.getElementById("student-confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        alert("Student account created successfully!");
        studentForm.reset();
    });

    landlordForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const password = document.getElementById("landlord-password").value;
        const confirmPassword = document.getElementById("landlord-confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        alert("Your verification request has been submitted successfully!");
        landlordForm.reset();
    });

    switchRole("student");
});
