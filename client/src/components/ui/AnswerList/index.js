import React, { PureComponent } from "react";

import Answer from "../Answer";

class AnswerList extends PureComponent {
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
