/* ========================================================== */
/*    START of my own code - VolumeControlButton class START  */
/* ========================================================== */
function VolumeControlButton() {
  /* ---------- START of my own code - Layout & State Properties START ---------- */
  // Relative horizontal position
  this.relX = 0.8;
  this.relY = 0.9;
  this.w = width * 0.12;
  this.h = height * 0.05;
  this.isDisplayed = false;
  this.volume = 0.5; // default volume
  this.div = null;
  /* ---------- END of my own code - Layout & State Properties END ---------- */

  /* ----------- START of my own code - Volume control button drawing method START ------------*/
  this.drawVolumeControlBtn = () => {
    if (!this.isDisplayed) {
      if (!this.div) {
        this.isDisplayed = false;
      }
      // Create main container div
      this.div = createDiv();
      this.div.parent(select("#bottomMenu"))
      this.div.style('cursor', 'pointer');
      this.div.style('position', 'absolute');
      this.div.style('display', 'flex');
      this.div.style('align-items', 'center');
      this.div.style('gap', '10px');
      this.div.style('z-index', '10');
      this.div.style('background', 'rgba(255,255,255,0.1)');
      this.div.style('backdrop-filter', 'blur(4px)');
      this.div.style('padding', '5px 10px');
      this.div.style('border-radius', '50px');
      this.div.style('box-shadow', '0 0 10px rgba(255,255,255,0.2)');
      this.div.style('cursor', 'pointer');
      this.div.style('transition', 'all 0.3s ease');

      // Create volume icon span
      this.icon = createSpan('🕪');
      this.icon.style('transform', 'rotate(180deg)');
      this.icon.parent(this.div);
      this.icon.style('font-size', '20px');
      this.icon.style('color', '#fff');
      this.icon.mousePressed(() => this.toggleMute());

      // Create background for volume bar
      this.barBg = createDiv();
      this.barBg.parent(this.div);
      this.barBg.style('width', this.w - 60 + 'px');
      this.barBg.style('height', '6px');
      this.barBg.style('background', 'rgba(255,255,255,0.2)');
      this.barBg.style('border-radius', '5px');
      this.barBg.style('overflow', 'hidden');
      this.barBg.style('position', 'relative');


      // Create fill bar showing current volume level
      this.barFill = createDiv();
      this.barFill.parent(this.barBg);
      this.barFill.style('height', '100%');
      this.barFill.style('width', this.volume * 100 + '%');
      this.barFill.style('background', 'linear-gradient(90deg, #f0e115ff, #ff6699)');
      this.barFill.style('border-radius', '5px');


      /* ------------- START of my own code - Volume bar click interaction START ------------*/
      // Add click interaction to volume bar
      this.barBg.mousePressed((event) => {
        const newVolume = constrain(
          (event.offsetX / this.barBg.width) || 0,
          0,
          1
        );
        this.setVolume(newVolume);
      });
      /*----------- END of my own code - Volume bar click interaction END ---------------*/
      this.isDisplayed = true;
    };

    //Update position
    this.updatePosition();
  };
  /*-------------- END of my own code - Volume control button drawing method END -------------*/


  /*------------- START of my own code - Position update method START ---------------*/
  this.updatePosition = () => {
    const x = width * this.relX - this.w / 2;
    const y = height * 0.2;
    this.div.position(x, y / 2 - this.h / 2);

  };
  /*------------- END of my own code - Position update method END ----------------*/


  /*-------------- START of my own code - Window resize handler START -----------------*/
  this.onResize = () => {
    this.updatePosition();
  };
  /*-------------- END of my own code - Window resize handler END --------------*/


  /*-------------- START of my own code - Volume setting method START ---------------*/
  // Set volume level
  this.setVolume = (v) => {
    this.volume = constrain(v, 0, 1);
    this.barFill.style('width', this.volume * 100 + '%');
    if (typeof sound !== 'undefined' && sound.isLoaded()) {
      sound.setVolume(this.volume);
    }

    this.icon.html(this.volume < 0.05 ? '🕨' : '🕪');
    this.icon.style('transform', 'rotate(180deg)');
  };
  /*---------------- END of my own code - Volume setting method END --------------*/

  /*------------ START of my own code - Mute toggle method START -----------------*/
  // Switch to silence or restore volume
  this.toggleMute = () => {
    if (this.volume > 0) {
      this.lastVolume = this.volume;
      this.setVolume(0);
    } else {
      this.setVolume(this.lastVolume || 0.5);
    };
  };
  /*----------- END of my own code - Mute toggle method END -----------------*/
};
/* ========================================================= */
/*   END of my own code - VolumeControlButton class END      */
/* ========================================================= */
