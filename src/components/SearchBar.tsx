
interface SearchBarProps {
  search: string;
  onSearch: (value: string) => void;
}

function SearchBar({ search, onSearch }: SearchBarProps) {
  return (
    <input
      type="search"
      placeholder="Search tasks..."
      aria-label="Search tasks"
      value={search}
      onChange={(event) => onSearch(event.target.value)}
    />
  );
}

export default SearchBar;
