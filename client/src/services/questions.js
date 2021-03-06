import request from "../utils/request";
import token from "../utils/token";

export class QuestionService {
  static fetchAll = async page => {
    const questions = await (await request(
      `/api/q?page=${page}`,
      "GET",
      {}
    )).json();
    return questions;
  };

  static fetchOneRequest = async (id, page = 1) => {
    const question = await (await request(
      `/api/q/${id}?page=${page}`,
      "GET",
      {}
    )).json();
    return question;
  };

  static addQuestionRequest = async data => {
    const question = await (await request(
      `/api/q/`,
      "POST",
      {
        Authorization: token()
      },
      data
    )).json();
    return question;
  };

  static editQuestionRequest = async (questionId, data) => {
    const question = await (await request(
      `/api/q/${questionId}`,
      "PUT",
      { Authorization: token() },
      data
    )).json();

    return question;
  };

  static deleteQuestionRequest = async questionId => {
    const question = await (await request(`/api/q/${questionId}`, "DELETE", {
      Authorization: token()
    })).json();
    return question;
  };
}
