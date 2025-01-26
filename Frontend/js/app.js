// js/app.js

// API Base URL (update this to match your backend URL)
const API_BASE_URL = "http://localhost:5000/api";

// Fetch pins and display them
async function fetchPins() {
  try {
    const response = await fetch(`${API_BASE_URL}/pins/board/<boardId>`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual JWT token
      },
    });
    const pins = await response.json();

    const pinsContainer = document.getElementById("pins");
    pinsContainer.innerHTML = "";

    pins.forEach((pin) => {
      const pinCard = `
        <div class="pin-card">
          <img src="${pin.image}" alt="Pin" class="pin-image">
          <div class="pin-description">${pin.description}</div>
        </div>
      `;
      pinsContainer.innerHTML += pinCard;
    });
  } catch (error) {
    console.error("Error fetching pins:", error);
  }
}

// Call the fetchPins function when the page loads
document.addEventListener("DOMContentLoaded", fetchPins);
