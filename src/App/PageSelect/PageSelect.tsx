import { type Page, PAGE_TITLES } from "../page.type";

interface PageSelectProps {
  className?: string;
  page: Page;
  onPageChange: (page: Page) => void;
}

function PageSelect({ className, page, onPageChange }: PageSelectProps) {
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
