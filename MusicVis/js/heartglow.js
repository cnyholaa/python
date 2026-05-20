/* ============================================================= */
/* START of my own code - HeartGlow VISUALISATION CLASS START    */
/* ============================================================= */
function HeartGlow() {
  /* ---------- START of my own code - Core Properties START ---------- */
  this.name = "heart glow";
  this.spawnParticles = false;   // Controls particle emission
  this.particles = [];           // Particle storage array
  this.zOffset = 0;              // Z-axis displacement (beat jump)
  this.beatDetector = new BeatDetector();  // Beat detection system
  /* ---------- END of my own code - Core Properties END ---------- */


  /* ---------- START of my own code - Off-Screen Buffer Setup START ---------- */
  // Used to pre-render glow texture for performance optimisation
  // reference: https://p5js.org/reference/p5/createGraphics/
  this.pg = createGraphics(100, 100);
  /* ---------- END of my own code - Off-Screen Buffer Setup END ---------- */


  /* -------------------------------------------------------------- */
  /* START of my own code - Heart Parametric Shape Definition START */
  /* -------------------------------------------------------------- */
  // Mathematical heart curve (Wolfram reference)
  this.drawheartShapeFormat = function (r, ctx) {

    let target = ctx || window;
    target.beginShape();

    for (let a = 0; a < TWO_PI; a += 0.05) {
      /* ----- START of my own code - Parametric Equation START ----- */
      // Heart Curve Parametric Equation reference: https://mathworld.wolfram.com/HeartCurve.html
      let xh = 16 * pow(sin(a), 3);
      let yh = 13 * cos(a)
        - 5 * cos(2 * a)
        - 2 * cos(3 * a)
        - cos(4 * a);
      /* ----- END of my own code - Parametric Equation END ----- */
      target.vertex(xh * r, -yh * r);
    }

    target.endShape(CLOSE);
  };

  /* ------------------------------------------------------------ */
  /* END of my own code - Heart Parametric Shape Definition END   */
  /* ------------------------------------------------------------ */


  /* ---------- START of my own code - Pre-render Glow Texture START ---------- */
  this.drawGraphic = function () {
    this.pg.clear();
    this.pg.push();
    this.pg.translate(50, 50);
    this.pg.stroke(255);
    this.pg.strokeWeight(8);
    this.pg.noFill();

    // Shadow blur creates glow halo effect
    this.pg.drawingContext.shadowBlur = 50;
    this.pg.drawingContext.shadowColor = 'white';
    this.drawheartShapeFormat(2, this.pg);
    this.pg.pop();
  };
  /* ---------- END of my own code - Pre-render Glow Texture END ---------- */


  /* ---------- START of my own code - Initial Buffer Rendering START ---------- */
  this.drawGraphic();
  /* ---------- END of my own code - Initial Buffer Rendering END ---------- */


  /* ----------------------------------------------------------- */
  /* START of my own code - Main Draw Function START             */
  /* ----------------------------------------------------------- */
  this.draw = function () {
    /* ----- START of my own code - Scene Setup START ----- */
    colorMode(HSB);
    background(230, 60, 10);

    this.spectrum = fourier.analyze();
    this.wave = fourier.waveform();
    /* ----- END of my own code - Scene Setup END ----- */


    /* ----- START of my own code - Beat Detection & Physical Response START ----- */
    push();

    let par = controls.menu.params;
    translate(0, 0, -1000);
    rotateX(par.rotateX);
    rotateY(par.rotateY);
    rotateZ(par.rotateZ);
    scale(par.scale);

    let zJump = 0;
    if (this.beatDetector.detect(this.spectrum)) {
      zJump = 100;
      this.spawnParticles = true;
    }

    // Smooth interpolation
    this.zOffset = lerp(this.zOffset || 0, zJump, 0.5);
    translate(0, 0, this.zOffset);
    /* ----- END of my own code - Beat Detection & Physical Response END ----- */


    /* ----- START of my own code - Core Rendering Layers START ----- */
    this.drawGlowingHeart();

    if (this.spawnParticles) {
      this.drawParticles();
      this.spawnParticles = false;
    }
    /* ----- END of my own code - Core Rendering Layers END ----- */

    pop();
  };
  /* ---------------------------------------------------- */
  /* END of my own code - Main Draw Function END          */
  /* ---------------------------------------------------- */


  /* ----------------------------------------------------------- */
  /* START of my own code - Glowing Heart Rendering START        */
  /* ----------------------------------------------------------- */
  this.drawGlowingHeart = function () {

    push();
    noStroke();

    /* ----- START of my own code - Multi-layer Glow Construction START ----- */
    for (let i = 20; i > 0; i--) {

      let index = int(map(i, 1, 20, 0, this.spectrum.length - 1));

      this.backHeartS = map(this.spectrum[index], 0, 255, 0.005, 2);
      this.mainHeartS = map(this.spectrum[index], 0, 255, 1, 3);

      push();
      translate(0, 0, i * -5);
      fill(300, 80, 100, this.spectrum[index]);

      let size = i * 0.8 * this.mainHeartS;
      this.drawHeartShape(size);

      pop();
    }
    /* ----- END of my own code - Multi-layer Glow Construction END ----- */
    pop();
  };
  /* ---------------------------------------------------- */
  /* END of my own code - Glowing Heart Rendering END     */
  /* ---------------------------------------------------- */


  /* ---------- START of my own code - Heart Shape Rendering START ---------- */
  this.drawHeartShape = function (size) {

    push();

    /* ----- START of my own code - Base Heart Shape START ----- */
    noStroke();
    this.drawheartShapeFormat(size);
    this.drawheartShapeFormat(size + 2);
    /* ----- END of my own code - Base Heart Shape END ----- */


    /* ----- START of my own code - Audio Reactive Waves START ----- */
    if (controls.playbackButton.playing) {

      noFill();
      strokeWeight(3);

      this.heartWaveR = size + 8;

      let expand = map(sin(this.heartWaveR), 0, 1, 0.8, 1.6);
      this.alpha = map(expand, 1, 1.6, 120, 0);

      stroke(random(0, 360), 80, 100, this.alpha);
      this.drawheartShapeFormat(this.heartWaveR);

      this.drawWaveform(this.wave);
    }
    /* ----- END of my own code - Audio Reactive Waves END ----- */

    pop();
  };
  /* ---------- END of my own code - Heart Shape Rendering END ---------- */


  /* ---------- START of my own code - Waveform Rendering START ---------- */
  this.drawWaveform = function (wave) {

    push();
    noFill();

    translate(-300, 0, 0);

    stroke(200, 80, 100);
    strokeWeight(2);

    beginShape();
    for (let i = 0; i < wave.length; i++) {

      let x = map(i, 0, wave.length, -width / 3, width / 3);
      let y = wave[i] * 150;

      vertex(x, y, 0);
    }
    endShape();
    pop();
  };
  /* ---------- END of my own code - Waveform Rendering END ---------- */


  /* ---------------------------------------------------- */
  /* START of my own code - Particle System START         */
  /* ---------------------------------------------------- */
  this.drawParticles = function () {

    let maxParticlesNum = 500;
    let particlesNum = 10;
    let heartScale = 20;
    let minR = this.heartWaveR * heartScale;
    let maxR = min(width, height) + 800;

    /* ----- START of my own code - Particle Spawning START ----- */
    if (this.spawnParticles && this.particles.length < maxParticlesNum) {
      for (let i = 0; i < particlesNum; i++) {
        let angle = random(TWO_PI);
        let radius = random(minR, maxR);

        // Circular Parametric Equations
        // reference: https://en.wikipedia.org/wiki/Parametric_equation
        let xh = cos(angle) * radius;
        let yh = sin(angle) * radius;
        let zh = random(-1000, 300);

        let dir = p5.Vector.fromAngles(angle, random(-0.3, 0.3));
        dir.mult(random(3, 8));

        this.particles.push({
          pos: createVector(xh, yh, zh),
          vel: createVector(dir.x, dir.y, random(6, 14)),
          colour: random(0, 360),
          life: 150
        });
      }
    }
    /* ----- END of my own code - Particle Spawning END ----- */


    /* ----- START of my own code - Particle Update & Render START ----- */
    for (let i = this.particles.length - 1; i >= 0; i--) {

      let p = this.particles[i];

      p.pos.add(p.vel);
      p.life -= 2;

      let alpha = map(p.life, 100, 0, 255, 0);
      let stretch = map(p.vel.z, 6, 14, 1, 1.5);
      let lifeScale = map(p.life, 150, 0, 1.0, 0.2);
      let imgSize = 40 * this.backHeartS;

      push();
      blendMode(ADD);
      translate(p.pos.x, p.pos.y, p.pos.z);
      imageMode(CENTER);
      // Tints images using a color
      // reference: https://p5js.org/reference/p5/tint/
      tint(p.colour, 80, 100, alpha);
      image(this.pg, 0, 0, imgSize, imgSize * stretch * lifeScale);
      pop();

      if (p.life <= 0 || p.pos.z > 200) {
        this.particles.splice(i, 1);
      }
    }
    /* ----- END of my own code - Particle Update & Render END ----- */
  };

  /* -------------------------------------------------- */
  /* END of my own code - Particle System END           */
  /* -------------------------------------------------- */
}

/* ========================================================= */
/* END of my own code - HeartGlow VISUALISATION CLASS END    */
/* ========================================================= */