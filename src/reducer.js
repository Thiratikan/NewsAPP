import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  // action.type will update type in dispatch
  // switch is like if statement

  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };
    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter((story) => story.objectID !== action.payload),
      };

    default:
      throw new Error(`no matching "${action.type}" action type`);
  }
  // ${} It's used to reference a variable within string
  //   const one = 1;
  //   const two = 2;
  //   const result = `One add two is ${one + two}`;
  //   console.log(result); // output: One add two is 3
};
export default reducer;
