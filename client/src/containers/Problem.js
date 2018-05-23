import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import ProblemDetails from '../components/problemDetail/ProblemDetail';
import Editor from '../components/editor/Editor';
import { fetchProblem } from '../store/actions';

const styles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column'
  },
  margin: {
    marginTop: 20
  }
};

class Problem extends Component {
  componentDidMount() {
    this.props.fetchProblem(this.props.match.params.id);
  }

  showProblem() {
    const problem = this.props.problem ? (
      <div>
        <ProblemDetails problem={this.props.problem} />
      </div>
    ) : null;
    return problem;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.showProblem()}
        <Editor className={classes.margin} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    problem: state.problems.problem
  };
};

export default connect(mapStateToProps, { fetchProblem })(
  withStyles(styles)(Problem)
);
