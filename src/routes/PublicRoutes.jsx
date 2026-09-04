import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import AboutSchool from "../pages/public/AboutSchool";
import AboutNOSA from "../pages/public/AboutNOSA";
import NewsEvents from "../pages/public/NewsEvents";
import Gallery from "../pages/public/Gallery";
import Contact from "../pages/public/Contact";
import NOSALeadership from "../pages/public/NOSALeadership.jsx";
import NOSAChapters from "../pages/public/NOSAChapters.jsx";
import Olivetians from "../pages/public/Olivetians.jsx";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/about-school" element={<AboutSchool />} />

      <Route path="/about-nosa" element={<AboutNOSA />} />
      <Route path="/nosa-leadership" element={<NOSALeadership />} />
      <Route path="/nosa-chapters" element={<NOSAChapters />} />


      <Route path="/olivetians" element={<Olivetians />} />
     

      <Route path="/news" element={<NewsEvents />} />

      <Route path="/gallery" element={<Gallery />} />

      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}