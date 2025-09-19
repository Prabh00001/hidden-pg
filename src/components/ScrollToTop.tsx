import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // stop the browser from restoring scroll on refresh/back/forward
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // if there is a hash, try to scroll to that element
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // small timeout so the element exists after route mount
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
        return;
      }
    }

    // otherwise, go to top
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    // fallback for older browsers
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, key]); // key changes on refresh, so this also runs on reload

  return null;
}
