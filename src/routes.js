import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "components/Loading";

// Lazy-loaded
const Home = React.lazy(() => import("pages/Home"));
const Starships = React.lazy(() => import("pages/StarshipsList"));
const Detail = React.lazy(() => import("pages/Detail"));
const Favourites = React.lazy(() => import("pages/Favourites"));
const Page404 = React.lazy(() => import("pages/Favourites"));

function AppRouter() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/favourites/:number"
        element={
          <Suspense fallback={<Loading />}>
            <Favourites />
          </Suspense>
        }
      />
      <Route
        path="/starships/:name"
        element={
          <Suspense fallback={<Loading />}>
            <Detail />
          </Suspense>
        }
      />
      <Route
        exact
        path="/starships"
        element={
          <Suspense fallback={<Loading />}>
            <Starships />
          </Suspense>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
export default AppRouter;
