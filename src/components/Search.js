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
    const rawTerms = e.target.value;
    let searchTerms = [];

    // matches double quote enclosed substrings
    const stringsEnclosedByQuotesPattern = new RegExp(/".*?"/g);
    // matches all double quotes
    const allQuotesPattern = new RegExp(/["]+/g);

    // match and add double quoted terms to searchTerms
    if (stringsEnclosedByQuotesPattern.test(rawTerms)) {
      searchTerms = [
        ...rawTerms
          .match(stringsEnclosedByQuotesPattern)
          .map((str) => str.replace(allQuotesPattern, "")),
      ];
    }

    // remove double quoted terms and add the rest to searchTerms
    searchTerms = [
      ...searchTerms,
      ...rawTerms.replaceAll(stringsEnclosedByQuotesPattern, "").split(" "),
    ];

    // normalize searchTerms
    searchTerms = searchTerms
      .filter((term) => term) // remove empty strings
      .map((term) => term.toLowerCase());

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
          searchTerms.some((term) =>
            repo.name.replace("-", " ").includes(term),
          ),
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
