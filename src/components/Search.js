import styled from "styled-components";

import { debounce } from "lodash";

const SearchBox = styled.input`
  border-radius: 0.5em;
  width: 100%;
  height: 2em;
`;

const Search = ({ setViewState, repos }) => {
  const handleChange = (e) => {
    const searchTerms = e.target.value
      .split(" ")
      .map((term) => term.toLowerCase())
      .filter((term) => term); // filter empty string

    // display full list if no search terms
    if (searchTerms.length === 0) return setViewState(repos);

    setViewState(
      repos.filter((repo) =>
        searchTerms.some((term) => repo.name.includes(term)),
      ),
    );
  };

  return (
    <SearchBox
      autoFocus
      placeholder={"Enter space separated search terms"}
      onChange={debounce(handleChange, 150)}
    />
  );
};

export default Search;
