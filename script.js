const list = document.getElementById("internshipList");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

async function loadInternships() {
    try {
        const response = await fetch("/api/internships");

        if (!response.ok) {
            throw new Error("Failed to load internships");
        }

        const internships = await response.json();

        loading.style.display = "none";

        internships.forEach((internship) => {
            const card = document.createElement("div");
            card.className = "internship-card";

            card.innerHTML = `
                <h3>${internship.title}</h3>
                <p>Company: ${internship.company}</p>
                <p>Domain: ${internship.domain}</p>
                <p>Location: ${internship.location}</p>
                <hr>
            `;

            list.appendChild(card);
        });
    } catch (err) {
        loading.style.display = "none";
        error.style.display = "block";
    }
}

loadInternships();

const form = document.getElementById("applicationForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const internship = document.getElementById("internship").value.trim();

    if (!name || !email || !internship) {
        formMessage.textContent = "Please fill all fields.";
        return;
    }

    try {
        const response = await fetch("/api/applications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                internship
            })
        });

        const data = await response.json();

        if (!response.ok) {
            formMessage.textContent = data.error || "Application failed.";
            return;
        }

        formMessage.textContent = "Application submitted successfully!";
        form.reset();
    } catch (err) {
        formMessage.textContent = "Server error. Please try again.";
    }
});