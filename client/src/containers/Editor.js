import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Collaboration from '../services/collaboration/Collaboration';
import LanguageSelector from '../components/editor/LanguageSelector';
import EditorArea from '../components/editor/EditorArea';
import options from '../components/editor/languageFields';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 800
  },
  margin: {
    marginBottom: 20
  }
});

class Editor extends Component {
  state = {
    editor: null,
    collaboration: null,
    lang: options[1].name
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

  onCursorChange = (selection, event) => {
    const cursor = selection.getCursor();
    this.state.collaboration.cursorMove(JSON.stringify(cursor));
  };

  onChangeLanguage = event => {
    this.setState({ lang: event.target.value });
  };

  render() {
    const { classes, className: classNameProp, problemId } = this.props;
    const className = classNames(classes.root, classNameProp);

    const editorComp = problemId ? (
      <EditorArea
        lang={this.state.lang}
        onChange={this.onChange}
        onCursorChange={this.onCursorChange}
        onInit={this.onInit}
        problemId={problemId}
      />
    ) : null;

    return (
      <div className={className}>
        <LanguageSelector onChangeLanguage={this.onChangeLanguage} value={this.state.lang} options={options} className={classes.margin}/>
        {editorComp}
      </div>
    );
  }
}

export default withStyles(styles)(Editor);
