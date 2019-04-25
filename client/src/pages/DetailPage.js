import React, { Component } from "react";
import { connect } from "react-redux";

import { distanceInWordsToNow } from "date-fns";

import { getQuestion } from "../actions/questions";
import { addAnswer, editAnswer, removeAnswer } from "../actions/answers";

import Loading from "../components/ui/Loading";
import CenterWrapper from "../components/layout/CenterWrapper";
import AnswerForm from "../components/forms/AnswerForm";
import AnswerList from "../components/ui/AnswerList";

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
      removeAnswer
    } = this.props;
    return (
      <div>
        {loading && (
          <CenterWrapper>
            <Loading />
          </CenterWrapper>
        )}
        {question && (
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
