/* ===================================== */
/*     Spectrum CLASS START              */
/* ===================================== */
function Spectrum() {
	this.name = "spectrum";

	this.draw = function () {
		push();
		translate(-width / 2, -height / 2, 0)
		var spectrum = fourier.analyze();
		noStroke();

		for (var i = 0; i < spectrum.length; i++) {
			let g = map(spectrum[i], 0, 255, 255, 0);
			fill(spectrum[i], g, 200)

			var y = map(i, 0, spectrum.length, 0, height);
			var w = map(spectrum[i], 0, 255, 0, width);
			rect(0, y + 10, w, height / spectrum.length);
		}
		pop();
	};
}
/* ===================================== */
/*     Spectrum CLASS END                */
/* ===================================== */
