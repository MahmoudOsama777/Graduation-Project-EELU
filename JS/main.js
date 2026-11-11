document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("form-login");
    const studentForm = document.getElementById("form-student");
    const landlordForm = document.getElementById("form-landlord");
    const adminForm = document.getElementById("form-admin");
    const signupButton = document.getElementById("show-signup");
    const signupForms = [
        studentForm,
        landlordForm,
        adminForm
    ];
    function hideAllForms() {
        loginForm.classList.add("hidden");

        signupForms.forEach(form => {
            if (form) {
                form.classList.add("hidden");
            }
        });
    }
    function showLoginForm() {
        hideAllForms();
        loginForm.classList.remove("hidden");
    }
    signupButton.addEventListener("click", () => {

        const selectedRole = document.querySelector(
            'input[name="login_role"]:checked'
        ).value;

        hideAllForms();

        if (selectedRole === "student") {
            studentForm.classList.remove("hidden");
        }

        else if (selectedRole === "landlord") {
            landlordForm.classList.remove("hidden");
        }

        else if (selectedRole === "admin") {
            adminForm.classList.remove("hidden");
        }

    });

    const backButtons = document.querySelectorAll(".back-to-login");

    backButtons.forEach(button => {
        button.addEventListener("click", showLoginForm);
    });

    const allForms = document.querySelectorAll("form");

    allForms.forEach(form => {
        form.addEventListener("submit", event => {
            event.preventDefault();
            alert("Form submitted successfully!");
        });
    });

    const roleInputs = document.querySelectorAll(
        'input[name="login_role"]'
    );

    roleInputs.forEach(radio => {
        radio.addEventListener("change", toggleLoginInputs);
    });

});

function toggleLoginInputs() {

    const selectedRole = document.querySelector(
        'input[name="login_role"]:checked'
    ).value;

    const identifierLabel = document.getElementById(
        "login-identifier-label"
    );

    const identifierInput = document.getElementById(
        "login-identifier"
    );

    if (selectedRole === "student") {
        identifierLabel.textContent = "University Email";
        identifierInput.type = "email";
        identifierInput.placeholder = "student@university.edu.eg";
    }
    else if (selectedRole === "landlord") {
        identifierLabel.textContent = "National ID(14 Digit number)";
        identifierInput.type = "text";
        identifierInput.placeholder = "Enter your national ID";
    }

    else if (selectedRole === "admin") {
        identifierLabel.textContent = "Admin Username";
        identifierInput.type = "text";
        identifierInput.placeholder = "admin_username";
    }
}