import { useAppSelector } from "%store/hooks";
import { selectPage, selectSpecialists } from "%store/specialistsSlice";

import { PAGE_TITLES } from "./page.type";
import { GlobalStyles } from "./GlobalStyles";
import { PageSelect } from "./PageSelect";
import { SearchInput } from "./SearchInput";
import { SpecialistsList } from "./SpecialistsList";

import styles from "./App.module.css";

function App() {
  const page = useAppSelector(selectPage);
  const specialists = useAppSelector(selectSpecialists);

  const specialistsCount = specialists.length;
  const pageTitle = `${PAGE_TITLES[page]} (${String(specialistsCount)})`;

  return (
    <GlobalStyles>
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
    </GlobalStyles>
  );
}

export { App };
