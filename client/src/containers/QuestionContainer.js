import React, { Component } from "react";
import { connect } from "react-redux";

import QuestionList from "../components/ui/QuestionList";
import {
  getQuestions,
  removeQuestion,
  editQuestion
} from "../actions/questions";
import CenterWrapper from "../layout/CenterWrapper";
import Loading from "../components/Loading";
import Error from "../components/Error";
import PaginationComponent from "../components/Pagination";

export class QuestionContainer extends Component {
  state = {
    active: 1
  };

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  onClick = page => {
    this.setState({ active: page });
    this.props.getQuestions(page);
  };

  items = () => {
    const items = [];
    const {
      meta: { count, perPage }
    } = this.props;
    const numOfPages = Math.ceil(count / perPage);
    for (let i = 1; i <= numOfPages; i++) {
      items.push(i);
    }

    return items;
  };

  render() {
    const {
      questions,
      loading,
      removeQuestion,
      editQuestion,
      loggedIn,
      error,
      meta,
      getQuestions
    } = this.props;
    const { active } = this.state;
    return (
      <div>
        {error && <Error error={error} />}

        {loading && (
          <CenterWrapper>
            <Loading />
          </CenterWrapper>
        )}
        {questions && meta && (
          <>
            <QuestionList
              questions={questions}
              editQuestion={editQuestion}
              removeQuestion={removeQuestion}
              loggedIn={loggedIn}
            />
            <PaginationComponent
              pages={this.items()}
              onClick={this.onClick}
              active={active}
            />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  questions: { questions, loading, error, meta },
  auth: { loggedIn }
}) => ({
  questions,
  meta,
  loading,
  error,
  loggedIn
});

export default connect(
  mapStateToProps,
  { getQuestions, editQuestion, removeQuestion }
)(QuestionContainer);
