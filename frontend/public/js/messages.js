document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const conversationList = document.querySelector(".conversation-list")
  const messagesList = document.querySelector(".messages-list")
  const messageForm = document.getElementById("message-form")
  const messageInput = document.getElementById("message-input")
  const conversationTitle = document.querySelector(".conversation-title")
  const conversationStatus = document.querySelector(".conversation-status")

  // Sample data
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "img/avatar.svg",
      status: "online",
      lastMessage: "Can you help me with the server maintenance task?",
      time: "10:30 AM",
      unread: 2,
    },
    {
      id: 2,
      name: "Mike Wilson",
      avatar: "img/avatar.svg",
      status: "offline",
      lastMessage: "I completed the network security audit.",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "Lisa Brown",
      avatar: "img/avatar.svg",
      status: "online",
      lastMessage: "When is the team meeting scheduled?",
      time: "Yesterday",
      unread: 1,
    },
    {
      id: 4,
      name: "David Clark",
      avatar: "img/avatar.svg",
      status: "offline",
      lastMessage: "The software update is ready for deployment.",
      time: "Monday",
      unread: 0,
    },
    {
      id: 5,
      name: "Team Safecom",
      avatar: "img/logo.svg",
      status: "online",
      lastMessage: "Welcome to the Safecom platform!",
      time: "Last week",
      unread: 0,
    },
  ]

  const messages = {
    1: [
      {
        id: 1,
        sender: "Sarah Johnson",
        content: "Hi there! I need some help with the server maintenance task.",
        time: "10:15 AM",
        isMe: false,
      },
      {
        id: 2,
        sender: "Me",
        content: "Sure, what do you need help with?",
        time: "10:20 AM",
        isMe: true,
      },
      {
        id: 3,
        sender: "Sarah Johnson",
        content: "I'm not sure how to proceed with the database backup. Can you guide me through the process?",
        time: "10:25 AM",
        isMe: false,
      },
      {
        id: 4,
        sender: "Sarah Johnson",
        content: "Also, do we need to notify the users before starting the maintenance?",
        time: "10:30 AM",
        isMe: false,
      },
    ],
    2: [
      {
        id: 1,
        sender: "Mike Wilson",
        content: "I've completed the network security audit.",
        time: "Yesterday",
        isMe: false,
      },
      {
        id: 2,
        sender: "Me",
        content: "Great job! Did you find any issues?",
        time: "Yesterday",
        isMe: true,
      },
      {
        id: 3,
        sender: "Mike Wilson",
        content: "Yes, I found a few vulnerabilities. I've documented them in the report.",
        time: "Yesterday",
        isMe: false,
      },
    ],
  }

  // Functions
  function renderConversations() {
    if (!conversationList) return

    conversationList.innerHTML = ""

    conversations.forEach((conversation) => {
      const conversationItem = document.createElement("div")
      conversationItem.className = `conversation-item ${conversation.id === 1 ? "active" : ""}`
      conversationItem.dataset.id = conversation.id

      conversationItem.innerHTML = `
                <div class="conversation-avatar">
                    <img src="${conversation.avatar}" alt="${conversation.name}">
                    <span class="status-indicator ${conversation.status}"></span>
                </div>
                <div class="conversation-content">
                    <div class="conversation-header">
                        <h3>${conversation.name}</h3>
                        <span class="conversation-time">${conversation.time}</span>
                    </div>
                    <p class="conversation-last-message">${conversation.lastMessage}</p>
                </div>
                ${conversation.unread > 0 ? `<div class="conversation-badge">${conversation.unread}</div>` : ""}
            `

      conversationList.appendChild(conversationItem)

      // Add click event
      conversationItem.addEventListener("click", () => {
        // Update active conversation
        document.querySelectorAll(".conversation-item").forEach((item) => {
          item.classList.remove("active")
        })
        conversationItem.classList.add("active")

        // Clear unread badge
        const badge = conversationItem.querySelector(".conversation-badge")
        if (badge) {
          badge.remove()
          conversation.unread = 0
        }

        // Update conversation details
        if (conversationTitle) {
          conversationTitle.textContent = conversation.name
        }
        if (conversationStatus) {
          conversationStatus.textContent = conversation.status === "online" ? "Online" : "Offline"
          conversationStatus.className = `conversation-status ${conversation.status}`
        }

        // Load messages
        loadMessages(conversation.id)
      })
    })
  }

  function loadMessages(conversationId) {
    if (!messagesList) return

    messagesList.innerHTML = ""

    const conversationMessages = messages[conversationId] || []

    conversationMessages.forEach((message) => {
      const messageItem = document.createElement("div")
      messageItem.className = `message-item ${message.isMe ? "sent" : "received"}`

      messageItem.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${message.content}</div>
                    <div class="message-time">${message.time}</div>
                </div>
            `

      messagesList.appendChild(messageItem)
    })

    // Scroll to bottom
    messagesList.scrollTop = messagesList.scrollHeight
  }

  function sendMessage(content) {
    if (!content.trim()) return

    const activeConversation = document.querySelector(".conversation-item.active")
    if (!activeConversation) return

    const conversationId = Number.parseInt(activeConversation.dataset.id)

    // Create new message
    const newMessage = {
      id: Date.now(),
      sender: "Me",
      content,
      time: "Just now",
      isMe: true,
    }

    // Add to messages
    if (!messages[conversationId]) {
      messages[conversationId] = []
    }
    messages[conversationId].push(newMessage)

    // Update conversation last message
    const conversation = conversations.find((c) => c.id === conversationId)
    if (conversation) {
      conversation.lastMessage = content
      conversation.time = "Just now"
    }

    // Reload messages
    loadMessages(conversationId)

    // Simulate reply after 1-3 seconds
    if (conversationId === 1) {
      setTimeout(
        () => {
          const replyMessage = {
            id: Date.now() + 1,
            sender: "Sarah Johnson",
            content: "Thanks for the information! I'll get started right away.",
            time: "Just now",
            isMe: false,
          }

          messages[conversationId].push(replyMessage)
          loadMessages(conversationId)

          // Update conversation
          if (conversation) {
            conversation.lastMessage = replyMessage.content
            conversation.time = "Just now"
            conversation.unread = activeConversation.classList.contains("active") ? 0 : 1
          }

          // Update conversation list
          renderConversations()
        },
        Math.random() * 2000 + 1000,
      )
    }
  }

  // Event listeners
  if (messageForm) {
    messageForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const content = messageInput.value
      sendMessage(content)

      // Clear input
      messageInput.value = ""
    })
  }

  // Initialize
  renderConversations()
  loadMessages(1)
})

