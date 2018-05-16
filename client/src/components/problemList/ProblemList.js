import React from 'react';

const problemList = props => {
  const list = props.problems.map(problem => (
    <div key={problem.id}>{problem.title}</div>
  ));
  return <div>{list}</div>;
};

export default problemList;
