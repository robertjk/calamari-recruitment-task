import { PAGE_TITLES, PageSelect } from "%components/PageSelect";
import { SearchInput } from "%components/SearchInput";
import { SpecialistsList } from "%components/SpecialistsList";
import { useAppSelector } from "%store";
import {
  selectDisplayedSpecialists,
  selectPage,
} from "%store/specialistsSlice";

import styles from "./App.module.css";

function App() {
  const page = useAppSelector(selectPage);
  const specialists = useAppSelector(selectDisplayedSpecialists);

  const specialistsCount = specialists.length;
  const pageTitle = `${PAGE_TITLES[page]} (${specialistsCount.toString()})`;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>{pageTitle}</h1>
        <form className={styles.form}>
          <PageSelect className={styles.pageSelect} />
          <SearchInput className={styles.searchInput} />
        </form>
      </header>
      <main className={styles.main}>
        <SpecialistsList />
      </main>
    </div>
  );
}

export { App };
