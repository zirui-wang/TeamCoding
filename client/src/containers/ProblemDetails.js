import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import { fetchProblem } from '../store/actions';

class ProblemDetails extends Component {
  componentDidMount(){
    this.props.fetchProblem(this.props.match.params.id);
  }

  showProblem() {
    const problem = this.props.problem ? (
      <div>
        <Typography variant="title">{this.props.problem.title}</Typography>
        <Typography variant="body1">{this.props.problem.desc}</Typography>
      </div>
    ) : null;
    return problem;
  }

  render() {
    return <div>{this.showProblem()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    problem: state.problems.problem
  };
};

export default connect(mapStateToProps, { fetchProblem })(ProblemDetails);
