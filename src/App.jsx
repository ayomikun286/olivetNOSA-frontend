import { Routes, Route } from "react-router-dom";

import PublicRoutes from "./routes/PublicRoutes";
import PortalRoutes from "./routes/PortalRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <Routes>

      {/* PUBLIC WEBSITE */}
      <Route path="/*" element={<PublicRoutes />} />

      {/* MEMBER PORTAL */}
      <Route path="/portal/*" element={<PortalRoutes />} />

      {/* ADMIN DASHBOARD */}
      <Route path="/admin/*" element={<AdminRoutes />} />

    </Routes>
  );
}

export default App;