import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProblemDetails extends Component {

  showProblem(){
    let problem = null;
    this.props.problems.forEach(element => {
      if(element.id === Number(this.props.match.params.id)){
        problem = (
          <div>
            {element.desc}
          </div>
        )
      }
    });
    return problem;
  }

  render() {
    return <div>{this.showProblem()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    problems: state.problems.problems
  };
};

export default connect(mapStateToProps)(ProblemDetails);
