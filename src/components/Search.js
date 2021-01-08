import { useState, useEffect } from "react";
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
  const [languageFilterTerm, setLanguageFilterTerm] = useState("All");
  const [rawSearchTerms, setRawSearchTerms] = useState("");

  const uniqueLanguages = repos.reduce(
    (languages, currentValue) => {
      if (!languages.includes(currentValue.primaryLanguage.name))
        languages.push(currentValue.primaryLanguage.name);
      return languages;
    },
    ["All"],
  );

  useEffect(() => {
    handleChange();
  }, [languageFilterTerm, rawSearchTerms]);

  const handleChange = () => {
    const rawTerms = rawSearchTerms;
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

    let languageFilteredRepos = repos;
    if (languageFilterTerm != "All") {
      languageFilteredRepos = repos.filter(
        (repo) =>
          repo.primaryLanguage.name.toLowerCase() ===
          languageFilterTerm.toLowerCase(),
      );
    }

    // display full list if no search terms
    if (searchTerms.length === 0)
      return reposDispatch({
        type: "FILTER_DATA",
        payload: { filteredRepos: languageFilteredRepos },
      });

    reposDispatch({
      type: "FILTER_DATA",
      payload: {
        filteredRepos: languageFilteredRepos.filter((repo) =>
          searchTerms.some((term) =>
            repo.name.replace("-", " ").includes(term),
          ),
        ),
      },
    });
  };

  return (
    <>
      {uniqueLanguages.map((language) => (
        <button
          key={language}
          disabled={languageFilterTerm === language ? true : false}
          onClick={() => {
            setLanguageFilterTerm(language);
          }}
        >
          {language}
        </button>
      ))}
      <SearchBox
        autoFocus
        placeholder={"Search with space separated terms"}
        onChange={(e) => {
          setRawSearchTerms(e.target.value);
        }}
      />
    </>
  );
};

export default Search;
