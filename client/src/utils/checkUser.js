import { setStatus } from "../actions/auth";

export default function(store) {
  const token = localStorage.getItem("token") ? true : false;

  if (token) {
    store.dispatch(setStatus());
  }
}
