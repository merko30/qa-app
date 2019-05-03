import request from "../utils/request";
import token from "../utils/token";

class CommentService {
  static addCommentRequest = async (answerId, comment) => {
    const response = await (await request(
      `/api/comments/${answerId}`,
      "POST",
      {
        Authorization: token()
      },
      comment
    )).json();

    return response;
  };
}

export default CommentService;
