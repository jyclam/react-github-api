import styled from "styled-components";

import { removeHyphensAndCapitalizeWithExceptions } from "../utils/index";

const ArticleContainer = styled.div`
  padding: 1rem;
  margin: 1rem;
  background-color: #6aac56;
  border-radius: 0.5em;
  transition: 0.3s;
  color: #fff;

  &:hover {
    transition-timing-function: ease-out;
    transition: 0.1s;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 0.5em 0.5em 0;
  }
`;

const Repo = ({ repoName, forks, language, createdAt }) => (
  <ArticleContainer>
    <article>
      <h3>Title: {removeHyphensAndCapitalizeWithExceptions(repoName)}</h3>
      <p>Number of forks: {forks}</p>
      <p>Language: {language}</p>
      <p>Created Date: {new Date(createdAt).toLocaleDateString()}</p>
    </article>
  </ArticleContainer>
);

export default Repo;
