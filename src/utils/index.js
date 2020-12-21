export const orderByParentOrOwnerFork = (a, b) => {
  const aFork = a.parent ? a.parent.forkCount : a.forkCount;
  const bFork = b.parent ? b.parent.forkCount : b.forkCount;
  if (aFork > bFork) return -1;
  if (aFork < bFork) return 1;
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
