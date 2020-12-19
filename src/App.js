import styled from "styled-components";

import Search from "./components/Search";
import Repos from "./components/Repos";

const Main = styled.div`
  margin: auto;
  max-width: 50rem;
  width: 60%;
  height: 100vh;
`;

const App = () => {
  return (
    <Main>
      <Search />
      <Repos />
    </Main>
  );
};

export default App;
