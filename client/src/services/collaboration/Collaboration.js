import io from 'socket.io-client';

export default class Collaboration {
  constructor(editor, sessionID) {
    this.editor = editor;
    this.socket = io('http://localhost:5000', {
      query: 'sessonId=' + sessionID
    });
  }

  subscribe = () => {
    this.socket.on('change', delta => {
      // console.log('collaboration: editor changes by ' + delta);
      delta = JSON.parse(delta);
      this.editor.lastAppliedChange = delta;
      this.editor
        .getSession()
        .getDocument()
        .applyDeltas([delta]);
    });
  };

  change = delta => {
    this.socket.emit('change', delta);
  };
}
