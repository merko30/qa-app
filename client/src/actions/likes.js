import LikeService from "../services/likes";
import createAction from "../utils/createAction";

import { updateAnswerInQuestions } from "./questions";

const likeAction = createAction("LIKE");
const dislikeAction = createAction("DISLIKE");

const like = answerId => async dispatch => {
  dispatch(likeAction.start());
  try {
    const { answer } = await LikeService.likeRequest(answerId);
    console.log(answer);
    dispatch(likeAction.success());
    dispatch(updateAnswerInQuestions(answer));
  } catch (error) {
    dispatch(likeAction.failure(error));
  }
};

const dislike = (answerId, id) => async dispatch => {
  dispatch(dislikeAction.start());
  try {
    const { answer } = await LikeService.dislikeRequest(answerId, id);
    dispatch(dislikeAction.success());
    dispatch(updateAnswerInQuestions(answer));
  } catch (error) {
    dispatch(dislikeAction.failure(error));
  }
};

export { like, dislike };
