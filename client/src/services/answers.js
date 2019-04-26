import request from "../utils/request";

import token from "../utils/token";

export default class AnswerService {
  static editAnswerRequest = async (questionId, answerId, data) => {
    const answer = await (await request(
      `/api/a/${questionId}/${answerId}`,
      "PUT",
      {
        Authorization: token()
      },
      data
    )).json();

    return answer;
  };

  static addAnswerRequest = async (questionId, data) => {
    const answer = await (await request(
      `/api/a/${questionId}`,
      "POST",
      {
        Authorization: token()
      },
      data
    )).json();

    return answer;
  };
  static deleteAnswerRequest = async answerId => {
    const answer = await (await request(`/api/a/${answerId}`, "DELETE", {
      Authorization: token()
    })).json();

    return answer;
  };
}
