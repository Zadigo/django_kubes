import { defineWebSocketHandler } from "h3"

export default defineWebSocketHandler((ws) => {
  ws.on("message", (message) => {
    // Echo the received message back to the client
    ws.send(`Server received: ${message}`)
  })

  ws.on("close", () => {
    console.log("WebSocket connection closed")
  })
})
