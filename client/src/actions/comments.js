import createAction from "../utils/createAction";
import CommentService from "../services/comments";
import { updateAnswerInQuestions } from "./questions";

const add = createAction("ADD_COMMENT");

export const addComment = (answerId, comment) => async dispatch => {
  dispatch(add.start());
  try {
    const { answer } = await CommentService.addCommentRequest(
      answerId,
      comment
    );
    dispatch(add.success());
    dispatch(updateAnswerInQuestions(answer));
  } catch (error) {
    dispatch(add.failure(error));
  }
};
