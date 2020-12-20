import styled from "styled-components";

import { removeHypensAndCapitalizeWithExceptions } from "../utils";

const ArticleContainer = styled.div`
  padding: 1rem;
  margin: 1rem;
  border: 0.1rem solid gray;
  border-radius: 0.5em;
`;

const Repo = ({ repoName, forks, language, createdAt }) => (
  <ArticleContainer>
    <article>
      <h3>Title: {removeHypensAndCapitalizeWithExceptions(repoName)}</h3>
      <p>Number of forks: {forks}</p>
      <p>Language: {language}</p>
      <p>Created Date: {new Date(createdAt).toLocaleDateString()}</p>
    </article>
  </ArticleContainer>
);

export default Repo;
