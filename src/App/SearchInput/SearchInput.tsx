import classNames from "classnames";
import { ChangeEvent } from "react";

import { useAppDispatch, useAppSelector } from "%store/hooks";
import { selectSearchQuery, setSearchQuery } from "%store/specialistsSlice";

import styles from "./SearchInput.module.css";

interface SearchInputProps {
  className?: string;
}

function SearchInput({ className }: SearchInputProps) {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newSearchPhrase = event.target.value;
    dispatch(setSearchQuery(newSearchPhrase));
  }

  return (
    <input
      type="search"
      name="searchText"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleChange}
      className={classNames(className, styles.root)}
    />
  );
}

export { SearchInput };
