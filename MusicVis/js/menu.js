/* ========================================= */
/* START of my own code - MENU CLASS START   */
/* ========================================= */
function Menu() {
  /* ---------- START of my own code - CORE PROPERTIES START ---------- */
  // UI state management
  this.rightMenuBtns = []
  this.menuDisplayed = true;
  this.visible = true;
  this.timer = null;

  // Centralised parameter state used by visualisations
  // This object acts as a single source of truth for transformations
  this.params = {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    drumCount: 25,
    heartCount: 60
  };
  /* ---------- END of my own code - CORE PROPERTIES END --------------- */


  /* ---------- START of my own code - UTILITY FUNCTIONS START ---------- */
  // Reusable hover styling utility to maintain UI consistency
  this.applyHoverStyle = function (btn) {
    btn.style('cursor', 'pointer');
    // Mouse enter effect
    btn.mouseOver(() => btn.style('background', '#00d4ff33'));
    // Mouse leave effect
    btn.mouseOut(() => btn.style('background', '#00d4ff'));
  }
  /* ---------- END of my own code - UTILITY FUNCTIONS END ---------- */


  /* ========================================================
     LEFT PANEL (Visual Selection + Transformation Controls)
     Responsible for:
     - Visualisation selection
     - Rotation (X, Y, Z)
     - Scale control
     - Reset button
  ======================================================== */
  /* ---------------- START of my own code - LEFT PANEL START -------------*/
  /* ---------- START of my own code - Layout & Glassmorphism Styling START ---------- */
  this.leftMenu = select("#leftMenu");
  this.leftMenu.style('position', 'fixed');
  this.leftMenu.style('top', "0%");
  this.leftMenu.style('left', '0%');
  this.leftMenu.style('width', '15%');
  this.leftMenu.style('height', '80%');
  this.leftMenu.style('z-index', '9998');

  this.leftMenu.style('background', 'rgba(15, 15, 15, 0.75)');
  this.leftMenu.style('backdrop-filter', 'blur(12px)');
  this.leftMenu.style('border', '1px solid rgba(255, 255, 255, 0.1)');
  this.leftMenu.style('border-radius', '15px');
  this.leftMenu.style('padding', '25px');
  this.leftMenu.style('color', '#00d4ff');
  this.leftMenu.style('font-family', 'system-ui, -apple-system, sans-serif');
  this.leftMenu.style('box-shadow', '0 10px 30px rgba(0,0,0,0.5)');
  this.leftMenu.style('transition', 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)');
  this.leftMenu.style('transform', 'translateX(-120%)');
  /* ---------- END of my own code - Layout & Glassmorphism Styling END ---------- */


  /* ---------- START of my own code - Visual Selection Section START ---------- */
  this.leftMenuTitle = createDiv();
  this.leftMenuTitle.parent(this.leftMenu)
  this.leftMenuTitle.elt.innerHTML = "VISUALISATIONS"
  // create left side menu title END

  // create select element
  this.leftMenuVisSelect = createSelect();
  this.leftMenuVisSelect.parent(this.leftMenu);

  // iterate visualisations and add to left side visualisation selection option
  for (let i = 0; i < vis.visuals.length; i++) {
    let visName = vis.visuals[i].name
    this.leftMenuVisSelect.option(visName)
  }

  // left side select css style
  this.leftMenuVisSelect.style('width', '100%');
  this.leftMenuVisSelect.style('padding', '8px');
  this.leftMenuVisSelect.style('background', 'rgba(13, 13, 13, 0.8)');
  this.leftMenuVisSelect.style('border', '1px solid rgba(255,255,255,0.2)');
  this.leftMenuVisSelect.style('border-radius', '8px');
  this.leftMenuVisSelect.style('color', 'white');
  this.leftMenuVisSelect.style('margin-bottom', '30px');
  this.leftMenuVisSelect.style('font-weight', '30');
  this.leftMenuVisSelect.style('font-size', '10px');
  this.leftMenuVisSelect.style('color', '#00d4ff');
  this.leftMenuTitle.style('font-weight', '700');
  this.leftMenuTitle.style('font-size', '12px');
  this.leftMenuTitle.style('letter-spacing', '2px');
  this.leftMenuTitle.style('margin-bottom', '10%');
  /* ---------- END of my own code - Visual Selection Section END ---------- */


  /* ----- START of my own code - TRANSFORMATION CONTROLS (ROTATE & SCALE) START ----- */
  // create control for rotate and scale
  this.rotateDivs = createDiv();
  this.rotateDivs.parent(this.leftMenu);

  this.rotateP = createP("CONTROLS");
  this.rotateP.parent(this.rotateDivs);
  this.rotateP.style('font-size', '12px');
  this.rotateP.style('font-weight', '700');
  this.rotateP.style('margin', '80% 0 15px 0');
  this.rotateP.style('border-bottom', '1px solid rgba(255,255,255,0.1)');

  // add css style
  const applyRowStyle = (div, span, slider) => {
    div.style('display', 'flex');
    div.style('align-items', 'center');
    div.style('justify-content', 'space-between');
    div.style('margin-bottom', '5%');
    span.style('font-size', '10px');
    slider.style('width', '70%');
    slider.style('cursor', 'pointer');
  };


  // Scale control (global visual scaling factor)
  this.scaleDiv = createDiv();
  this.scaleDiv.parent(this.leftMenu)
  this.scaleSpan = createSpan('Scale :');
  this.scaleSpan.parent(this.scaleDiv);

  this.scaleSlider = createSlider(0, 5, 1, 0.1);
  this.scaleSlider.parent(this.scaleDiv);
  applyRowStyle(this.scaleDiv, this.scaleSpan, this.scaleSlider);


  // create rotate X div
  this.rotateXDiv = createDiv();
  this.rotateXDiv.parent(this.rotateDivs)
  this.rotateXSpan = createSpan('Rotate X :');
  this.rotateXSpan.parent(this.rotateXDiv);

  this.rotateXSlider = createSlider(0, radians(360), 0, 0.001);
  this.rotateXSlider.parent(this.rotateXDiv);
  applyRowStyle(this.rotateXDiv, this.rotateXSpan, this.rotateXSlider);


  // create rotate Y div
  this.rotateYDiv = createDiv();
  this.rotateYDiv.parent(this.rotateDivs)
  this.rotateYSpan = createSpan('Rotate Y :');
  this.rotateYSpan.parent(this.rotateYDiv);
  this.rotateYSlider = createSlider(0, radians(360), 0, 0.001);
  this.rotateYSlider.parent(this.rotateYDiv);
  applyRowStyle(this.rotateYDiv, this.rotateYSpan, this.rotateYSlider);


  // create rotate Z div
  this.rotateZDiv = createDiv();
  this.rotateZDiv.parent(this.rotateDivs)
  this.rotateZSpan = createSpan('Rotate Z :');
  this.rotateZSpan.parent(this.rotateZDiv);

  this.rotateZSlider = createSlider(0, radians(360), 0, 0.001);
  this.rotateZSlider.parent(this.rotateZDiv);
  applyRowStyle(this.rotateZDiv, this.rotateZSpan, this.rotateZSlider);
  /* ----- END of my own code - TRANSFORMATION CONTROLS (ROTATE & SCALE) END ----- */


  /* ---------- START of my own code - Default Orientation Logic START ---------- */
  // Sets default transformation parameters based on selected visualisation
  // This ensures each visual starts with an optimal viewing angle
  this.updateRotateDefault = function () {
    let currentVis = this.leftMenuVisSelect.value();
    if (currentVis === "heart glow") {
      this.rotateXSlider.value(radians(0));
      this.rotateYSlider.value(radians(310));
      this.rotateZSlider.value(radians(0));
      this.scaleSlider.value(0.8);
    } else if (currentVis === "drums beat") {
      this.rotateXSlider.value(radians(60));
      this.rotateYSlider.value(radians(0));
      this.rotateZSlider.value(radians(0));
      this.scaleSlider.value(0.6)
    } else if (currentVis === "webcam video terrain") {
      this.rotateXSlider.value(radians(30));
      this.rotateYSlider.value(radians(0));
      this.rotateZSlider.value(radians(0));
      this.scaleSlider.value(0.3)
    }
  }
  /* ---------- END of my own code - Default Orientation Logic END ---------- */

  /* ----- START of my own code - RESET BUTTON START ----- */
  // Reset button - restores default transformation values
  this.resetBtn = createButton('RESET');
  this.resetBtn.parent(this.leftMenu);
  this.resetBtn.style('width', '100%');
  this.resetBtn.style('height', '5%');
  this.resetBtn.style('margin-top', '5%');
  this.resetBtn.style('background', '#00d4ff');
  this.resetBtn.style('color', '#fff');
  this.resetBtn.style('border', '1px solid #00d4ff');
  this.resetBtn.style('border-radius', '6px');
  this.resetBtn.style('font-weight', '70');
  this.resetBtn.style('font-size', '10px');
  this.resetBtn.style('font-align', 'CENTER');
  this.resetBtn.style('transition', 'all 0.2s');

  // reset button mouseover effect
  this.applyHoverStyle(this.resetBtn)
  /* ----- END of my own code - RESET BUTTON END ----- */

  /* --------------- END of my own code - LEFT PANEL END --------------------*/


  /* ========================================================
   RIGHT PANEL (Music Selection Panel)
   Responsible for:
   - Displaying available audio tracks
   - Triggering sound playback
  ======================================================== */
  /* ---------------- START of my own code - RIGHT PANEL START --------------------*/
  this.rightMenu = select("#rightMenu");
  this.rightMenu.style('position', 'fixed');
  this.rightMenu.style('top', '0%');
  this.rightMenu.style('right', '0%');
  this.rightMenu.style('width', '15%');
  this.rightMenu.style('height', '80%');
  this.rightMenu.style('z-index', '9998');
  this.rightMenu.style('background', 'rgba(15, 15, 15, 0.75)');
  this.rightMenu.style('backdrop-filter', 'blur(12px)');
  this.rightMenu.style('border', '1px solid rgba(255, 255, 255, 0.1)');
  this.rightMenu.style('border-radius', '15px');
  this.rightMenu.style('padding', '25px');
  this.rightMenu.style('color', '#00d4ff');
  this.rightMenu.style('font-family', 'system-ui, -apple-system, sans-serif');
  this.rightMenu.style('box-shadow', '0 10px 30px rgba(0,0,0,0.5)');
  this.rightMenu.style('transition', 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)');
  this.rightMenu.style('transform', 'translateX(120%)');

  this.rightMenuTitle = createDiv();
  this.rightMenuTitle.parent(this.rightMenu)
  this.rightMenuTitle.elt.innerHTML = "MUSIC SELECTION"

  this.rightMenuTitle.style('font-weight', '700');
  this.rightMenuTitle.style('font-size', '12px');
  this.rightMenuTitle.style('letter-spacing', '2px');
  this.rightMenuTitle.style('margin-bottom', '10%');


  // Panel styling omitted for brevity
  for (let i = 0; i < sounds.length; i++) {
    btn = createButton(sounds[i].name)
    btn.parent(this.rightMenu);
    btn.style('width', '90%');
    btn.style('height', '5%');
    btn.style('background', '#00d4ff');
    btn.style('border', '1px solid #00d4ff');
    btn.style('border-radius', '5px');
    btn.style('color', 'white');
    btn.style('margin-bottom', '5%');
    btn.style('font-weight', '70');
    btn.style('font-size', '10px');
    btn.style('font-align', 'CENTER');
    btn.style('color', '#fff');

    this.rightMenuBtns.push(btn)
  }
  /* --------------- END of my own code - RIGHT PANEL END --------------*/


  /* ========================================================
     BOTTOM PANEL (Playback & System Controls Container)
     - Playback button
     - playforward button
     - Rewind button
     - Volume control slider
     - Fullscreen button
  ======================================================== */
  /* ----------------- START of my own code - BOTTOM PANEL START ------------------*/
  this.bottomMenu = select("#bottomMenu");
  this.bottomMenu.style('position', 'fixed');
  this.bottomMenu.style('bottom', '0');
  this.bottomMenu.style('left', '0');
  this.bottomMenu.style('width', '100%');
  this.bottomMenu.style('height', '20%');
  this.bottomMenu.style('z-index', '9999');
  this.bottomMenu.style('background', 'rgba(255, 255, 255, 0.03)');
  this.bottomMenu.style('backdrop-filter', 'blur(10px)');
  this.bottomMenu.style('border-top', '1px solid rgba(255, 255, 255, 0.2)');
  this.bottomMenu.style('transition', 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)');
  this.bottomMenu.style('transform', 'translateY(100%)');
  /* ---------------- END of my own code - BOTTOM PANEL END ------------------*/


  /* ---------- START of my own code - AUTO-HIDE TIMER LOGIC START ---------- */
  // Toggles visibility of all UI panels with animated transitions
  this.toggleMenu = function () {
    this.visible = !this.visible;
    if (this.visible) {
      this.leftMenu.style('transform', 'translateX(0%)');
      this.rightMenu.style('transform', 'translateX(0%)');
      this.bottomMenu.style('transform', 'translateY(0%)');
      this.resetTimer();
    } else {
      this.leftMenu.style('transform', 'translateX(-120%)');
      this.rightMenu.style('transform', 'translateX(120%)');
      this.bottomMenu.style('transform', 'translateY(100%)');
      this.clearTimer();
    }
  };

  /* ---------- START of my own code - AUTO - HIDE SYSTEM START ---------- */
  // Toggles visibility of all UI panels with animated transitions
  this.resetTimer = function () {
    this.clearTimer();
    this.timer = setTimeout(() => {
      if (this.visible) {
        this.toggleMenu();
      }
    }, 15000); // 15s
  };
  /* ---------- END of my own code - AUTO - HIDE SYSTEM END ---------- */

  /* ---------- START of my own code - AUTO-HIDE TIMER LOGIC START ---------- */
  this.clearTimer = function () {
    if (this.timer) clearTimeout(this.timer);
  };
  /* ---------- END of my own code - AUTO-HIDE TIMER LOGIC END ---------- */

  /* ---------- START of my own code - EVENT BINDING (USER INTERACTION) START ---------- */
  this.leftMenu.mousePressed(() => {
    this.resetTimer();
  });

  this.leftMenuVisSelect.mousePressed(() => this.resetTimer());
  this.rotateXSlider.mousePressed(() => this.resetTimer());
  this.rotateYSlider.mousePressed(() => this.resetTimer());
  this.rotateZSlider.mousePressed(() => this.resetTimer());
  this.scaleSlider.mousePressed(() => this.resetTimer());
  this.resetBtn.mousePressed(() => this.resetTimer());
  /* ---------- END of my own code - EVENT BINDING (USER INTERACTION) END ---------- */

  // Callback reference injected by Controller
  // Used to notify system when visual selection changes
  this.onVisualChange = null;

  this.leftMenuVisSelect.changed(() => {
    if (this.onVisualChange) {
      this.onVisualChange(this.leftMenuVisSelect.value());
    }
    this.updateRotateDefault();
  });

  // reset values
  this.resetBtn.mousePressed(() => {
    this.updateRotateDefault()
  })


  this.updateRotateDefault();
  this.toggleMenu();
  this.resetTimer();

  /* ========================================================
     PARAMETER SYNCHRONISATION LOOP
     --------------------------------------------------------
     Executed every frame by Controller.
     Updates shared state from UI.
  ======================================================== */
  /* -------------- START of my own code - MENU DRAW (STATE UPDATE) START ----------------*/
  this.menuDraw = function () {
    this.params.rotateX = this.rotateXSlider.value();
    this.params.rotateY = this.rotateYSlider.value();
    this.params.rotateZ = this.rotateZSlider.value();
    this.params.scale = this.scaleSlider.value();
  };
  /* -------------- END of my own code - MENU DRAW (STATE UPDATE) END --------------*/
}
/* ========================================= */
/* END of my own code - MENU CLASS END       */
/* ========================================= */

