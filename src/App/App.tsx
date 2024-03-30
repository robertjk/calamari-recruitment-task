import { useState } from "react";

import { type Page, PAGE_TITLES } from "./page.type";
import { PageSelect } from "./PageSelect";
import { SearchInput } from "./SearchInput";
import { SpecialistsList } from "./SpecialistsList";

import styles from "./App.module.css";

function App() {
  const [page] = useState<Page>("all");
  const pageTitle = PAGE_TITLES[page];

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
