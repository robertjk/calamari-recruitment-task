import { type Page, PAGE_TITLES } from "../page.type";

interface PageSelectProps {
  className?: string;
  onPageChange: (page: Page) => void;
  page: Page;
}

function PageSelect({ className, onPageChange, page }: PageSelectProps) {
  const createHandleChange = (page: Page) => () => {
    onPageChange(page);
  };

  return (
    <fieldset className={className}>
      <label>
        {PAGE_TITLES.all}
        <input
          type="radio"
          name="page"
          value="all"
          checked={page === "all"}
          onChange={createHandleChange("all")}
        />
      </label>
      <label>
        {PAGE_TITLES.favorites}
        <input
          type="radio"
          name="page"
          value="favorites"
          checked={page === "favorites"}
          onChange={createHandleChange("favorites")}
        />
      </label>
    </fieldset>
  );
}

export { PageSelect };
