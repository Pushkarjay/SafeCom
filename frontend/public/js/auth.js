document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle for auth pages
  const themeToggle = document.getElementById("theme-toggle")
  if (themeToggle) {
    const body = document.body
    const icon = themeToggle.querySelector("i")
    const text = themeToggle.querySelector("span")

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("safecom-theme")
    if (savedTheme === "dark") {
      body.classList.remove("light-theme")
      body.classList.add("dark-theme")
      if (icon && text) {
        icon.classList.remove("fa-moon")
        icon.classList.add("fa-sun")
        text.textContent = "Light Mode"
      }
    }

    // Toggle theme
    themeToggle.addEventListener("click", () => {
      if (body.classList.contains("light-theme")) {
        body.classList.remove("light-theme")
        body.classList.add("dark-theme")
        if (icon && text) {
          icon.classList.remove("fa-moon")
          icon.classList.add("fa-sun")
          text.textContent = "Light Mode"
        }
        localStorage.setItem("safecom-theme", "dark")
      } else {
        body.classList.remove("dark-theme")
        body.classList.add("light-theme")
        if (icon && text) {
          icon.classList.remove("fa-sun")
          icon.classList.add("fa-moon")
          text.textContent = "Dark Mode"
        }
        localStorage.setItem("safecom-theme", "light")
      }
    })
  }

  // Login form handling
  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // In a real app, you would send this data to a server
      console.log("Login attempt:", { email, password })

      // Simulate successful login
      localStorage.setItem("safecom-user", JSON.stringify({ email }))

      // Redirect to dashboard
      window.location.href = "dashboard.html"
    })
  }

  // Signup form handling
  const signupForm = document.getElementById("signup-form")
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirm-password").value

      // Validate passwords match
      if (password !== confirmPassword) {
        alert("Passwords do not match")
        return
      }

      // In a real app, you would send this data to a server
      console.log("Signup attempt:", { name, email, password })

      // Simulate successful signup
      localStorage.setItem("safecom-user", JSON.stringify({ name, email }))

      // Redirect to dashboard
      window.location.href = "dashboard.html"
    })
  }
})

