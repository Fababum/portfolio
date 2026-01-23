import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div>404</div>
        <h1>Page Not Found</h1>
        <p>
          Oops! The page you're looking for doesn't exist.
        </p>
        <p>
          It might have been moved or deleted, or you may have mistyped the URL.
        </p>
        <div>
          <button onClick={() => navigate("/")}>
            Go to Home
          </button>
          <button onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
        <div>
          <p>Or explore these pages:</p>
          <div>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/chatBot">ChatBot</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
