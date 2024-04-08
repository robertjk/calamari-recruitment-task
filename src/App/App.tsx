import { useAppSelector } from "%store";
import {
  selectPage,
  selectSpecialistsAll,
  selectSpecialistsCurrentPage,
  selectSpecialistsFavorite,
} from "%store/specialistsSlice";

import styles from "./App.module.css";
import { PAGE_TITLES, PageSelect } from "./PageSelect";
import { SearchInput } from "./SearchInput";
import { SpecialistsList } from "./SpecialistsList";

function App() {
  const page = useAppSelector(selectPage);
  const specialists = useAppSelector(selectSpecialistsCurrentPage);

  const specialistsCount = specialists.length;
  const pageTitle = `${PAGE_TITLES[page]} (${String(specialistsCount)})`;

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
