import React, { Component } from "react";
import PropTypes from "prop-types";

import Question from "../Question";

export default class QuestionList extends Component {
  static propTypes = {
    questions: PropTypes.array.isRequired,
    editQuestion: PropTypes.func.isRequired,
    removeQuestion: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired
  };

  render() {
    const {
      questions,
      editQuestion,
      removeQuestion,
      loggedIn,
      searchByTag
    } = this.props;
    return (
      <div className="row mt-5">
        {questions &&
          questions.map(q => {
            return (
              <Question
                question={q}
                key={q.id}
                editQuestion={editQuestion}
                removeQuestion={removeQuestion}
                loggedIn={loggedIn}
                searchByTag={searchByTag}
              />
            );
          })}
      </div>
    );
  }
}
