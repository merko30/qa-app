import request from "../utils/request";

export class AuthService {
  static registerRequest = async data => {
    const response = await request(`/api/auth/register`, "POST", {}, data);
    return response;
  };

  static loginRequest = async data => {
    const response = await request(`/api/auth/login`, "POST", {}, data);
    return response;
  };
}
