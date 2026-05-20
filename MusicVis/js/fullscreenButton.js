/* ========================================================= */
/* START of my own code - FullscreenButton UI CLASS START    */
/* ========================================================= */
function FullscreenButton() {

  /* ---------- START of my own code - Layout & State Properties START ---------- */
  this.relX = 1;            // Relative X (right side anchor)
  this.relY = 1;            // Relative Y (bottom anchor)
  this.r = 50;              // Button size (radius/width/height)
  this.fullscreenBtn = null; // p5 DOM button instance
  this.isFullscreen = false; // Current fullscreen state flag
  /* ---------- END of my own code - Layout & State Properties END ---------- */


  /* ---------- START of my own code - External Callback (Controller Injected) START ---------- */
  // This callback is injected by Controller to handle fullscreen logic
  // (Decouples UI from actual fullscreen control)
  this.onToggle = null;
  /* ---------- END of my own code - External Callback (Controller Injected) END ---------- */


  /* ------------------------------------------------------------------ */
  /* START of my own code - Fullscreen Button Creation & Drawing START  */
  /* ------------------------------------------------------------------ */
  this.drawFullscreenBtn = () => {

    /* ----- START of my own code - Lazy Initialization START ----- */
    // Create the button only once to avoid duplicate DOM elements
    if (!this.fullscreenBtn) {
      /* ----- START of my own code - Button Element Creation START ----- */
      this.fullscreenBtn = createButton('⛶');
      this.fullscreenBtn.parent(select("#bottomMenu"));
      this.fullscreenBtn.size(this.r, this.r);
      /* ----- END of my own code - Button Element Creation END ----- */


      /* ----- START of my own code - Base Style Setup START ----- */
      // Styling for minimal futuristic UI appearance
      this.fullscreenBtn.style('position', 'absolute');
      this.fullscreenBtn.style('z-index', '10');
      this.fullscreenBtn.style('background', 'transparent');
      this.fullscreenBtn.style('border', '1px solid rgba(255,255,255,0.5)');
      this.fullscreenBtn.style('color', 'white');
      this.fullscreenBtn.style('outline', 'none');
      this.fullscreenBtn.style('font-size', '20px');
      this.fullscreenBtn.style('font-weight', 'bold');
      this.fullscreenBtn.style('cursor', 'pointer');
      this.fullscreenBtn.style('border-radius', '50%');
      this.fullscreenBtn.style('transition', 'all 0.3s ease');
      this.fullscreenBtn.style('box-shadow', '0 0 5px rgba(255,255,255,0.2)');
      /* ----- END of my own code - Base Style Setup END ----- */


      /* ----- START of my own code - Hover Interaction Effects START ----- */
      // Enhance UX with hover animation and glow effect
      this.fullscreenBtn.mouseOver(() => {
        this.fullscreenBtn.style('background', 'rgba(255,255,255,0.1)');
        this.fullscreenBtn.style('transform', 'scale(1.2)');
        this.fullscreenBtn.style('box-shadow', '0 0 10px rgba(255,255,255,0.4)');
      });

      this.fullscreenBtn.mouseOut(() => {
        this.fullscreenBtn.style('background', 'transparent');
        this.fullscreenBtn.style('transform', 'scale(1)');
        this.fullscreenBtn.style('box-shadow', '0 0 5px rgba(255,255,255,0.2)');
      });
      /* ----- END of my own code - Hover Interaction Effects END ----- */


      /* ----- START of my own code - Click / Toggle Logic START ----- */
      // Do NOT directly control fullscreen here
      // Delegate logic to external Controller via callback
      this.fullscreenBtn.mousePressed(() => {
        if (this.onToggle) {
          this.onToggle();
        }
      });
      /* ----- END of my own code - Click / Toggle Logic END ----- */
    }
    /* ----- END of my own code - Lazy Initialization END ----- */


    /* ----- START of my own code - Initial Position Update START ----- */
    // Ensure correct placement after creation
    this.updatePosition();
    /* ----- END of my own code - Initial Position Update END ----- */

  };

  /* ---------------------------------------------------------------- */
  /* END of my own code - Fullscreen Button Creation & Drawing END    */
  /* ---------------------------------------------------------------- */


  /* ---------- START of my own code - Icon Update Method START ---------- */
  // Updates button icon based on fullscreen state
  this.setIcon = (isFullscreen) => {
    this.fullscreenBtn.html(isFullscreen ? '🗗' : '⛶');
  };
  /* ---------- END of my own code - Icon Update Method END ---------- */


  /* ---------- START of my own code - Position Calculation & Update START ---------- */
  // Dynamically positions the button relative to canvas size
  this.updatePosition = () => {
    const x = width;          // Right edge of canvas
    const y = height * 0.2;   // Vertical reference area (top UI zone)

    // Offset positioning (right padding + vertical centering)
    this.fullscreenBtn.position(
      x - this.r - 20,
      y / 2 - this.r / 2
    );
  };
  /* ---------- END of my own code - Position Calculation & Update END ---------- */


  /* ---------- START of my own code - Resize Handler START ---------- */
  // Called when canvas/window is resized
  // Keeps button aligned with responsive layout
  this.onResize = () => {
    this.updatePosition();
  };
  /* ---------- END of my own code - Resize Handler END ---------- */

}

/* ========================================================= */
/* END of my own code - FullscreenButton UI CLASS END        */
/* ========================================================= */