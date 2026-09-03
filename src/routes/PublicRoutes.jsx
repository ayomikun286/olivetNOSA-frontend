import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import AboutSchool from "../pages/public/AboutSchool";
import AboutNOSA from "../pages/public/AboutNOSA";
import Programs from "../pages/public/Programs";
import News from "../pages/public/News";
import Events from "../pages/public/Events";
import Gallery from "../pages/public/Gallery";
import Contact from "../pages/public/Contact";
import NOSALeadership from "../pages/public/NOSALeadership.jsx";
import NOSAChapters from "../pages/public/NOSAChapters.jsx";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/about-school" element={<AboutSchool />} />

      <Route path="/about-nosa" element={<AboutNOSA />} />
      <Route path="/nosa-leadership" element={<NOSALeadership />} />
      <Route path="/nosa-chapters" element={<NOSAChapters />} />

      <Route path="/programs" element={<Programs />} />

      <Route path="/news" element={<News />} />

      <Route path="/events" element={<Events />} />

      <Route path="/gallery" element={<Gallery />} />

      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}