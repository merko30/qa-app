import React, { Component } from "react";
import AnswerForm from "../../forms/AnswerForm";
import CommentForm from "../../forms/CommentForm";
import MyModal from "../../../layout/Modal";

import { faPen, faWindowClose } from "@fortawesome/free-solid-svg-icons";

import "./answer.css";
import Icon from "../../Icon";
import CommentList from "../CommentList";
import Like from "./Like";
import { Button } from "react-bootstrap";

class Answer extends Component {
  state = {
    show: false,
    showCommentForm: false
  };

  onShowCommentForm = () => {
    this.setState({
      showCommentForm: true
    });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  onRemove = () => {
    const { removeAnswer, answer } = this.props;
    removeAnswer(answer.id);
  };

  onLike = () => {
    const { answer, like } = this.props;
    like(answer.id);
  };

  onDislike = () => {
    const { answer, dislike } = this.props;
    const userID = parseInt(localStorage.getItem("userId"));
    const likeID = answer.likes.find(like => like.userId === userID).id;
    dislike(answer.id, likeID);
  };

  render() {
    const { show, showCommentForm } = this.state;
    const { answer, onSubmit, questionId, loggedIn, addComment } = this.props;
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

        <div className="w-100 my-4 border rounded pt-4 pb-4 px-4 border-grey">
          <div className="d-flex align-items-center">
            <h5 style={{ wordBreak: "break-word" }} className="mb-1">
              {answer.text}
            </h5>

            {userMatchesAuthor && (
              <div className="ml-auto">
                <Icon icon={faPen} onClick={this.handleShow} />
                <Icon icon={faWindowClose} onClick={this.onRemove} />
              </div>
            )}
          </div>
          <h6 className="text-weight-bold">{answer.user.name}</h6>
          {loggedIn && (
            <Like
              loggedIn={loggedIn}
              onLike={this.onLike}
              onDislike={this.onDislike}
              answer={answer}
            />
          )}
          <div className="mb-4">
            <CommentList comments={answer.comments} />
            {showCommentForm ? (
              <CommentForm
                onSubmit={addComment}
                mode="add"
                answerId={answer.id}
              />
            ) : (
              <Button
                variant="link"
                className="m-0 px-0"
                onClick={this.onShowCommentForm}
                disabled={!loggedIn}
              >
                Add comment
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Answer;
