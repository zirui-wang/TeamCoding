module.exports = io => {
  const collaborations = [];
  const socketIdToSessionId = [];

  io.on('connection', socket => {
    let sessionId = socket.handshake.query['sessonId'];
    socketIdToSessionId[socket.id] = sessionId;
    if (!(sessionId in collaborations)) {
      collaborations[sessionId] = {
        participants: []
      };
    }
    collaborations[sessionId]['participants'].push(socket.id);

    const forwardEvents = (socketId, eventName, dataString) => {
      let sessionId = socketIdToSessionId[socketId];
      if (sessionId in collaborations) {
        let participants = collaborations[sessionId]['participants'];
        for (let i = 0; i < participants.length; i++) {
          if (socket.id != participants[i]) {
            io.to(participants[i]).emit(eventName, dataString);
          }
        }
      } else {
        console.log('WARNING: could not tie socket_id to any collaboration');
      }
    }

    socket.on('change', delta => {
      // console.log('change ' + socketIdToSessionId[socket.id] + ' ' + delta);
      forwardEvents(socket.id, 'change', delta);
    });

    socket.on('cursorMove', cursor => {
      // console.log('cursorMove ' + socketIdToSessionId[socket.id] + ' ' + cursor);
      cursor = JSON.parse(cursor);
      cursor['socketId'] = socket.id;
      forwardEvents(socket.id, 'cursorMove', JSON.stringify(cursor));
    });
  });
};
