import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="error-submessage">
          It might have been moved or deleted, or you may have mistyped the URL.
        </p>
        <div className="error-actions">
          <button className="btn-home" onClick={() => navigate("/")}>
            Go to Home
          </button>
          <button className="btn-back" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
        <div className="error-links">
          <p>Or explore these pages:</p>
          <div className="quick-links">
            <a href="/about">About</a>
            <a href="/projects">Projects</a>
            <a href="/contact">Contact</a>
            <a href="/chatBot">ChatBot</a>
          </div>
        </div>
      </div>
      <div className="error-decoration">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
    </div>
  );
}

export default NotFound;
