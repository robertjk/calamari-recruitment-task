import classNames from "classnames";
import { ChangeEvent } from "react";

import styles from "./SearchInput.module.css";

interface SearchInputProps {
  className?: string;
  onChange: (newValue: string) => void;
  value: string;
}

function SearchInput({ className, onChange, value }: SearchInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newSearchPhrase = event.target.value;
    onChange(newSearchPhrase);
  }

  return (
    <input
      type="search"
      name="searchText"
      placeholder="Search..."
      value={value}
      onChange={handleChange}
      className={classNames(className, styles.root)}
    />
  );
}

export { SearchInput };
