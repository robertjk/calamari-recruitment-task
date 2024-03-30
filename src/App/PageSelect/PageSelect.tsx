import { PAGE_TITLES } from "../page.type";

interface PageSelectProps {
  className?: string;
}

function PageSelect({ className }: PageSelectProps) {
  return (
    <fieldset className={className}>
      <label>
        {PAGE_TITLES.all}
        <input type="radio" name="page" value="all" />
      </label>
      <label>
        {PAGE_TITLES.favorites}
        <input type="radio" name="page" value="favorites" />
      </label>
    </fieldset>
  );
}

export { PageSelect };
