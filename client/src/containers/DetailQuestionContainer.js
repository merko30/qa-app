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
  checkForMore = () => {
    console.log("checking");
    const top = window.scrollY + window.innerHeight;
    const loadMore = document.getElementById("load");
    const { getMoreAnswers, id, question, meta } = this.props;
    const hasMore = question.answers.length !== question.answerCount;
    if (loadMore && top > loadMore.offsetTop && hasMore) {
      getMoreAnswers(id, meta.next);
    }
  };

  throttledCheck = throttle(this.checkForMore, 500);

  componentDidMount() {
    window.addEventListener("scroll", this.throttledCheck, false);
    const { getQuestion, id } = this.props;
    getQuestion(id, PAGE);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.throttledCheck, false);
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
      answersLoading,
      meta
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
          <div className="container mx-auto my-5">
            <h3 style={{ wordBreak: "break-word" }}>{question.text}</h3>
            <div>
              <span className="badge badge-light px-0">
                {distanceInWordsToNow(question.createdAt)} ago
              </span>
              <div className="pull-right">
                <p>By {question.user.name}</p>
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

            {question.answerCount > meta.perPage && <div id="load" />}
            {answersLoading && <p>loading...</p>}
          </div>
        )}
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
