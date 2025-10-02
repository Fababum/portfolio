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

  if (isChecking) {
    return null; // Show nothing while checking
  }

  if (!isBlocked) {
    return null; // User is not blocked
  }

  // Full-page block for blacklisted users
  return (
    <div className="blocked-page">
      <div className="blocked-container">
        <div className="blocked-icon-large">🚫</div>
        <h1 className="blocked-title">403</h1>
        <h2 className="blocked-subtitle">ACCESS DENIED</h2>
        <p className="blocked-message">
          Your access to this website has been restricted by the administrator.
        </p>
        <p className="blocked-reason">
          If you believe this is an error, please contact the site
          administrator.
        </p>
        <div className="blocked-footer">
          <p>Error Code: BLACKLISTED_USER</p>
          <p>Request ID: {getUserId().substring(0, 8)}</p>
        </div>
      </div>
    </div>
  );
};

export default BlockedBanner;
