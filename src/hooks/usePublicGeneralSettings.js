
import { useEffect, useState } from "react";
import { getPublicGeneralSettings } from "../services/adminService.js";

const usePublicGeneralSettings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getPublicGeneralSettings()
      .then((data) => {
        if (isMounted) setSettings(data);
      })
      .catch((error) => {
        console.error("Failed to load public settings:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return settings;
};

export default usePublicGeneralSettings;
