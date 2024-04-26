import { FormEvent, useState } from "react";

import { type Page, PAGE_TITLES, PageSelect } from "%components/PageSelect";
import { SearchInput } from "%components/SearchInput";
import { SpecialistsList } from "%components/SpecialistsList";
import { useGetSpecialistsQuery } from "%store/apiSlice/apiSlice";

import styles from "./App.module.css";

function App() {
  const [page, setPage] = useState<Page>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getSpecialistsQuery = useGetSpecialistsQuery({
    type: page,
    searchQuery,
  });
  const { data: specialists, isLoading, isError, error } = getSpecialistsQuery;

  let pageTitle = PAGE_TITLES[page];
  if (getSpecialistsQuery.isSuccess && specialists) {
    pageTitle += ` (${specialists.length.toString()})`;
  }

  function handlePageChange(newPage: Page) {
    setPage(newPage);
  }

  function handleSearchQueryChange(newSearchQuery: string) {
    setSearchQuery(newSearchQuery);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>{pageTitle}</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <PageSelect
            className={styles.pageSelect}
            value={page}
            onChange={handlePageChange}
          />
          <SearchInput
            className={styles.searchInput}
            onChange={handleSearchQueryChange}
          />
        </form>
      </header>
      <main className={styles.main}>
        <SpecialistsList
          error={error}
          isError={isError}
          isLoading={isLoading}
          specialists={specialists}
        />
      </main>
    </div>
  );
}

export { App };
