import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { distanceInWordsToNow } from "date-fns";

import "./question.css";

class Question extends PureComponent {
  render() {
    const {
      question: {
        text,
        createdAt,
        id,
        user: { name },
        answers
      }
    } = this.props;
    return (
      <div className="col-md-8 col-md-offset-2 col-sm-12 col-xs-12 mx-auto">
        <Link
          to={`/questions/${id}`}
          className="text-dark no-underline d-flex align-items-center justify-items-center"
        >
          <div className="p-2 text-center bg-warning rounded text-nowrap font-weight-bold">
            <h6>{answers.length}</h6>
            <p className="text-uppercase mb-0">Answers</p>
          </div>
          <h3 className="col-10 word-wrap my-2 pl-4 pr-0">{text}</h3>
        </Link>
        <p className="d-block text-right mt-2 px-2 rounded">
          asked by <strong>{name}</strong> {distanceInWordsToNow(createdAt)} ago
        </p>
      </div>
    );
  }
}

export default Question;
