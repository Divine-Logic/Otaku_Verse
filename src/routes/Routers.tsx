import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout.tsx";
import AnimeDetails from "../pages/anime/animedetails/AnimeDetails.tsx";
import AnimeHomePage from "../pages/anime/home/AnimeHomePage.tsx";
import NotFound from "../pages/Error/NotFound.tsx";
import MangaHome from "../pages/manga/home/MangaHome.tsx";
import Profile from "../pages/profile/Profile.tsx";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/anime" replace />} />
      <Route path="/" element={<Layout />}>
        <Route path="/anime" element={<AnimeHomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/manga" element={<MangaHome />} />

        <Route path="*" element={<NotFound />} />
      </Route>

    </Routes>
  );
}

export default Routers;
