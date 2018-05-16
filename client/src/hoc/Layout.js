import React from 'react';

const layout = props => {
  return (
    <div>
      <main>{props.children}</main>
    </div>
  );
};

export default layout;
