import React, { Component } from "react";
import { connect } from "react-redux";
import throttle from "lodash/throttle";

import { distanceInWordsToNow } from "date-fns";

import { getQuestion, getMoreAnswers } from "../actions/questions";
import { addAnswer, editAnswer, removeAnswer } from "../actions/answers";
import { like, dislike } from "../actions/likes";
import { addComment } from "../actions/comments";

import AnswerList from "../components/ui/AnswerList";
import Loading from "../components/Loading";
import Error from "../components/Error";
import CenterWrapper from "../layout/CenterWrapper";
import AnswerForm from "../components/forms/AnswerForm";

let PAGE = 1;

export class DetailQuestionContainer extends Component {
  componentWillMount() {
    window.addEventListener("scroll", throttle(this.checkForMore, 500));
  }

  checkForMore = () => {
    const top = window.scrollY + window.innerHeight;
    const loadMore = document.getElementById("load");
    const { getMoreAnswers, id, question, meta } = this.props;
    const hasMore = question.answers.length !== question.answerCount;
    if (top > loadMore.offsetTop && hasMore) {
      getMoreAnswers(id, meta.next);
    }
  };

  componentDidMount() {
    const { getQuestion, id } = this.props;
    getQuestion(id, PAGE);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", throttle(this.checkForMore, 500));
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
      addComment,
      answersLoading
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
              <span className="badge badge-light px-0">
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
        <div id="load">
          <p>load more</p>
        </div>
        {answersLoading && <p>loading...</p>}
      </div>
    );
  }
}

const mapStateToProps = ({
  questions: { question, loading, error, answersLoading, singleMeta },
  auth: { loggedIn }
}) => ({
  question,
  loading,
  answersLoading,
  error,
  loggedIn,
  meta: singleMeta
});

export default connect(
  mapStateToProps,
  {
    getQuestion,
    getMoreAnswers,
    addAnswer,
    editAnswer,
    removeAnswer,
    like,
    dislike,
    addComment
  }
)(DetailQuestionContainer);
