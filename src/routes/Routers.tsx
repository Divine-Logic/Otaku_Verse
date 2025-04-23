import { Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout.tsx";
import HomePage from "../pages/home/HomePage.tsx";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />

      </Route>
    </Routes>
  );
}

export default Routers;
