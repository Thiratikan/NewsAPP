import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  hits: [],
  query: "react",
  page: 0,
  nbPages: 0,
};
// hits is something that will get back

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // dispatch call reducer to update the current state
  // in reducer pare, reducer will take state and action
  // whatever happens in action will pass to dispatch.
  // then reducer wil just return to update the state

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING });

    try {
      const respond = await fetch(url);
      const data = await respond.json();
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
      // payload send additional infomation to reducer it can also be other name
      // it's a property of action
    } catch (error) {
      console.log(error);
    }
  };
  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id });
  };
  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query });

    // dispatch always includes type
  };

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, removeStory, handleSearch }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
