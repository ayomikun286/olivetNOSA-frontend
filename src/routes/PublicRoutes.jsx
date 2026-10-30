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
import NotFound from "../pages/public/NotFound";
import Programs from "../pages/public/Programs.jsx";
import NewsEventDetails from "../pages/public/NewsEventDetails.jsx";
import InLovingMemory from "../pages/public/InLovingMemory.jsx";
import PrivacyPolicy from "../pages/public/PrivacyPolicy.jsx";
import Donation from "../pages/public/Donations.jsx";
import History from "../pages/public/History.jsx";
import TermsAndConditions from "../pages/public/TermsAndConditions";
import LegacyLeadership from "../pages/public/LegacyLeadership.jsx";
import DonationVerification from "../pages/public/DonationVerification.jsx";
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
      <Route
        path="/news-events/:slug"
        element={<NewsEventDetails />}
      />

      <Route path="/in-loving-memory" element={<InLovingMemory />} />
      <Route path="/gallery" element={<Gallery />} />

      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route
        path="/terms-and-conditions"
        element={<TermsAndConditions />}
      />
<Route path="/donation" element={<Donation />} />
<Route
  path="/donation/verify"
  element={<DonationVerification />}
/>
<Route path="/history" element={<History />} />
      <Route path="/legacy-leadership" element={<LegacyLeadership />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}