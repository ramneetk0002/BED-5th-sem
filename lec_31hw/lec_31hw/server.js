const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8080 });

// Room storage: Map<roomId, Set<socket>>
const rooms = new Map();

wss.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('message', (msg) => {
    try {
      const data = JSON.parse(msg);
      const { type, payload } = data;

      if (type === 'join') {
        const { roomId } = payload;
        if (!rooms.has(roomId)) {
          rooms.set(roomId, new Set());
        }
        rooms.get(roomId).add(socket);
        socket.roomId = roomId;
        socket.send(`Joined room: ${roomId}`);
      }

      else if (type === 'chat') {
        const { roomId, message } = payload;
        const room = rooms.get(roomId);
        if (room) {
          room.forEach((s) => {
            if (s !== socket) {
              s.send(JSON.stringify({
                from: roomId,
                message: message
              }));
            }
          });
        } else {
          socket.send('Room does not exist.');
        }
      }

    } catch (error) {
      socket.send('Invalid message format');
    }
  });

  socket.on('close', () => {
    if (socket.roomId && rooms.has(socket.roomId)) {
      rooms.get(socket.roomId).delete(socket);
      if (rooms.get(socket.roomId).size === 0) {
        rooms.delete(socket.roomId);
      }
    }
  });
});