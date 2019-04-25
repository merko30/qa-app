import { combineReducers } from "redux";

import auth from "./auth";
import questions from "./questions";
import answers from "./answers";

export default combineReducers({ auth, questions, answers });
