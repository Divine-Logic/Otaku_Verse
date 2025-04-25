import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout.tsx";
import AnimeDetails from "../pages/AnimeDetails/AnimeDetails.tsx";
import NotFound from "../pages/Error/NotFound.tsx";
import HomePage from "../pages/home/HomePage.tsx";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>

    </Routes>
  );
}

export default Routers;
