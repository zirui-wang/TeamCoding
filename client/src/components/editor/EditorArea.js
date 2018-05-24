import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/theme/xcode';

const editorArea = props => {
  const { lang } = props;
  return (
    <AceEditor
      onLoad={editor => props.onInit(editor, props.problemId)}
      mode={lang}
      theme="xcode"
      onChange={(value, event) => props.onChange(value, event)}
      onCursorChange={(selection, event) =>
        props.onCursorChange(selection, event)
      }
      name="UNIQUE_ID_OF_DIV"
      width="100%"
      focus
      editorProps={{ $blockScrolling: true }}
    />
  );
};

export default editorArea;
