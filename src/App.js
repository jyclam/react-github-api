import { useState, useEffect, useReducer } from "react";
import styled from "styled-components";

import "./App.css";

import Search from "./components/Search";
import Repos from "./components/Repos";

import {
  reposReducer,
  REPOS_ACTIONS,
  initialState,
} from "./reducers/RepoReducer";

const Main = styled.div`
  margin: 1rem auto;
  max-width: 50rem;
  width: 60%;
  height: 100vh;
  font-size: 1.5em;

  @media (max-width: 768px) {
    width: 90%;
    font-size: 1.7em;
    line-height: 0.5em;
  }
`;

const TopBar = styled(Main)`
  width: 100%;
  max-width: 100%;
  margin: 0;
  height: 10em;
  background-color: #004f7c;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: 7em;
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
    <>
      <TopBar>
        <Search reposDispatch={reposDispatch} repos={reposState.repos} />
      </TopBar>
      <Main>
        {reposState.error && <div>{reposState.error.message}</div>}
        {reposState.loading ? (
          "Loading data..."
        ) : (
          <Repos repos={reposState.filteredRepos} />
        )}
      </Main>
    </>
  );
};

export default App;
