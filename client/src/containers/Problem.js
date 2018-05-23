import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import ProblemDetails from '../components/problemDetail/ProblemDetail';
import Editor from '../components/editor/Editor';
import { fetchProblem } from '../store/actions';
import Button from '../components/UI/Button';

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

  showProblem(problem) {
    const problemComp = problem ? (
      <div>
        <ProblemDetails problem={problem} />
      </div>
    ) : null;
    return problemComp;
  }

  render() {
    const { classes, problem } = this.props;
    return (
      <div className={classes.root}>
        {this.showProblem(problem)}
        <Editor className={classes.margin} problemId={problem ? problem.id : null}/>
        <div>
          <Button
            size="large"
            variant="outlined"
            color="secondary"
            className={classes.margin}
          >
            Reset
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            className={classes.margin}
          >
            Submit
          </Button>
        </div>
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
