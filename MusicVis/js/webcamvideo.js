/* ============================================================= */
/*     START of my own code - WebcamVideo visualisation START    */
/* ============================================================= */
function WebcamVideo() {
  this.name = "webcam video terrain";

  /* ---------- START of my own code - Basic Properties & State START ---------- */
  // Display name used by Visualisations menu system
  this.video = null;
  // Initialisation flag to prevent repeated camera creation
  this.initialised = false;
  /* ---------- END of my own code - Basic Properties & State END ---------- */

  /* ---------- START of my own code - WEBCAM INITIALISATION METHOD START ---------- */
  this.setup = function () {
    // Only create capture once 
    if (!this.video) {
      // real-time Video Processing
      // reference: https://p5js.org/reference/p5/createCapture/
      this.video = createCapture(VIDEO);
      this.video.size(width, height);
      this.video.hide();
      this.initialised = true;
    }
  };
  /* ---------- END of my own code - WEBCAM INITIALISATION METHOD END ---------- */

  /*-------------- START of my own code - Main draw function START -------------*/
  this.draw = function () {

    /* ---------- START of my own code - Webcam Initialisation Check START ---------- */
    // Ensure camera is set up before rendering
    if (!this.initialised) {
      this.setup();
      return;
    }

    // Safety guard if video stream failed
    if (!this.video) return;
    /* ---------- END of my own code - Webcam Initialisation Check END ---------- */

    /* ---------- START of my own code - Video Pixel Data Loading START ---------- */
    // Load current frame pixel data into pixels[]
    this.video.loadPixels();
    let spectrum = fourier.analyze();
    /* ---------- END of my own code - Video Pixel Data Loading END ---------- */

    // Prevent rendering before pixels are available (avoids black screen)
    if (this.video.pixels.length === 0) return;

    // Retrieve real-time transformation parameters from Controls menu
    let par = controls.menu.params;

    /* ---------- START of my own code - Transformation START ---------- */
    push()
    rotateX(par.rotateX);
    rotateY(par.rotateY);
    rotateZ(par.rotateZ);
    scale(par.scale);
    /* ---------- END of my own code - Transformation END ---------- */

    /*------------ START of my own code - Grid setup START --------------*/
    let boxSize = 50;
    let cols = int(this.video.width / boxSize);
    let rows = int(this.video.height / boxSize);
    let totalBoxes = cols * rows;
    /*------------- END of my own code - Grid setup END ----------------*/

    /*-------------- START of my own code - Grid iteration START ---------------*/
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        /*--------------- START of my own code - Pixel position calculation START ------------*/
        let pixelX = x * boxSize;
        let pixelY = y * boxSize;
        let index = (pixelY * this.video.width + pixelX) * 4;  // Pixel index in pixels array
        /*------------- END of my own code - Pixel position calculation END ---------------*/

        /*----------------- START of my own code - Color extraction START ------------------ */
        let r = this.video.pixels[index];     // Red channel value
        let g = this.video.pixels[index + 1]; // Green channel value
        let b = this.video.pixels[index + 2]; // Blue channel value
        let a = this.video.pixels[index + 3]; // Alpha channel value
        /*---------------- END of my own code - Color extraction END ---------------------*/

        /*----------------- START of my own code - Audio mapping calculation START --------------*/
        // Get box index
        let boxIndex = y * cols + x;

        // Map box index to sound index
        let specIndex = int(map(boxIndex, 0, totalBoxes - 1, 0, spectrum.length - 1));

        // get sound value
        let energy = spectrum[specIndex];
        /*------------------ END of my own code - Audio mapping calculation END ----------------*/

        /*--------------- START of my own code - Height calculation START ---------------*/
        // Map the height based on audio energy
        let h = map(energy, 0, 255, 10, 1000);
        /*--------------- END of my own code - Height calculation END -----------------*/

        push();
        /*--------------- START of my own code - 3D lighting setup START --------------*/
        colorMode(RGB, 255);

        // point light reference: https://p5js.org/reference/p5/pointLight/
        pointLight(255, 255, 255, width / 2, height / 2, 300);

        // ambientLight reference: https://p5js.org/reference/p5/ambientLight/
        ambientLight(255);
        /*------------- END of my own code - 3D lighting setup END -------------*/

        /*------------- START of my own code - Scene transformation START -------------*/
        rotateX(PI / 6);
        /*------------- END of my own code - Scene transformation END -------------*/

        /*------------- START of my own code - Box color and style START -------------*/
        fill(r, g, b, a);
        noStroke();
        /*------------- END of my own code - Box color and style END -------------*/

        /*------------- START of my own code - Box positioning START -------------*/
        translate(pixelX - width / 2, pixelY - height / 2, h / 2);
        rotateZ(r / 255 * TWO_PI * 0.1);
        /*------------- END of my own code - Box positioning END -------------*/

        /*------------- START of my own code - Box drawing START -------------*/
        // Apply the height and draw box
        box(boxSize - 2, boxSize - 2, h);
        pop();
        /*------------- END of my own code - Box drawing END -------------*/
      };
    };
    pop();
    /*------------- END of my own code - Grid iteration END -------------*/
  };

  /*-------------- END of my own code - Main draw function END -------------*/

};
/* ========================================================= */
/*    END of my own code - WebcamVideo visualisation END     */
/* ========================================================= */