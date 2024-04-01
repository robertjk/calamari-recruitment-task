import { ChangeEvent } from "react";

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
      className={className}
      type="search"
      name="searchText"
      placeholder="Search"
      value={searchPhrase}
      onChange={handleChange}
    />
  );
}

export { SearchInput };
