import React, { Component } from "react";
import { Link } from "react-router-dom";
import { distanceInWordsToNow } from "date-fns";

import Icon from "../Icon";
import MyModal from "../../layout/Modal";
import QuestionForm from "../../forms/QuestionForm";

import "./question.css";
import { faPen, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import AnswerCount from "./AnswerCount";

class Question extends Component {
  state = {
    show: false
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  onRemove = () => {
    const { removeQuestion, question } = this.props;
    removeQuestion(question.id);
  };

  render() {
    const {
      question: {
        text,
        createdAt,
        id,
        user: { name },
        answers,
        userId
      },
      editQuestion,
      loggedIn
    } = this.props;
    const userID = parseInt(localStorage.getItem("userId"));
    const userMatchesAuthor = loggedIn && userID && userID === userId;
    const { show } = this.state;
    return (
      <div className="col-md-8 col-md-offset-2 col-sm-12 col-xs-12 mx-auto">
        <div className="d-flex align-items-center w-100">
          <AnswerCount answers={answers} />
          <div className="d-flex align-items-center justify-content-between w-100">
            <Link to={`/questions/${id}`} className="text-dark no-underline">
              <h3 className="col-10 word-wrap my-2 pl-4 pr-0">{text}</h3>
            </Link>
            {userMatchesAuthor && (
              <div>
                <Icon icon={faPen} onClick={this.handleShow} />
                <MyModal handleClose={this.handleClose} show={show}>
                  <QuestionForm
                    mode="edit"
                    question={this.props.question}
                    onSubmit={editQuestion}
                    handleClose={this.handleClose}
                  />
                </MyModal>
                <Icon icon={faWindowClose} onClick={this.onRemove} />
              </div>
            )}
          </div>
        </div>
        <p className="d-block text-right mt-2 px-2 rounded">
          asked by <strong>{name}</strong> {distanceInWordsToNow(createdAt)} ago
        </p>
      </div>
    );
  }
}

export default Question;
