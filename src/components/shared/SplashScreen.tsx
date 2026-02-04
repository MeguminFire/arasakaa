export function SplashScreen() {
    return (
      <div className="splash-screen">
        <div className="kernel-code"></div>
        <div className="splash-content">
          <h1 className="splash-logo" data-text="SANDEVISTAN SYSTEMS">
            SANDEVISTAN SYSTEMS
          </h1>
          <div className="splash-progress-container">
            <p className="splash-progress-text">SYNCING NEURAL LINK...</p>
            <div className="splash-progress-bar">
              <div className="splash-progress-bar-inner"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  