import { useState } from "react";

import "./App.css";

type Page = "all" | "favorites";

const PAGE_TITLES: { [page in Page]: string } = {
  all: "All specialists",
  favorites: "My specialists",
};

function App() {
  const [page, setPage] = useState<Page>("all");
  const pageTitle = PAGE_TITLES[page];

  return (
    <div className="App">
      <header>
        <h1>{pageTitle}</h1>
        <form>
          <fieldset>
            <label>
              {PAGE_TITLES.all}
              <input type="radio" name="page" value="all" />
            </label>
            <label>
              {PAGE_TITLES.favorites}
              <input type="radio" name="page" value="favorites" />
            </label>
          </fieldset>
          <input type="search" name="searchText" />
        </form>
      </header>
      <main>{/* TODO: Display specialists here */}</main>
    </div>
  );
}

export { App };
