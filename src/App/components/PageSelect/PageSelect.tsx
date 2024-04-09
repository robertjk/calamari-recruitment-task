import classNames from "classnames";

import { useAppDispatch, useAppSelector } from "%store";
import { type Page, selectPage, setPage } from "%store/specialistsSlice";

import styles from "./PageSelect.module.css";
import { PAGE_TITLES } from "./pageTitles";

interface PageSelectProps {
  className?: string;
}

function PageSelect({ className }: PageSelectProps) {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);

  const createHandleChange = (newPage: Page) => () => {
    dispatch(setPage(newPage));
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
