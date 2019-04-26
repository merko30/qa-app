import React, { PureComponent } from "react";

import Question from "./Question";

export default class QuestionList extends PureComponent {
  render() {
    const { questions, editQuestion, removeQuestion, loggedIn } = this.props;
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
              />
            );
          })}
      </div>
    );
  }
}
