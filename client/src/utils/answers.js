export class AnswerService {
  static editAnswerRequest = async (questionId, answerId, data) => {
    const token = localStorage.getItem("token");
    const answer = await (await fetch(`/api/a/${questionId}/${answerId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })).json();

    return answer;
  };

  static deleteAnswerRequest = async answerId => {
    const token = localStorage.getItem("token");
    const answer = await (await fetch(`/api/a/${answerId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    })).json();

    return answer;
  };
}
