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

              // After explosion completes (2 seconds), fade back to original
              setTimeout(() => {
                setTextFading(true);
                setTimeout(() => {
                  setShowWelcome(false);
                  setTextFading(false);
                  setShowExplosion(false);
                  // Reset to unlocked state so it can be triggered again
                  setIsLocked(false);
                }, 500);
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
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={
                {
                  "--angle": `${(360 / 30) * i}deg`,
                  "--delay": `${Math.random() * 0.3}s`,
                  "--distance": `${300 + Math.random() * 200}px`,
                } as React.CSSProperties
              }
            />
          ))}
          <div className="shockwave" />
          <div className="screen-flash" />
        </>
      )}
    </div>
  );
}

export default Home;
