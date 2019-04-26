import React, { Component } from "react";
import { connect } from "react-redux";

import QuestionList from "../ui/QuestionList";
import {
  getQuestions,
  removeQuestion,
  editQuestion
} from "../../actions/questions";
import CenterWrapper from "../layout/CenterWrapper";
import Loading from "../ui/Loading";
import Error from "../ui/Error";

class QuestionContainer extends Component {
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
        {questions && (
          <QuestionList
            questions={questions}
            editQuestion={editQuestion}
            removeQuestion={removeQuestion}
            loggedIn={loggedIn}
          />
        )}
        {loading && (
          <CenterWrapper>
            <Loading />
          </CenterWrapper>
        )}
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
