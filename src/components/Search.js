import styled from "styled-components";

import { debounce } from "lodash";

const SearchBox = styled.input`
  border-radius: 0.5em;
  width: 70%;
  height: 3em;
  font-size: 1.25em;
  background-color: #f5f8fb;
  padding: 1em;

  @media screen and (max-width: 768px) {
    font-size: 1em;
    width: 90%;
  }
`;

const Search = ({ reposDispatch, repos }) => {
  const handleChange = (e) => {
    const searchTerms = e.target.value
      .split(" ")
      .map((term) => term.toLowerCase())
      .filter((term) => term); // filter empty string

    // display full list if no search terms
    if (searchTerms.length === 0)
      return reposDispatch({
        type: "FILTER_DATA",
        payload: { filteredRepos: repos },
      });

    reposDispatch({
      type: "FILTER_DATA",
      payload: {
        filteredRepos: repos.filter((repo) =>
          searchTerms.some((term) => repo.name.includes(term)),
        ),
      },
    });
  };

  return (
    <SearchBox
      autoFocus
      placeholder={"Search with space separated terms"}
      onChange={debounce(handleChange, 150)}
    />
  );
};

export default Search;
