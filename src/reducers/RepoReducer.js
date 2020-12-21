export const reposReducer = (state, action) => {
  if (action.type === REPOS_ACTIONS.FETCHING) {
    return {
      repos: [],
      filteredRepos: [],
      loading: true,
      error: null,
    };
  }
  if (action.type === REPOS_ACTIONS.RESPONSE_COMPLETE) {
    return {
      repos: action.payload.repos,
      filteredRepos: action.payload.repos,
      loading: false,
      error: null,
    };
  }
  if (action.type === REPOS_ACTIONS.FILTER_DATA) {
    return {
      repos: state.repos,
      filteredRepos: action.payload.filteredRepos,
      loading: false,
      error: null,
    };
  }
  if (action.type === REPOS_ACTIONS.ERROR) {
    return {
      repos: [],
      filteredRepos: [],
      loading: false,
      error: action.payload.error,
    };
  }
  return state;
};

export const REPOS_ACTIONS = {
  FETCHING: "FETCHING",
  RESPONSE_COMPLETE: "RESPONSE_COMPLETE",
  FILTER_DATA: "FILTER_DATA",
  ERROR: "ERROR",
};

export const initialState = {
  error: null,
  loading: false,
  repos: [],
  filteredRepos: [],
};
