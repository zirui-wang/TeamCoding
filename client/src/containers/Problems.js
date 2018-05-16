import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProblemList from '../components/problemList/ProblemList';
import { fetchProblems } from '../store/actions';

class Problems extends Component {
  componentDidMount() {
    // this.props.fetchProblems();
  }

  render() {
    return <ProblemList problems={this.props.problems} />;
  }
}

const mapStateToProps = state => {
  return {
    problems: state.problems.problems
  };
};

export default connect(mapStateToProps, {
  fetchProblems
})(Problems);
