import styled from "styled-components";

import Repo from "./Repo";

import { orderByParentOrOwnerFork } from "../utils/index";

const RepoContainer = styled.div`
  width: 100%;
`;

const Repos = ({ repos }) => {
  repos.sort(orderByParentOrOwnerFork);

  return (
    <RepoContainer>
      {repos.map(
        ({ name: repoName, forkCount, primaryLanguage, createdAt, parent }) => (
          <Repo
            key={repoName}
            repoName={repoName}
            forks={parent ? parent.forkCount : forkCount}
            language={primaryLanguage.name}
            createdAt={createdAt}
          />
        ),
      )}
    </RepoContainer>
  );
};

export default Repos;
