import { io } from "socket.io-client"

const socket = io("http://localhost:3000")

socket.on("connect", () => {
  console.log("Connected", socket.id)

  socket.emit("joinRoom", "room-1")

  socket.emit("sendMessage", {
    roomId: "room-1",
    userId: "user-123",
    text: "Привет 👋"
  })
})

socket.on("newMessage", (msg) => {
  console.log("New message:", msg)
})
