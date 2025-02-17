document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        console.log(data); // Registered user info
        // Redirect or other actions
      } else {
        alert(data.error || "Signup failed!");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while signing up.");
    }
  });
  