import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import ProblemDetails from '../components/problemDetail/ProblemDetail';
import Editor from './Editor';
import LanguageSelector from '../components/editor/LanguageSelector';
import BuildNRunResult from '../components/editor/BuildNRunResult';
import { fetchProblem, buildAndRun } from '../services/problems/Problems';
import Modal from '../components/UI/Modal';
import options from '../components/editor/languageFields';

import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    flexGrow: 1,
  },
  margin: {
    marginTop: 20
  }
};

class Problem extends Component {
  state = {
    showModal: false,
    problem: null,
    answer: null,
    lang: options[0].name,
    buildStatus: null,
    runResult: null
  };

  async componentDidMount() {
    const problem = await fetchProblem(this.props.match.params.id);
    this.setState({ problem: problem });
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
        handleSubmit={this.onSubmit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        title={title}
        content={content}
      />
    );
  }

  displayBuildNRunResult() {
    return (
      <BuildNRunResult
        build={this.state.buildStatus}
        run={this.state.runResult}
      />
    );
  }

  modalOpen = answer => {
    this.setState({ showModal: true, answer: answer });
  };

  modalClose = () => {
    this.setState({ showModal: false });
  };

  onChangeLanguage = event => {
    this.setState({ lang: event.target.value });
  };

  onSubmit = async () => {
    this.modalClose();
    const data = {
      user_code: this.state.answer,
      lang: this.state.lang
    };
    const result = await buildAndRun(data);
    const build = result['build'];
    const run = result['run'];
    this.setState({ buildStatus: build, runResult: run });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs sm/>
          <Grid item xs={12} sm={10}>
            {this.displayProblem(this.state.problem)}
            <LanguageSelector
              onChangeLanguage={this.onChangeLanguage}
              value={this.state.lang}
              options={options}
              className={classes.margin}
            />
            <Editor
              className={classes.margin}
              problemId={this.props.match.params.id}
              onModalOpen={this.modalOpen}
              lang={this.state.lang}
              onChangeLanguage={this.onChangeLanguage}
              options={options}
            />
            {this.displayBuildNRunResult()}
          </Grid>
          <Grid item xs sm/>
        </Grid>
        {this.displayModal()}
      </div>
    );
  }
}

export default connect(null, null)(withStyles(styles)(Problem));
