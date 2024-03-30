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
      <header className="App-header">
        <h1 className="App-title">{pageTitle}</h1>
        <form className="App-form">
          <fieldset className="App-pageSelect">
            <label>
              {PAGE_TITLES.all}
              <input type="radio" name="page" value="all" />
            </label>
            <label>
              {PAGE_TITLES.favorites}
              <input type="radio" name="page" value="favorites" />
            </label>
          </fieldset>
          <input className="App-search" type="search" name="searchText" />
        </form>
      </header>
      <main className="App-main">{/* TODO: Display specialists here */}</main>
    </div>
  );
}

export { App };
