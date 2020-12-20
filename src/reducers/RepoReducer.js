export const reposReducer = (state, action) => {
  if (action.type === REPOS_ACTIONS.FETCHING) {
    return {
      repos: [],
      loading: true,
      error: null,
    };
  }
  if (action.type === REPOS_ACTIONS.RESPONSE_COMPLETE) {
    return {
      repos: action.payload.repos,
      loading: false,
      error: null,
    };
  }
  if (action.type === REPOS_ACTIONS.ERROR) {
    return {
      repos: [],
      loading: false,
      error: action.payload.error,
    };
  }
  return state;
};

export const REPOS_ACTIONS = {
  FETCHING: "FETCHING",
  RESPONSE_COMPLETE: "RESPONSE_COMPLETE",
  ERROR: "ERROR",
};

export const initialState = {
  error: null,
  loading: false,
  repos: [],
};
