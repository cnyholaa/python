/* =============================================== */
/* START of my own code - BeatDetector CLASS START */
/* =============================================== */
function BeatDetector() {
  this.samples = [];

  /* ------------- START of my own code - detect beat function START ------------------*/
  this.detect = function (spectrum) {
    this.spectrum = spectrum;

    // Summing the squares of all frequency amplitudes to get total energy
    let sum = 0;
    for (let i = 0; i < this.spectrum.length; i++) {
      sum += this.spectrum[i] * this.spectrum[i];
    }

    let isBeat = false;
    // detect a minimum history of 60 samples/frames
    if (this.samples.length == 60) {
      let samplesSum = 0;

      // Calculate local average energy of the history buffer
      for (let i = 0; i < this.samples.length; i++) {
        samplesSum += this.samples[i];
      }
      let samplesAverage = samplesSum / this.samples.length;

      // Calculate Variance
      let varianceSum = 0;
      for (let i = 0; i < this.samples.length; i++) {
        varianceSum += this.samples[i] - samplesAverage
      }
      let variance = varianceSum / this.samples.length

      // Compute the sensitivity coefficient 'c' based on energy variance
      let c = calculateC(variance);

      // Beat Trigger Logic: Compare current energy to the weighted average
      if (sum > samplesAverage * c) {
        isBeat = true;
      };
      // Remove the oldest sample and append the newest instantaneous energy
      this.samples.splice(0, 1);
      this.samples.push(sum);

    } else {
      // Fill the buffer until the history window is complete
      this.samples.push(sum);
    }
    return isBeat;
  }
}
/* ----------- END of my own code - detect beat function END ---------------*/

/* --------- START of my own code - Linear Regression for Adaptive Coefficient 'c' START --------- */
function calculateC(variance) {
  var m = -0.15 / (25 - 200);
  var b = 1 - (m * 200);
  return m * variance + b;
}
/* -------- END of my own code - Linear Regression for Adaptive Coefficient 'c' END -----------*/
/* =============================================== */
/* END of my own code - BeatDetector CLASS END */
/* =============================================== */
