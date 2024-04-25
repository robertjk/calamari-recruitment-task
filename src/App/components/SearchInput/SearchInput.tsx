import classNames from "classnames";
import debounce from "lodash/debounce";
import { ChangeEvent, useCallback, useEffect, useMemo } from "react";

import styles from "./SearchInput.module.css";

const DEBOUNCE_TIME = 500;

interface SearchInputProps {
  className?: string;
  onChange: (newValue: string) => void;
}

function SearchInput({ className, onChange }: SearchInputProps) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newSearchPhrase = event.target.value;
      onChange(newSearchPhrase);
    },
    [onChange],
  );

  const handleChangeDebounced = useMemo(
    () => debounce(handleChange, DEBOUNCE_TIME),
    [handleChange],
  );

  useEffect(() => {
    return () => {
      handleChangeDebounced.cancel();
    };
  });

  return (
    <input
      type="search"
      name="searchText"
      placeholder="Search..."
      onChange={handleChangeDebounced}
      className={classNames(className, styles.root)}
    />
  );
}

export { SearchInput };
