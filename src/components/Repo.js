import styled from "styled-components";

import { removeHyphensAndCapitalizeWithExceptions } from "../utils/index";

const ArticleContainer = styled.div`
  padding: 2rem;
  margin: 1rem;
  background-color: #6aac56;
  border-radius: 0.5em;
  transition: 0.3s;
  color: #fff;

  &:hover {
    transition-timing-function: ease-out;
    transition: 0.1s;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0.5em 0.5em 0.5em gray;
  }

  @media screen and (max-width: 768px) {
    padding: 1em;
  }
`;

const StyledArticle = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h1 {
    font-size: 4em;
  }
  h3 {
    font-size: 2em;
    margin-bottom: 1em;
  }
  p {
    font-size: 1.5em;
    line-height: 0.5em;
  }

  @media screen and (max-width: 768px) {
    h1 {
      font-size: 2em;
    }

    h3 {
      font-size: 1.1em;
      margin-bottom: 2em;
    }
    p {
      font-size: 1em;
    }
  } ;
`;

const ForkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-top: 0;
  }
`;

const Repo = ({ repoName, forks, language, createdAt }) => (
  <ArticleContainer>
    <StyledArticle>
      <div>
        <h3>{removeHyphensAndCapitalizeWithExceptions(repoName)}</h3>

        <p>{language}</p>
        <p>Created: {new Date(createdAt).toLocaleDateString()}</p>
      </div>
      <ForkContainer>
        <h3>Forks</h3>
        <h1>{forks}</h1>
      </ForkContainer>
    </StyledArticle>
  </ArticleContainer>
);

export default Repo;
