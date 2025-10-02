import { useState, useEffect } from "react";
import "./home.css";

function Home() {
  const [isLocked, setIsLocked] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showLockAnimation, setShowLockAnimation] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [textFading, setTextFading] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showYouTubeMessage, setShowYouTubeMessage] = useState(false);

  const handleMouseEnter = () => {
    if (isLocked) return;

    setIsHovering(true);
    setProgress(0);

    // Clear any existing timer
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }

    // Set a new timer to lock after 2 seconds
    const timer = window.setTimeout(() => {
      setProgress(100);
      setShowLockAnimation(true);

      // Hide progress bar and lock animation after animation completes
      setTimeout(() => {
        setIsHovering(false);
        setIsLocked(true);
        setTimeout(() => {
          setShowLockAnimation(false);

          // Start text transition
          setTimeout(() => {
            setTextFading(true);
            setTimeout(() => {
              setShowWelcome(true);
              setTextFading(false);
              // Trigger explosion instantly when welcome text appears
              setShowExplosion(true);
              // Show YouTube message after explosion starts
              setTimeout(() => {
                setShowYouTubeMessage(true);
                // After 20 seconds, fade everything back to original
                setTimeout(() => {
                  setShowYouTubeMessage(false);
                  setTextFading(true);
                  setTimeout(() => {
                    setShowWelcome(false);
                    setTextFading(false);
                    setIsLocked(false); // Allow triggering again
                  }, 500);
                }, 20000);
              }, 500);

              // After explosion completes (2 seconds), just hide explosion effects
              setTimeout(() => {
                setShowExplosion(false);
                // Keep welcome text and locked state temporarily
              }, 2000);
            }, 500);
          }, 300);
        }, 100);
      }, 600);
    }, 2000);

    setHoverTimer(timer);

    // Animate progress bar
    const startTime = Date.now();
    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / 2000) * 100, 100);
      setProgress(newProgress);

      if (elapsed < 2000) {
        requestAnimationFrame(animateProgress);
      }
    };
    requestAnimationFrame(animateProgress);
  };

  const handleMouseLeave = () => {
    if (isLocked) return;

    setIsHovering(false);
    setProgress(0);

    // Clear the timer if mouse leaves before locking
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    };
  }, [hoverTimer]);

  return (
    <div className={`home-wrapper ${showExplosion ? "explosion-active" : ""}`}>
      <h1
        className={`${isLocked ? "locked" : ""} ${
          showLockAnimation ? "flash" : ""
        } ${textFading ? "fade-out" : "fade-in"} ${
          showExplosion ? "explode" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showWelcome ? "Welcome to my Website" : "Fabian's Portfolio Website"}
      </h1>
      {isHovering && !isLocked && (
        <div className="progress-bar-container">
          <div
            className={`progress-bar ${
              showLockAnimation ? "lock-complete" : ""
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {showExplosion && (
        <>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={
                {
                  "--angle": `${(360 / 20) * i}deg`,
                  "--delay": `${Math.random() * 0.2}s`,
                  "--distance": `${250 + Math.random() * 150}px`,
                } as React.CSSProperties
              }
            />
          ))}
          <div className="shockwave" />
          <div className="screen-flash" />
        </>
      )}
      {showYouTubeMessage && (
        <div className="youtube-message">
          <p>Pwease follow me 🥺</p>
          <a
            href="https://www.youtube.com/@Fababum"
            target="_blank"
            rel="noopener noreferrer"
            className="youtube-link"
          >
            https://www.youtube.com/@Fababum
          </a>
        </div>
      )}
    </div>
  );
}

export default Home;
