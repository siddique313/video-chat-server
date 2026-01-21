export default function setupSocket(io, manager) {
  let USER_COUNT = 0;

  io.on("connection", (socket) => {
    USER_COUNT++;
    io.emit("user-count", USER_COUNT);
    console.log("Connected:", socket.id);

    socket.on("join", () => manager.addUser(socket));
    socket.on("offer", ({ roomId, offer }) =>
      manager.handleOffer(socket.id, roomId, offer),
    );
    socket.on("answer", ({ roomId, answer }) =>
      manager.handleAnswer(socket.id, roomId, answer),
    );
    socket.on("ice-candidates", ({ roomId, candidate }) =>
      manager.handleIceCandidates(socket.id, roomId, candidate),
    );
    socket.on("message", ({ roomId, message }) =>
      manager.handleMessage(socket.id, roomId, message),
    );
    socket.on("leaveRoom", () => manager.leaveRoom(socket.id));
    socket.on("disconnect", () => {
      USER_COUNT = Math.max(0, USER_COUNT - 1);
      io.emit("user-count", USER_COUNT);
      manager.disconnect(socket.id);
    });
  });
}
