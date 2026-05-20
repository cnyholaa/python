/* ===================================== */
/*      ControlsAndInput CLASS START     */
/* ===================================== */
function ControlsAndInput() {
	/* ---------- Initialisation START ---------- */
	//playback button 
	this.playbackButton = new PlaybackButton();

	//fullscreen button 
	this.fullscreenButton = new FullscreenButton();

	//volumeControl button 
	this.volumecontrolButton = new VolumeControlButton();

	//menu display
	this.menu = new Menu();
	/* ---------- Initialisation END ---------- */

	/* ---------- START of my own code - Fullscreen Toggle Logic START ---------- */
	// Assign fullscreen toggle behaviour
	this.fullscreenButton.onToggle = () => {
		this.toggleFullscreen();
	};

	// Toggle fullscreen state
	this.toggleFullscreen = () => {
		let fs = fullscreen();
		fullscreen(!fs);
		this.isFullscreen = !fs;

		// Update fullscreen button UI
		this.fullscreenButton.setIcon(this.isFullscreen);
		this.fullscreenButton.updatePosition();
	};
	/* ---------- END of my own code - Fullscreen Toggle Logic END ---------- */


	/* ---------- START of my own code - Visualisation Change Handler START ---------- */
	// Switch visualisation when selected from menu
	this.menu.onVisualChange = (name) => {
		vis.selectVisual(name);
	};
	/* ---------- END of my own code - Visualisation Change Handler END ---------- */


	/* ---------- START of my own code - Mouse Interaction START ---------- */
	this.mousePressed = function () {
		// Prevent menu toggle if clicking inside menu areas
		if (this.menu.visible) {
			// Click on left menu area
			if (mouseX < this.menu.leftMenu.width + 40) return;
			// Click on right menu area
			if (mouseX > width - (this.menu.rightMenu.width + 40)) return;
			// Click on bottom control area
			if (mouseY > height - 250) return;
		}
		// Toggle menu visibility
		this.menu.toggleMenu();
	}
	/* ---------- END of my own code - Mouse Interaction END ---------- */


	/* ---------- START of my own code - Keyboard Interaction START ---------- */
	this.keyPressed = function (keycode) {
		// SPACE key to toggle menu
		if (keycode == 32) {
			// --- toggle Menu ---
			this.menu.toggleMenu();
		}
		// ENTER key to switch songs
		if (keycode == 13 && cnt >= 0 && sound.isPlaying()) {
			sound.stop()
			if (cnt >= sounds.length - 1) {
				cnt = 0;
			} else {
				cnt += 1;
			}
			sound = sounds[cnt].sound
			sound.loop()
		}
	};
	/* ---------- END of my own code - Keyboard Interaction END ---------- */


	/* ---------- Main Draw Function START ---------- */
	this.draw = function () {
		push();
		/* ----- UI Styling Setup START ----- */
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);
		/* ----- UI Styling Setup END ----- */

		/* ----- START of my own code - Draw Control Buttons START ----- */
		this.playbackButton.drawBtns();

		//fullscreen button
		this.fullscreenButton.drawFullscreenBtn();

		//volumecontrol button
		this.volumecontrolButton.drawVolumeControlBtn();
		/* ----- END of my own code - Draw Control Buttons END ----- */


		/* ----- START of my own code - Draw Menu START ----- */
		if (this.menu.menuDisplayed) {
			this.menu.menuDraw();
			this.menu.menuDisplayed = false
			this.menu.toggleMenu()

		}
		/* ----- END of my own code - Draw Menu END ----- */


		/* ----- START of my own code - Right Menu Sound Selection START ----- */
		if (this.playbackButton.playing) {
			for (let i = 0; i < this.menu.rightMenuBtns.length; i++) {
				let btn = this.menu.rightMenuBtns[i]
				// Apply hover style
				this.menu.applyHoverStyle(btn)
				// Assign click behaviour
				btn.mousePressed(() => {
					if (sound) {
						sound.stop();
					}
					cnt = i;
					sound = sounds[cnt].sound
					sound.loop()

				})
			}
		}
		/* ----- END of my own code - Right Menu Sound Selection END ----- */
		pop();
	};
	/* ---------- Main Draw Function END ---------- */

}
/* ===================================== */
/*      ControlsAndInput CLASS END       */
/* ===================================== */