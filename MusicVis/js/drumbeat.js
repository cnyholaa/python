/* ========================================================= */
/* START of my own code - DrumBeat VISUALISATION CLASS START */
/* ========================================================= */
function DrumBeat() {

  /* ---------- START of my own code - Basic Properties START ---------- */
  this.name = "drums beat";
  this.r = 20;        // Cylinder radius
  this.baseH = 5;     // Base cylinder height
  this.stars = [];    // Array storing star particles
  /* ---------- END of my own code - Basic Properties END ---------- */


  /* ---------- START of my own code - Main Draw Function START ---------- */
  this.draw = function () {

    push();

    /* ----- START of my own code - Camera Control START ----- */
    // reference: https://p5js.org/reference/p5/orbitControl/
    orbitControl();
    /* ----- END of my own code - Camera Control END ----- */


    /* ----- START of my own code - Menu Transform Parameters START ----- */
    let par = controls.menu.params;
    rotateX(par.rotateX);
    rotateY(par.rotateY);
    rotateZ(par.rotateZ);
    scale(par.scale);
    /* ----- END of my own code - Menu Transform Parameters END ----- */


    /* ----- START of my own code - Audio Data Processing START ----- */
    let wave = fourier.waveform();  // Get waveform data
    const drumN = 25;               // Number of drums
    const circleR = min(width, height) * 0.5;  // Radius of circular layout
    /* ----- END of my own code - Audio Data Processing END ----- */


    /* ----------------------------------------------------------------- */
    /* START of my own code - Drum Cylinder Drawing Loop START           */
    /* ----------------------------------------------------------------- */
    for (let i = 0; i < drumN; i++) {
      push();

      /* ----- START of my own code - Circular Position Calculation START ----- */
      // reference: https://en.wikipedia.org/wiki/Parametric_equation
      let angle = map(i, 0, drumN, 0, TWO_PI);
      let x = cos(angle) * circleR;
      let y = sin(angle) * circleR;
      /* ----- END of my own code - Circular Position Calculation END ----- */


      /* ----- START of my own code - Waveform Extraction START ----- */
      let index = int(map(i, 0, drumN, 0, wave.length));
      let waveV = wave[index];   // Waveform value range: -1 to 1
      /* ----- END of my own code - Waveform Extraction END ----- */


      /* ----- START of my own code - Height Calculation START ----- */
      let drumH = this.baseH + pow(abs(waveV), 2) * 500;
      /* ----- END of my own code - Height Calculation END ----- */


      /* ----- START of my own code - Drum Transformation START ----- */
      translate(x, y, drumH / 2);
      rotateX(PI / 2);     // Make cylinder vertical
      strokeWeight(0.3);
      /* ----- END of my own code - Drum Transformation END ----- */


      /* ----- START of my own code - Colour Calculation START ----- */
      let hue = map(angle, 0, TWO_PI, 0, 360);
      let saturation = 90;
      let brightness = 80 + abs(waveV) * 100;
      fill(hue, saturation, brightness);
      /* ----- END of my own code - Colour Calculation END ----- */


      /* ----- START of my own code - Cylinder Drawing START ----- */
      cylinder(this.r, drumH);
      /* ----- END of my own code - Cylinder Drawing END ----- */

      pop();

      /* ----- START of my own code - Star Emission Logic START ----- */
      if (sound.isPlaying()) {
        let intensity = abs(waveV);
        if (random() < intensity * 0.3) {
          this.stars.push(
            new Star(x, y, drumH, hue, saturation, brightness)
          );
        }
      }
      /* ----- END of my own code - Star Emission Logic END ----- */
    }
    /* ---------------------------------------------------------------- */
    /* END of my own code - Drum Cylinder Drawing Loop END              */
    /* ---------------------------------------------------------------- */


    /* ------------------------------------------------------------------ */
    /* START of my own code - Star Particle Management START              */
    /* -------------------------------------------------------------------*/
    for (let i = this.stars.length - 1; i >= 0; i--) {
      this.stars[i].move();
      this.stars[i].draw();
      if (this.stars[i].life <= 0) {
        this.stars.splice(i, 1);
      }
    }
    /* ---------------------------------------------------------------- */
    /* END of my own code - Star Particle Management END                */
    /* ---------------------------------------------------------------- */
    pop();
  };
  /* ---------- END of my own code - Main Draw Function END ---------- */

}


/* ------------------------------------------------------------ */
/* START of my own code - Star PARTICLE CLASS START             */
/* ------------------------------------------------------------ */
function Star(x, y, z, hue, sat, bri) {

  /* ---------- START of my own code - Initial Properties START ---------- */
  this.x = x + random(-2, 2);
  this.y = y + random(-2, 2);
  this.z = z;
  this.life = 500;
  this.hue = hue;
  this.sat = sat;
  this.bri = bri;
  /* ---------- END of my own code - Initial Properties END ---------- */


  /* ---------- START of my own code - Velocity Setup START ---------- */
  this.speedX = random(-0.5, 0.5);
  this.speedY = random(-0.5, 0.5);
  this.speedZ = 0.05 + (z - 5) / 15;
  /* ---------- END of my own code - Velocity Setup END ---------- */


  /* ---------- START of my own code - Movement Function START ---------- */
  this.move = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    this.z += this.speedZ;
    this.life -= 3;
  };
  /* ---------- END of my own code - Movement Function END ---------- */


  /* ---------- START of my own code - Drawing Function START ---------- */
  this.draw = function () {
    push();
    stroke(this.hue, this.sat, this.bri);
    strokeWeight(5);
    point(this.x, this.y, this.z);
    pop();
  };
  /* ---------- END of my own code - Drawing Function END ---------- */

  /* ------------------------------------------------------------ */
  /* END of my own code - Star PARTICLE CLASS END                 */
  /* ------------------------------------------------------------ */
}
/* ========================================================= */
/* END of my own code - DrumBeat VISUALISATION CLASS END     */
/* ========================================================= */