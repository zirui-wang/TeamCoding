import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import ProblemList from '../components/problemList/ProblemList';
import NewProblem from '../components/newProblem/NewProblem';
import { fetchProblems, submitProblem } from '../store/actions';

const styles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column'
  },
  newProblem: {
    marginBottom: 10
  }
};

class Problems extends Component {
  componentDidMount() {
    this.props.fetchProblems();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NewProblem className={classes.newProblem} onSubmit={this.props.submitProblem}/>
        <ProblemList
          problems={this.props.problems}
          className={classes.problemList}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    problems: state.problems.problems
  };
};

export default connect(mapStateToProps, {
  fetchProblems,
  submitProblem
})(withStyles(styles)(Problems));
