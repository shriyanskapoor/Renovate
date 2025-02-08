import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ErrorBoundary } from "@jsq/ds/core";
import { init } from "@jsq/observability";
import { HelloWorld } from "./pages/HelloWorld/HelloWorld";
import "./index_vanilla.css";

type RootedGlobalThings = typeof globalThis & {
  __JSQ_ROOT__?: Root;
};

const globalThisWithRoot: RootedGlobalThings = globalThis;

init({
  applicationId: __DATADOG_RUM_APP_ID__,
  clientToken: __DATADOG_RUM_CLIENT_TOKEN__,
  serviceName: "soa-frontend-service-template", // TODO: Replace this with the name of your app
  version: __JSQ_COMMIT_HASH__,
});

// In react 18 you should only create a root once
const root = (globalThisWithRoot.__JSQ_ROOT__ ??= createRoot(
  document.getElementById("jsq-app")!,
));

root.render(
  <StrictMode>
    {/* @ts-expect-error react types mismatch */}
    <ErrorBoundary>
      <BrowserRouter>
        {/* A navigation bar would go here... */}
        <Routes>
          <Route path="/" element={<HelloWorld />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept();
  }
}
