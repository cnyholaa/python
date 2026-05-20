/* ===================================== */
/*        sketch.js START                */
/* ===================================== */
/*Global variables declaration START*/
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sounds = [];
var loadErrors = []
// Currently playing sound object
var sound;
//variable for p5 fast fourier transform
var fourier;
// Current sound track index
var cnt = 0;
/*Global variables declaration END*/

/* ----------- START of my own code - Preload function START------------- */
function preload() {
	let soundsList = ['assets/peak.mp3', 'assets/royalty.mp3', 'assets/instrument.mp3', 'assets/time_remix.mp3', 'assets/goodbye_past.mp3', 'assets/in_the_rain.mp3',
		'assets/flowers.mp3', 'assets/pars_radio.mp3', 'assets/segway.mp3', 'assets/stomper_reggae_bit.mp3', 'assets/yee-king_track.mp3']

	/* ---------- START of my own code - Audio Files Loading Loop START ---------- */
	for (let i = 0; i < soundsList.length; i++) {
		// Generate readable track name from file path
		let name = soundsList[i].split('/')[1].split('.')[0].replaceAll('_', ' ').toUpperCase()

		// Load sound with success & error callbacks
		let s = loadSound(
			soundsList[i],
			() => console.log("Loaded:", soundsList[i]),
			(err) => soundLoadedError(soundsList[i], err)
		);

		// Store track object (Name + Sound instance)
		sounds.push({
			name: name,
			sound: s
		})
	};
	/* ---------- END of my own code - Audio Files Loading Loop END ---------- */
}
/* -------------- END of my own code - Preload function END  --------------- */

/* -------------- START of my own code - SOUND LOAD ERROR HANDLER  START--------------- */
function soundLoadedError(s, err) {
	console.error("Loaded Error:", s, err);
	loadErrors.push(s);
}
/* -------------- END of my own code - SOUND LOAD ERROR HANDLER  END -------------- */

/* -------------- Setup function START  --------------- */
function setup() {

	/* ---------- START of my own code - Canvas Creation & Styling START ---------- */
	// reference: https://p5js.org/tutorials/coordinates-and-transformations/
	var cnv = createCanvas(windowWidth, windowHeight, WEBGL);
	let canvas = cnv.canvas;

	// Layered canvas styling (UI overlay friendly)
	canvas.style.position = "absolute";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.style.zIndex = "1";
	canvas.style.background = "transparent";
	/* ---------- END of my own code - Canvas Creation & Styling END ---------- */


	/* ---------- Rendering Configuration START ---------- */
	background(0);
	colorMode(HSB, 360, 100, 100, 100);
	/* ---------- Rendering Configuration END ---------- */


	/* ---------- START of my own code - Audio Loading Validation START ---------- */
	if (loadErrors.length > 0) {
		console.warn("Some sounds failed, fallback mode.");
	}

	// Assign first track as default active sound
	if (sounds.length > 0) {
		sound = sounds[0].sound;
	} else {
		sound = null;
		console.warn("No sounds loaded!");
	}
	/* ---------- END of my own code - Audio Loading Validation END ---------- */

	/* ---------- Audio Analysis Engine Initialisation START ---------- */
	// FFT used by all visualisations for frequency spectrum analysis
	fourier = new p5.FFT();
	/* ---------- Audio Analysis Engine Initialisation END ---------- */

	/* ---------- Visualisation System Initialisation START ---------- */
	// Create visualisation manager (Container Pattern)
	vis = new Visualisations();

	// Register visual modules
	/* ---------- START of my own code - Register visual modules START ---------- */
	vis.add(new HeartGlow());
	vis.add(new DrumBeat());
	vis.add(new WebcamVideo());
	/* ---------- END of my own code - Register visual modules END ---------- */

	vis.add(new Spectrum());
	vis.add(new WavePattern());
	vis.add(new Needles());

	/* ---------- Visualisation System Initialisation END ---------- */


	/* ---------- Controls System Initialisation START ---------- */
	controls = new ControlsAndInput();
	/* ---------- Controls System Initialisation END ---------- */

}
/* ------------- Setup function END ------------- */



/* ------------- Draw function START ------------- */
function draw() {

	/* ---------- Frame Background Reset START ---------- */
	background(0);
	/* ---------- Frame Background Reset END ---------- */


	/* ---------- TART of my own code - Audio Safety Check START ---------- */
	// Prevent crashes if audio failed to load
	if (!sound) {
		push();
		resetMatrix();
		fill(100, 255, 250);
		textSize(24);
		text("Audio failed to load.\nPlease check your connection.", width / 2, height / 2, 0);
		pop();
		return;
	}
	/* ---------- END of my own code - Audio Safety Check END ---------- */


	/* ---------- Visualisation Rendering START ---------- */
	// Delegate rendering to currently selected visual module
	vis.selectedVisual.draw();
	/* ---------- Visualisation Rendering END ---------- */

	/* ---------- UI Controls Rendering START ---------- */
	controls.draw();
	/* ---------- UI Controls Rendering END ---------- */


};
/* ------------- Draw function END ------------- */

/* ------------- START of my own code - Mouse interaction handler START ------------- */
function mouseClicked() {
	userStartAudio();
	if (controls && controls.mousePressed) {
		controls.mousePressed();
	}
};
/* ------------- END of my own code - Mouse interaction handler END ------------- */

/* ------------- START of my own code - Keyboard interaction handler START ------------- */
function keyPressed() {
	if (controls && controls.keyPressed) {
		controls.keyPressed(keyCode);
	}
};
/* ------------- END of my own code - Keyboard interaction handler END ------------- */

/* ------------- Window resize handler START ------------- */
// When the window has been resized. Resize canvas to fit 
// If the visualisation needs to be resized call its onResize method
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if (vis && vis.selectedVisual.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	};
};

/* ------------- Window resize handler END ------------- */
/* ===================================== */
/*        sketch.js END                  */
/* ===================================== */