import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Collaboration from '../services/collaboration/Collaboration';

import EditorArea from '../components/editor/EditorArea';
import Button from '../components/UI/Button';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 800
  },
  buttons: {
    float: 'right'
  },
  margin: {
    marginBottom: 20
  }
});

class Editor extends Component {
  constructor(props) {
    super(props);
    this.ace = null;
    this.editor = null;
    this.collaboration = null;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.problemId !== this.props.problemId;
  }

  onInit = (editor, problemId) => {
    editor.lastAppliedChange = null;
    const collaboration = new Collaboration(editor, problemId, this.ace);
    collaboration.subscribe();
    collaboration.restoreBuffer();
    this.editor = editor;
    this.collaboration = collaboration;
  };

  setAce = ace => {
    this.ace = ace;
  };

  onChange = (value, event) => {
    // console.log('editor changes: ' + JSON.stringify(event));
    if (this.editor.lastAppliedChange !== event) {
      this.collaboration.change(JSON.stringify(event));
    }
  };

  onCursorChange = (selection, event) => {
    const cursor = selection.getCursor();
    this.collaboration.cursorMove(JSON.stringify(cursor));
  };

  onResetEditor = () => {
    this.editor.setValue('');
  };

  render() {
    const { classes, className: classNameProp, problemId } = this.props;
    const className = classNames(classes.root, classNameProp);
    const editorComp = problemId ? (
      <EditorArea
        className={classes.margin}
        lang={this.props.lang}
        onChange={this.onChange}
        onCursorChange={this.onCursorChange}
        onInit={this.onInit}
        setAce={this.setAce}
        problemId={problemId}
      />
    ) : null;

    return (
      <div className={className}>
        {editorComp}
        <div className={classes.buttons}>
          <Button
            size="large"
            variant="outlined"
            color="secondary"
            onClick={this.onResetEditor}
          >
            Reset
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => this.props.onModalOpen(this.editor.getValue())}
            style={{ marginLeft: 10 }}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Editor);
