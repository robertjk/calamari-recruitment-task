import classNames from "classnames";
import { ChangeEvent } from "react";

import styles from "./SearchInput.module.css";

interface SearchInputProps {
  className?: string;
  onSearchPhraseChange: (searchPhrase: string) => void;
  searchPhrase: string;
}

function SearchInput({
  className,
  onSearchPhraseChange,
  searchPhrase,
}: SearchInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newSearchPhrase = event.target.value;
    onSearchPhraseChange(newSearchPhrase);
  }

  return (
    <input
      type="search"
      name="searchText"
      placeholder="Search..."
      value={searchPhrase}
      onChange={handleChange}
      className={classNames(className, styles.root)}
    />
  );
}

export { SearchInput };
