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

class QuestionContainer extends Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const { questions, loading, removeQuestion, editQuestion } = this.props;
    return (
      <div>
        {questions && (
          <QuestionList
            questions={questions}
            editQuestion={editQuestion}
            removeQuestion={removeQuestion}
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

const mapStateToProps = ({ questions: { questions, loading, error } }) => ({
  questions,
  loading,
  error
});

export default connect(
  mapStateToProps,
  { getQuestions, editQuestion, removeQuestion }
)(QuestionContainer);
