import classNames from "classnames";

import styles from "./PageSelect.module.css";
import { PAGE_TITLES } from "./pageTitles";

type Page = "all" | "favorites";

interface PageSelectProps {
  className?: string;
  onChange: (newValue: Page) => void;
  value: Page;
}

function PageSelect({ className, onChange, value }: PageSelectProps) {
  const buttonClassName = (buttonPage: Page) =>
    classNames(styles.button, {
      [styles.isChecked]: value === buttonPage,
    });

  return (
    <fieldset className={classNames(className, styles.root)}>
      <label className={buttonClassName("all")}>
        {PAGE_TITLES.all}
        <input
          type="radio"
          name="page"
          value="all"
          checked={value === "all"}
          onChange={() => {
            onChange("all");
          }}
          className={styles.input}
        />
      </label>
      <label className={buttonClassName("favorites")}>
        {PAGE_TITLES.favorites}
        <input
          type="radio"
          name="page"
          value="favorites"
          checked={value === "favorites"}
          onChange={() => {
            onChange("favorites");
          }}
          className={styles.input}
        />
      </label>
    </fieldset>
  );
}

export { PageSelect, type Page };
