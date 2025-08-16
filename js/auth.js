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
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const submitBtn = loginForm.querySelector('button[type="submit"]')
      
      // Show loading state
      const originalText = submitBtn.textContent
      submitBtn.textContent = 'Logging in...'
      submitBtn.disabled = true

      try {
        const response = await fetch('https://safecom-backend-render-tempo.onrender.com/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (response.ok) {
          // Store user data and token
          localStorage.setItem("safecom-token", data.token)
          localStorage.setItem("safecom-user", JSON.stringify(data.user))
          
          // Redirect to dashboard
          window.location.href = "dashboard.html"
        } else {
          // Show error message
          alert(data.message || 'Login failed. Please try again.')
        }
      } catch (error) {
        console.error('Login error:', error)
        alert('Network error. Please check your connection and try again.')
      } finally {
        // Restore button state
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }
    })
  }

  // Signup form handling
  const signupForm = document.getElementById("signup-form")
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirm-password").value
      const submitBtn = signupForm.querySelector('button[type="submit"]')

      // Validate passwords match
      if (password !== confirmPassword) {
        alert("Passwords do not match")
        return
      }

      // Show loading state
      const originalText = submitBtn.textContent
      submitBtn.textContent = 'Creating account...'
      submitBtn.disabled = true

      try {
        const response = await fetch('https://safecom-backend-render-tempo.onrender.com/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password })
        })

        const data = await response.json()

        if (response.ok) {
          // Store user data and token
          localStorage.setItem("safecom-token", data.token)
          localStorage.setItem("safecom-user", JSON.stringify(data.user))
          
          // Redirect to dashboard
          window.location.href = "dashboard.html"
        } else {
          // Show error message
          alert(data.message || 'Registration failed. Please try again.')
        }
      } catch (error) {
        console.error('Signup error:', error)
        alert('Network error. Please check your connection and try again.')
      } finally {
        // Restore button state
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }
    })
  }
})

