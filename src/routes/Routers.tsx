import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout.tsx";
import AnimeDetails from "../pages/anime/AnimeDetails.tsx";
import AnimeHomePage from "../pages/anime/home/AnimeHomePage.tsx";
import NotFound from "../pages/Error/NotFound.tsx";
import MangaHome from "../pages/manga/home/MangaHome.tsx";
import Mangadetails from "../pages/manga/Mangadetails.tsx";
import Profile from "../pages/profile/Profile.tsx";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/anime" replace />} />
      <Route path="/" element={<Layout />}>

        {/* ? animeQuery's Routes */}

        <Route path="/anime" element={<AnimeHomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />

        {/* ? mangaQuery's Routes */}

        <Route path="/manga" element={<MangaHome />} />
        <Route path="/manga/:id" element={<Mangadetails />} />

        {/* ? Error's Routes */}

        <Route path="*" element={<NotFound />} />

      </Route>

    </Routes>
  );
}

export default Routers;
