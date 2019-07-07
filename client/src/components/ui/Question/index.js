import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { distanceInWordsToNow } from "date-fns";
import { faPen, faWindowClose } from "@fortawesome/free-solid-svg-icons";

import "./question.css";

import QuestionForm from "../../forms/QuestionForm";
import MyModal from "../../../layout/Modal";
import Icon from "../../Icon";
import AnswerCount from "./AnswerCount";
import Confirmation from "../../Confirmation";

class Question extends Component {
  static propTypes = {
    question: PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired,
      answers: PropTypes.array.isRequired,
      userId: PropTypes.number.isRequired
    }),
    editQuestion: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired
  };

  state = {
    show: false,
    showRemoveConfirmation: false
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleToggleRemove = () => {
    this.setState({
      showRemoveConfirmation: !this.state.showRemoveConfirmation
    });
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
        userId,
        title
      },
      editQuestion,
      loggedIn
    } = this.props;
    const userID = localStorage.getItem("userId");
    const userMatchesAuthor = loggedIn && userID && parseInt(userID) === userId;
    const { show, showRemoveConfirmation } = this.state;
    return (
      <div className="col-md-8 col-md-offset-2 col-sm-12 col-xs-12 mx-auto my-2">
        <div className="d-flex align-items-center w-100">
          <AnswerCount answers={answers} />
          <div className="d-flex align-items-center justify-content-between w-100">
            <Link to={`/questions/${id}`} className="text-dark no-underline">
              <h3 className="col-10 word-wrap my-2 pl-4 pr-0">{title}</h3>
              <h6 className="col-10 word-wrap my-2 pl-4 pr-0 text-shorten">
                {text}
              </h6>
              <div className="d-flex pl-4">
                <p className="mb-0 mr-2">
                  <strong>{name}</strong>
                </p>
                <p>{distanceInWordsToNow(createdAt)} ago</p>
              </div>
            </Link>
            {userMatchesAuthor && (
              <div className="d-flex cursor-pointer pos">
                <Icon icon={faPen} onClick={this.handleShow} classes="mr-2" />
                <MyModal handleClose={this.handleClose} show={show}>
                  <QuestionForm
                    mode="edit"
                    question={this.props.question}
                    onSubmit={editQuestion}
                    handleClose={this.handleClose}
                  />
                </MyModal>
                <Icon icon={faWindowClose} onClick={this.handleToggleRemove} />
                <MyModal
                  show={showRemoveConfirmation}
                  handleClose={this.handleToggleRemove}
                >
                  <Confirmation onClick={this.onRemove}>
                    <p>Are you sure you want to delete this question ?</p>
                  </Confirmation>
                </MyModal>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
