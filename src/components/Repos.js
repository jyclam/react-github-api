import styled from "styled-components";

import Repo from "./Repo";

const RepoContainer = styled.div`
  width: 100%;
`;

const Repos = ({ repos }) => {
  return (
    <RepoContainer>
      {repos.map(
        ({ name: repoName, forks, language, created_at: createdAt }) => (
          <Repo
            repoName={repoName}
            forks={forks}
            language={language}
            createdAt={createdAt}
          />
        ),
      )}
    </RepoContainer>
  );
};

export default Repos;
