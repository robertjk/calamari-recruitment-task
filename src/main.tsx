import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "%store";

import { GlobalStyles } from "./global-styles";
import { App } from "./App";

const rootContainer = document.getElementById("root");

if (rootContainer) {
  ReactDOM.createRoot(rootContainer).render(
    <React.StrictMode>
      <GlobalStyles />
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
