import React, { Component } from "react";
import PropTypes from "prop-types";

import Answer from "../Answer";

class AnswerList extends Component {
  static propTypes = {
    answers: PropTypes.array.isRequired,
    editAnswer: PropTypes.func.isRequired,
    questionId: PropTypes.number.isRequired,
    removeAnswer: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    like: PropTypes.func.isRequired,
    dislike: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired
  };

  render() {
    const {
      answers,
      editAnswer,
      questionId,
      removeAnswer,
      loggedIn,
      like,
      dislike,
      addComment
    } = this.props;

    return (
      <div className="mt-5 container">
        {answers &&
          answers.map(a => {
            return (
              <Answer
                answer={a}
                key={a.id}
                onSubmit={editAnswer}
                questionId={questionId}
                removeAnswer={removeAnswer}
                loggedIn={loggedIn}
                like={like}
                dislike={dislike}
                addComment={addComment}
              />
            );
          })}
      </div>
    );
  }
}

export default AnswerList;
