import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import ProblemDetails from '../components/problemDetail/ProblemDetail';
import Editor from '../components/editor/Editor';
import { fetchProblem } from '../store/actions';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';

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
  state = {
    showModal: false
  };

  componentDidMount() {
    this.props.fetchProblem(this.props.match.params.id);
  }

  displayProblem(problem) {
    const problemComp = problem ? (
      <div>
        <ProblemDetails problem={problem} />
      </div>
    ) : null;
    return problemComp;
  }

  displayModal() {
    const title = 'Warning!';
    const content = 'Are you sure to submit your code?';
    return (
      <Modal
        open={this.state.showModal}
        handleClose={this.modalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        title={title}
        content={content}
      />
    );
  }

  modalOpen = ()  => {
    this.setState({ showModal: true });
  }

  modalClose = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { classes, problem } = this.props;
    return (
      <div className={classes.root}>
        {this.displayProblem(problem)}
        <Editor
          className={classes.margin}
          problemId={problem ? problem.id : null}
        />
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
            onClick={this.modalOpen}
          >
            Submit
          </Button>
        </div>
        {this.displayModal()}
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
