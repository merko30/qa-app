export class QuestionService {
  static editQuestionRequest = async (questionId, data) => {
    const token = localStorage.getItem("token");
    const question = await (await fetch(`/api/q/${questionId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })).json();

    return question;
  };

  static deleteQuestionRequest = async questionId => {
    const token = localStorage.getItem("token");
    const question = await (await fetch(`/api/q/${questionId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    })).json();

    return question;
  };
}
