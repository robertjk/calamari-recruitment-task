import classNames from "classnames";

import { type Page } from "%store/specialistsSlice";

import { PAGE_TITLES } from "./pageTitles";
import styles from "./PageSelect.module.css";

interface PageSelectProps {
  className?: string;
  onPageChange: (page: Page) => void;
  page: Page;
}

function PageSelect({ className, onPageChange, page }: PageSelectProps) {
  const createHandleChange = (page: Page) => () => {
    onPageChange(page);
  };

  const buttonClassName = (buttonPage: Page) =>
    classNames(styles.button, {
      [styles.isChecked]: page === buttonPage,
    });

  return (
    <fieldset className={classNames(className, styles.root)}>
      <label className={buttonClassName("all")}>
        {PAGE_TITLES.all}
        <input
          type="radio"
          name="page"
          value="all"
          checked={page === "all"}
          onChange={createHandleChange("all")}
          className={styles.input}
        />
      </label>
      <label className={buttonClassName("favorites")}>
        {PAGE_TITLES.favorites}
        <input
          type="radio"
          name="page"
          value="favorites"
          checked={page === "favorites"}
          onChange={createHandleChange("favorites")}
          className={styles.input}
        />
      </label>
    </fieldset>
  );
}

export { PageSelect };
