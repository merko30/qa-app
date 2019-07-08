import createAction from "../utils/createAction";

const searchAction = createAction("SEARCH_BY_TAG");

const searchByTag = tag => dispatch => {
  console.log(tag);
  // dispatch(searchAction.start());
};

export { searchByTag };
