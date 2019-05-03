import React, { Component } from "react";
import { connect } from "react-redux";

import { distanceInWordsToNow } from "date-fns";

import { getQuestion } from "../actions/questions";
import { addAnswer, editAnswer, removeAnswer } from "../actions/answers";
import { like, dislike } from "../actions/likes";
import { addComment } from "../actions/comments";

import AnswerList from "../components/ui/AnswerList";
import Loading from "../components/Loading";
import Error from "../components/Error";
import CenterWrapper from "../layout/CenterWrapper";
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
      error,
      like,
      dislike,
      addComment
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
              like={like}
              dislike={dislike}
              addComment={addComment}
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
  {
    getQuestion,
    addAnswer,
    editAnswer,
    removeAnswer,
    like,
    dislike,
    addComment
  }
)(DetailPage);
