import io from 'socket.io-client';
import { COLORS } from '../../assets/colors';
import { SERVER_CONFIG } from '../../config/keys';

export default class Collaboration {
  constructor(editor, sessionID, ace) {
    this.editor = editor;
    this.socket = io(SERVER_CONFIG.address, {
      query: 'sessonId=' + sessionID
    });
    this.clientsInfo = {};
    this.clientNum = 0;
    this.ace = ace;
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

    this.socket.on('cursorMove', cursor => {
      // console.log('cursor move: ' + cursor);
      let session = this.editor.getSession();
      cursor = JSON.parse(cursor);
      let x = cursor['row'];
      let y = cursor['column'];
      let changeClientId = cursor['socketId'];
      // console.log(x + ' ' + y + ' ' + changeClientId);
      if (changeClientId in this.clientsInfo) {
        session.removeMarker(this.clientsInfo[changeClientId]['marker']);
      } else {
        this.clientsInfo[changeClientId] = {};
        let css = document.createElement('style');
        css.type = 'text/css';
        css.innerHTML =
          '.editor_cursor_' +
          changeClientId +
          ' { position:absolute; background:' +
          COLORS[this.clientNum] +
          ';' +
          ' z-index: 100; width: 3px !important; }';
        document.body.appendChild(css);
        this.clientNum++;
      }
      let Range = this.ace.acequire('ace/range').Range;
      let newMarker = session.addMarker(
        new Range(x, y, x, y + 1),
        'editor_cursor_' + changeClientId,
        true
      );
      this.clientsInfo[changeClientId]['marker'] = newMarker;
    });
  };

  change = delta => {
    this.socket.emit('change', delta);
  };

  cursorMove = cursor => {
    this.socket.emit('cursorMove', cursor);
  };

  restoreBuffer = () => {
    this.socket.emit('restoreBuffer');
  };
}
