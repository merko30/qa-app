import React, { Component } from "react";
import AnswerForm from "../../forms/AnswerForm";
import MyModal from "../../layout/Modal";

import { faPen, faWindowClose } from "@fortawesome/free-solid-svg-icons";

import "./answer.css";
import Icon from "../Icon";

export default class Answer extends Component {
  state = {
    show: false
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  remove = () => {
    this.props.removeAnswer(this.props.answer.id);
  };

  render() {
    const { show } = this.state;
    const { answer, onSubmit, questionId, loggedIn } = this.props;
    const userID = parseInt(localStorage.getItem("userId"));
    const userMatchesAuthor = loggedIn && userID && userID === answer.userId;
    return (
      <div className="row">
        <MyModal handleClose={this.handleClose} show={show}>
          <AnswerForm
            mode="edit"
            answer={answer}
            onSubmit={onSubmit}
            questionId={questionId}
            handleClose={this.handleClose}
            loggedIn={loggedIn}
          />
        </MyModal>

        <div className="w-100 my-2 border rounded pt-1 pb-2 px-2 border-grey">
          <div className="d-flex align-items-center justify-content-between ">
            <h6 style={{ wordBreak: "break-word" }} className="mb-1">
              {answer.text}
            </h6>

            {userMatchesAuthor && (
              <div>
                <Icon icon={faPen} onClick={this.handleShow} />
                <Icon icon={faWindowClose} onClick={this.remove} />
              </div>
            )}
          </div>
          <small className="text-weight-bold">{answer.user.name}</small>
        </div>
      </div>
    );
  }
}
