import React, { Component } from "react";
import { connect } from "react-redux";

import { distanceInWordsToNow } from "date-fns";

import { getQuestion } from "../actions/questions";
import { addAnswer, editAnswer, removeAnswer } from "../actions/answers";

import { Loading, AnswerList, Error } from "../components/ui";
import CenterWrapper from "../components/layout/CenterWrapper";
import AnswerForm from "../components/forms/AnswerForm";

class DetailPage extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { getQuestion } = this.props;
    getQuestion(id);
  }

  render() {
    const {
      question,
      loading,
      loggedIn,
      addAnswer,
      editAnswer,
      removeAnswer,
      error
    } = this.props;
    return (
      <div>
        {loading && (
          <CenterWrapper>
            <Loading />
          </CenterWrapper>
        )}
        {error && <Error error={error} />}
        {question && !error && !loading && (
          <div className="container mx-auto mt-5">
            <h3 style={{ wordBreak: "break-word" }}>{question.text}</h3>
            <div>
              <span className="badge">
                {distanceInWordsToNow(question.createdAt)} ago
              </span>
              <div className="pull-right">
                <p>by {question.user.name}</p>
              </div>
            </div>
            <AnswerForm
              onSubmit={addAnswer}
              mode="add"
              loggedIn={loggedIn}
              questionId={question.id}
            />
            <AnswerList
              removeAnswer={removeAnswer}
              answers={question.answers}
              editAnswer={editAnswer}
              questionId={question.id}
              loggedIn={loggedIn}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  questions: { question, loading, error },
  auth: { loggedIn }
}) => ({
  question,
  loading,
  error,
  loggedIn
});

export default connect(
  mapStateToProps,
  { getQuestion, addAnswer, editAnswer, removeAnswer }
)(DetailPage);
