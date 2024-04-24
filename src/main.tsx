import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { mockWorker } from "%mocks/setupBrowser";
import { store } from "%store";

import { App } from "./app";
import { GlobalStyles } from "./global-styles";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  return mockWorker.start();
}

async function startApp() {
  await enableMocking();

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
}

startApp().catch((error: unknown) => {
  throw new Error(`Error starting the app:${String(error)}`);
});
