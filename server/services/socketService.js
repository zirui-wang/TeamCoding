const redisClient = require('../modules/redisClient');
const TIME_OUT_SECONDS = 3600;

module.exports = io => {
  const collaborations = []; // store collaboration events
  const socketIdToSessionId = []; // store a map from socketId to sessionId (which room a user are in);

  const sessionPath = '/temp_sessions';

  
  io.on('connection', socket => {
    let sessionId = socket.handshake.query['sessonId'];
    socketIdToSessionId[socket.id] = sessionId; // user(socket.id) are in sessionId room
    if (sessionId in collaborations) { // if sessionId room is currently under editing
      
      collaborations[sessionId]['participants'].push(socket.id);
    } else { // if sessionId room is not currently under editing
      redisClient.get(sessionPath + '/' + sessionId, data => {
        if (data) {
          console.log('session terminated previously: pulling back from Redis');
          collaborations[sessionId] = {
            cachedChangeEvents: JSON.parse(data),
            participants: []
          };
        } else {
          console.log('creating new session');
          collaborations[sessionId] = {
            cachedChangeEvents: [],
            participants: []
          };
        }
        collaborations[sessionId]['participants'].push(socket.id); // user(socket.id) is in sessionId room anyway
      });
    }

    const forwardEvents = (socketId, eventName, dataString) => {
      const sessionId = socketIdToSessionId[socketId];
      if (sessionId in collaborations) {
        const participants = collaborations[sessionId]['participants'];
        for (let i = 0; i < participants.length; i++) {
          if (socket.id != participants[i]) {
            io.to(participants[i]).emit(eventName, dataString);
          }
        }
      } else {
        console.log('WARNING: could not tie socket_id to any collaboration');
      }
    };

    socket.on('change', delta => {
      // console.log('change ' + socketIdToSessionId[socket.id] + ' ' + delta);
      const sessionId = socketIdToSessionId[socket.id];
      if (sessionId in collaborations) {
        collaborations[sessionId]['cachedChangeEvents'].push([
          'change',
          delta,
          Date.now()
        ]);
      }

      forwardEvents(socket.id, 'change', delta);
    });

    socket.on('cursorMove', cursor => {
      // console.log('cursorMove ' + socketIdToSessionId[socket.id] + ' ' + cursor);
      cursor = JSON.parse(cursor);
      cursor['socketId'] = socket.id;
      forwardEvents(socket.id, 'cursorMove', JSON.stringify(cursor));
    });

    socket.on('restoreBuffer', () => {
      const sessionId = socketIdToSessionId[socket.id];
      console.log('restoring buffer for session: ' + sessionId + ', socket: ' + socket.id);
      if(sessionId in collaborations){
        const changeEvents = collaborations[sessionId]['cachedChangeEvents'];
        for(let i = 0; i < changeEvents.length; i++){
          socket.emit(changeEvents[i][0], changeEvents[i][1]);
        }
      }
    })

    socket.on('disconnect', () => {
      let sessionId = socketIdToSessionId[socket.id];
      console.log('socket ' + socket.id + ' disconnected.');

      if (sessionId in collaborations) {
        const participants = collaborations[sessionId]['participants'];
        const index = participants.indexOf(socket.id);
        if (index >= 0) {
          participants.splice(index, 1);
          if (participants.length === 0) {
            console.log('last participant left. Storing in Redis');
            const key = sessionPath + '/' + sessionId;
            const value = JSON.stringify(
              collaborations[sessionId]['cachedChangeEvents']
            );
            redisClient.set(key, value, redisClient.redisPrint);
            redisClient.expire(key, TIME_OUT_SECONDS);
            delete collaborations[sessionId];
          }
        }
      }
    });
  });
};
