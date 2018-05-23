import React, { Component } from 'react';
import classNames from 'classnames';
import AceEditor from 'react-ace';
import Collaboration from '../../services/collaboration/Collaboration';

import 'brace/mode/javascript';
import 'brace/theme/xcode';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 800
  }
});

class Editor extends Component {
  state = {
    editor: null,
    collaboration: null
  };

  onInit = (editor, problemId) => {
    editor.lastAppliedChange = null;
    const collaboration = new Collaboration(editor, problemId);
    collaboration.subscribe();
    this.setState({
      editor: editor,
      collaboration: collaboration
    });
  };

  onChange = (value, event) => {
    // console.log('editor changes: ' + JSON.stringify(event));
    if (this.state.editor.lastAppliedChange !== event) {
      this.state.collaboration.change(JSON.stringify(event));
    }
  };

  render() {
    const { classes, className: classNameProp, problemId } = this.props;
    const className = classNames(classes.root, classNameProp);

    const editorComp = problemId ? (
      <AceEditor
        onLoad={editor => this.onInit(editor, problemId)}
        mode="javascript"
        theme="xcode"
        onChange={(value, event) => this.onChange(value, event)}
        name="UNIQUE_ID_OF_DIV"
        width="100%"
        focus
        editorProps={{ $blockScrolling: true }}
      />
    ) : null;

    return (
      <div className={className}>
        {editorComp}
      </div>
    )
  }
}

export default withStyles(styles)(Editor);
