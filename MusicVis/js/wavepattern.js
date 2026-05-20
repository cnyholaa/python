//draw the waveform to the screen
function WavePattern() {
	//vis name
	this.name = "wave pattern";

	//draw the wave form to the screen
	this.draw = function () {
		push();
		noFill();
		translate(-width / 2, 0, 0);

		stroke(100, 255, 250);
		strokeWeight(2);

		//calculate the waveform from the fft.
		var wave = fourier.waveform();
		beginShape();
		for (let i = 0; i < wave.length; i++) {

			//for each element of the waveform map it to screen 
			//coordinates and make a new vertex at the point.
			let x = map(i, 0, wave.length, 0, width);
			let y = wave[i] * 150;

			vertex(x, y, 0);
		}
		endShape();
		pop();
	};
}
