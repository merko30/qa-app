import React, { Component } from "react";
import { connect } from "react-redux";

import { distanceInWordsToNow } from "date-fns";

import { getQuestion } from "../actions/questions";
import { addAnswer } from "../actions/answers";

import Loading from "../components/ui/Loading";
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
    const { question, loading, loggedIn, addAnswer } = this.props;
    return (
      <div>
        {loading && (
          <CenterWrapper>
            <Loading />
          </CenterWrapper>
        )}
        {question && (
          <div class="container mx-auto mt-5">
            <h3 style={{ wordBreak: "break-word" }}>{question.text}</h3>
            <div>
              <span class="badge">
                {distanceInWordsToNow(question.createdAt)} ago
              </span>
              <div class="pull-right">
                <p>by {question.user.name}</p>
              </div>
            </div>
            <AnswerForm
              onSubmit={addAnswer}
              mode="add"
              loggedIn={loggedIn}
              questionId={question.id}
            />
            {question.answers.map(a => JSON.stringify(a))}
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
  { getQuestion, addAnswer }
)(DetailPage);
