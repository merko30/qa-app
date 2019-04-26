import React, { PureComponent } from "react";

import Answer from "./Answer";

export default class AnswerList extends PureComponent {
  render() {
    const {
      answers,
      editAnswer,
      questionId,
      removeAnswer,
      loggedIn
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
              />
            );
          })}
      </div>
    );
  }
}
