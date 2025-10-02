import { useState, useEffect } from "react";
import { getUserId } from "../utils/userCookie";
import "./BlockedBanner.css";

const BlockedBanner = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const userId = getUserId();
      const response = await fetch(`/api/admin/check-status?userId=${userId}`);

      if (response.ok) {
        const data = await response.json();
        setIsBlocked(data.status === "blacklisted");
      }
    } catch (error) {
      console.error("Error checking user status:", error);
    } finally {
      setIsChecking(false);
    }
  };

  if (isChecking || !isBlocked) {
    return null;
  }

  return (
    <div className="blocked-banner">
      <div className="blocked-content">
        <span className="blocked-icon">🚫</span>
        <div className="blocked-text">
          <h3>Access Restricted</h3>
          <p>
            Your account has been restricted by the administrator. Some features
            may be unavailable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlockedBanner;
