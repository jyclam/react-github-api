export const orderByForkProperty = (a, b) => {
  if (a.forks > b.forks) return -1;
  if (a.forks < b.forks) return 1;
  return 0;
};

// can break this up into two functions if capitalization with
// exceptions or replace hyphens are used separately elsewhere
export const removeHyphensAndCapitalizeWithExceptions = (str) =>
  str
    .split("-")
    .map((word) => {
      if (word === "as" || word === "on") return word;
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(" ");
