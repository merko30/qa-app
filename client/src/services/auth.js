import request from "../utils/request";
import token from "../utils/token";

export class AuthService {
  static registerRequest = async data => {
    const formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: formData
    });
    return response;
  };

  static loginRequest = async data => {
    const response = await request(`/api/auth/login`, "POST", {}, data);
    return response;
  };

  static getUserRequest = async id => {
    const response = await (await request(`/api/auth/user/${id}`, "GET", {
      Authorization: token()
    })).json();
    return response;
  };

  static sendResetEmailRequest = async email => {
    const response = await (await request(
      `/api/auth/forgot/`,
      "POST",
      {},
      { email }
    )).json();
    return response;
  };

  static resetPasswordRequest = async (token, data) => {
    const response = await (await request(
      `/api/auth/reset/${token}`,
      "POST",
      {},
      data
    )).json();
    return response;
  };

  static editUserRequest = async data => {
    const response = await await request(
      `/api/auth/edit`,
      "PUT",
      { Authorization: token() },
      data
    );
    return response;
  };

  static changeAvatarRequest = async data => {
    const formData = new FormData();

    formData.append("avatar", data.avatar);
    const response = await fetch(`/api/auth/avatar`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: token()
      }
    });
    return response;
  };
}
