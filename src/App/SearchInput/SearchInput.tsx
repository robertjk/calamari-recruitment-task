interface SearchInputProps {
  className?: string;
}

function SearchInput({ className }: SearchInputProps) {
  return (
    <input
      className={className}
      type="search"
      name="searchText"
      placeholder="Search"
    />
  );
}

export { SearchInput };
