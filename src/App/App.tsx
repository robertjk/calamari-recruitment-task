import { useState } from "react";

import { PageSelect } from "./PageSelect";
import { SearchInput } from "./SearchInput";
import { type Page, PAGE_TITLES } from "./page.type";

import "./App.css";

function App() {
  const [page] = useState<Page>("all");
  const pageTitle = PAGE_TITLES[page];

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">{pageTitle}</h1>
        <form className="App-form">
          <PageSelect className="App-pageSelect" />
          <SearchInput className="App-searchInput" />
        </form>
      </header>
      <main className="App-main">{/* TODO: Display specialists here */}</main>
    </div>
  );
}

export { App };
