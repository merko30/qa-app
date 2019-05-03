import request from "../utils/request";
import token from "../utils/token";

class LikeService {
  static likeRequest = async answerId => {
    const response = await (await request(`/api/likes/${answerId}`, "POST", {
      Authorization: token()
    })).json();

    return response;
  };

  static dislikeRequest = async (answerId, id) => {
    const response = await (await request(
      `/api/likes/${answerId}/${id}`,
      "DELETE",
      {
        Authorization: token()
      }
    )).json();

    return response;
  };
}

export default LikeService;
