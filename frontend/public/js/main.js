document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const createTaskBtn = document.querySelector(".create-task-btn")
  const createTaskModal = document.getElementById("create-task-modal")
  const closeModalBtn = document.querySelector(".close-modal")
  const cancelBtn = document.querySelector(".cancel-btn")
  const createTaskForm = document.getElementById("create-task-form")
  const overlay = document.getElementById("overlay")
  const notificationBtn = document.querySelector(".notification-btn")
  const notificationPanel = document.getElementById("notification-panel")
  const markAllReadBtn = document.querySelector(".mark-all-read")
  const sidebarToggle = document.querySelector(".sidebar-toggle")
  const sidebar = document.querySelector(".sidebar")
  const slotActionBtns = document.querySelectorAll(".slot-action-btn")
  const taskAcceptBtns = document.querySelectorAll(".accept-btn")

  // Functions
  function openModal() {
    createTaskModal.classList.add("active")
    overlay.classList.add("active")
  }

  function closeModal() {
    createTaskModal.classList.remove("active")
    overlay.classList.remove("active")
  }

  function toggleNotifications() {
    notificationPanel.classList.toggle("active")
    overlay.classList.toggle("active")
  }

  function markAllNotificationsAsRead() {
    const unreadNotifications = document.querySelectorAll(".notification-item.unread")
    unreadNotifications.forEach((notification) => {
      notification.classList.remove("unread")
    })

    // Update badge count
    const badge = notificationBtn.querySelector(".badge")
    badge.textContent = "0"
  }

  function toggleSidebar() {
    sidebar.classList.toggle("active")
  }

  function claimSlot(e) {
    const slot = e.target.closest(".task-slot")
    const slotTime = slot.querySelector(".slot-time").textContent

    // Update UI to show claimed slot
    slot.classList.remove("available")
    slot.classList.add("assigned")
    slot.querySelector(".slot-status").textContent = "Assigned to you"

    // Create a task name element
    const taskElement = document.createElement("div")
    taskElement.className = "slot-task"
    taskElement.textContent = "New Assignment"

    // Replace button with task name
    e.target.remove()
    slot.appendChild(taskElement)

    // Show notification
    showNotification(`You claimed the ${slotTime} time slot`)
  }

  function acceptTask(e) {
    const taskCard = e.target.closest(".task-card")
    const taskTitle = taskCard.querySelector("h3").textContent

    // Update UI
    const taskMeta = taskCard.querySelector(".task-meta")
    const assignee = taskMeta.querySelector(".task-assignee")
    assignee.innerHTML = '<i class="fas fa-user"></i> Assigned to: You'

    // Remove accept button
    e.target.remove()

    // Show notification
    showNotification(`You accepted the task "${taskTitle}"`)
  }

  function showNotification(message) {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = "notification-toast"
    notification.innerHTML = `
            <div class="notification-toast-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `

    // Add to body
    document.body.appendChild(notification)

    // Show notification
    setTimeout(() => {
      notification.classList.add("active")
    }, 100)

    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove("active")
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 3000)
  }

  // Event Listeners
  createTaskBtn.addEventListener("click", openModal)
  closeModalBtn.addEventListener("click", closeModal)
  cancelBtn.addEventListener("click", closeModal)
  overlay.addEventListener("click", () => {
    closeModal()
    notificationPanel.classList.remove("active")
    overlay.classList.remove("active")
  })

  notificationBtn.addEventListener("click", toggleNotifications)
  markAllReadBtn.addEventListener("click", markAllNotificationsAsRead)

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", toggleSidebar)
  }

  slotActionBtns.forEach((btn) => {
    btn.addEventListener("click", claimSlot)
  })

  taskAcceptBtns.forEach((btn) => {
    btn.addEventListener("click", acceptTask)
  })

  // Form submission
  createTaskForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const title = document.getElementById("task-title").value
    const description = document.getElementById("task-description").value
    const priority = document.getElementById("task-priority").value
    const deadline = document.getElementById("task-deadline").value
    const assignee = document.getElementById("task-assignee").value
    const timeSlot = document.getElementById("task-time-slot").value

    // In a real app, you would send this data to a server
    console.log({
      title,
      description,
      priority,
      deadline,
      assignee,
      timeSlot,
    })

    // Show success message
    showNotification(`Task "${title}" created successfully`)

    // Close modal and reset form
    closeModal()
    createTaskForm.reset()
  })

  // Add CSS for notification toast
  const style = document.createElement("style")
  style.textContent = `
        .notification-toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--success-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .notification-toast.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification-toast-content {
            display: flex;
            align-items: center;
        }
        
        .notification-toast-content i {
            margin-right: 10px;
        }
    `
  document.head.appendChild(style)
})

