import { useState, useEffect, useReducer } from "react";
import styled from "styled-components";

import Search from "./components/Search";
import Repos from "./components/Repos";

import {
  reposReducer,
  REPOS_ACTIONS,
  initialState,
} from "./reducers/RepoReducer";

const Main = styled.div`
  margin: auto;
  max-width: 50rem;
  width: 60%;
  height: 100vh;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const App = () => {
  const [reposState, reposDispatch] = useReducer(reposReducer, initialState);

  useEffect(() => {
    reposDispatch({ type: REPOS_ACTIONS.FETCHING });

    fetch("https://api.github.com/orgs/7geese/repos?per_page=100")
      .then((res) => res.json())
      .then((repos) => {
        reposDispatch({
          type: REPOS_ACTIONS.RESPONSE_COMPLETE,
          payload: { repos },
        });
      })
      .catch((error) =>
        reposDispatch({ type: REPOS_ACTIONS.ERROR, payload: { error } }),
      );
  }, []);

  return (
    <Main>
      <Search reposDispatch={reposDispatch} repos={reposState.repos} />
      {reposState.error && <div>{reposState.error.message}</div>}
      {reposState.loading ? (
        "Loading data..."
      ) : (
        <Repos repos={reposState.filteredRepos} />
      )}
    </Main>
  );
};

export default App;
