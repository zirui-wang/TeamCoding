import React from 'react';
import classNames from 'classnames';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/xcode';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 800
  }
});

const onChange = newValue => {};

const editor = props => {
  const { classes, className: classNameProp } = props;
  const className = classNames(classes.root, classNameProp);
  return (
    <AceEditor
      className={className}
      mode="javascript"
      theme="xcode"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      width="100%"
      editorProps={{ $blockScrolling: true }}
    />
  );
};

export default withStyles(styles)(editor);
