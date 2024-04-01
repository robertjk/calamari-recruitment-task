import { useState } from "react";

import { type Page, PAGE_TITLES } from "./page.type";

import { GlobalStyles } from "./GlobalStyles";
import { PageSelect } from "./PageSelect";
import { SearchInput } from "./SearchInput";
import { SpecialistsList } from "./SpecialistsList";

import styles from "./App.module.css";

function App() {
  const [page, setPage] = useState<Page>("all");
  const [searchPhrase, setSearchPhrase] = useState<string>("");

  const pageTitle = PAGE_TITLES[page];

  function handlePageSelect(newPage: Page) {
    setPage(newPage);
  }

  function handleSearchPhraseChange(newSearchPhrase: string) {
    setSearchPhrase(newSearchPhrase);
  }

  return (
    <GlobalStyles>
      <div className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.title}>{pageTitle}</h1>
          <form className={styles.form}>
            <PageSelect
              className={styles.pageSelect}
              onPageChange={handlePageSelect}
              page={page}
            />
            <SearchInput
              className={styles.searchInput}
              onSearchPhraseChange={handleSearchPhraseChange}
              searchPhrase={searchPhrase}
            />
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
