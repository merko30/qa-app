import React, { Component } from "react";
import { connect } from "react-redux";

import QuestionList from "../components/ui/QuestionList";
import {
  getQuestions,
  removeQuestion,
  editQuestion
} from "../actions/questions";
import CenterWrapper from "../layout/CenterWrapper";
import Loading from "../components/Loading";
import Error from "../components/Error";

export class QuestionContainer extends Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const {
      questions,
      loading,
      removeQuestion,
      editQuestion,
      loggedIn,
      error
    } = this.props;
    return (
      <div>
        {error && <Error error={error} />}

        {loading && (
          <CenterWrapper>
            <Loading />
          </CenterWrapper>
        )}
        {questions && (
          <QuestionList
            questions={questions}
            editQuestion={editQuestion}
            removeQuestion={removeQuestion}
            loggedIn={loggedIn}
          />
        )}
        <div>load more</div>
      </div>
    );
  }
}

const mapStateToProps = ({
  questions: { questions, loading, error },
  auth: { loggedIn }
}) => ({
  questions,
  loading,
  error,
  loggedIn
});

export default connect(
  mapStateToProps,
  { getQuestions, editQuestion, removeQuestion }
)(QuestionContainer);
