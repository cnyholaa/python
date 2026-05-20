/* ============================================================ */
/*        START of my own code - PLAYBACK BUTTON CLASS START    */
/* ============================================================ */
function PlaybackButton() {
	this.relX = 0.5;
	this.relY = 0.9;
	this.r = 90;
	this.fb_r = 50;
	this.playing = false;

	this.playBtn = null;
	this.fastForwardBtn = null;
	this.rewindBtn = null;
	this.durationMap = null;

	/* ----------- START of my own code - draw buttons START ----------------*/
	this.drawBtns = function () {
		this.drawPlayBtn();
		this.drawFastForwardBtn();
		this.drawRewindBtn();
	};
	/* -------------- END of my own code - draw buttons END -----------------*/

	/* ---------------START of my own code - Button styling function START -------------*/
	const format = (btn, r) => {
		btn.size(r, r);
		btn.style('position', 'absolute');
		btn.style('z-index', '10');
		btn.style('background', 'transparent');
		btn.style('border', '1px solid rgba(255,255,255,0.5)');
		btn.style('color', 'white');
		btn.style('outline', 'none');
		btn.style('font-size', '20px');
		btn.style('font-weight', 'bold');
		btn.style('cursor', 'pointer');
		btn.style('border-radius', '50%');
		btn.style('transition', 'all 0.3s ease');
		btn.style('box-shadow', '0 0 5px rgba(255,255,255,0.2)');

		/* -------------- START of my own code - Hover effects START ------------------*/
		btn.mouseOver(() => {
			btn.style('background', 'rgba(255,255,255,0.1)');
			btn.style('transform', 'scale(1.2)');
			btn.style('box-shadow', '0 0 10px rgba(255,255,255,0.4)');
		});
		btn.mouseOut(() => {
			btn.style('background', 'transparent');
			btn.style('transform', 'scale(1)');
			btn.style('box-shadow', '0 0 5px rgba(255,255,255,0.2)');
		});
		/*--------------- END of my own code - Hover effects END --------------------*/
	};
	/* --------------- END of my own code - Button styling function END-------------*/



	/*---------------- START of my own code - Playback button creation START -----------*/
	// Main play button
	this.drawPlayBtn = function () {
		if (!this.playBtn) {
			this.playBtn = createButton('▶');
			this.playBtn.parent(select("#bottomMenu"))
			format(this.playBtn, this.r);

			this.playBtn.mousePressed(() => {
				if (sound.isPlaying()) {
					sound.pause();
					this.playBtn.html('▶');
					this.playing = false;
				} else {
					sound.loop();
					this.playBtn.html('❚❚');
					this.playing = true;
				};
			});
		}
	};
	/* ---------------- END of my own code - Playback button creation END-------------*/


	/* -------------START of my own code - Fast forward button creation START ---------*/
	this.drawFastForwardBtn = function () {
		if (!this.fastForwardBtn) {
			this.fastForwardBtn = createButton('⏭︎');
			this.fastForwardBtn.parent(select("#bottomMenu"));
			format(this.fastForwardBtn, this.fb_r);

			this.fastForwardBtn.mousePressed(() => {
				if (sound.isPlaying()) {
					const jumpT = sound.currentTime() + 5;
					sound.jump(min(jumpT, sound.duration() - 0.1));
				}
			});
		}
		this.updatePosition();
	};
	/*------------ END of my own code - Fast forward button creation END-------------*/

	/* ----------- START of my own code - Rewind button creation START-------------*/
	this.drawRewindBtn = function () {
		if (!this.rewindBtn) {
			this.rewindBtn = createButton('⏮︎');
			this.rewindBtn.parent(select("#bottomMenu"));
			format(this.rewindBtn, this.fb_r);
			this.rewindBtn.mousePressed(() => {
				if (sound.isPlaying()) {
					const jumpT = sound.currentTime() - 5;
					sound.jump(max(jumpT, 0));
				}
			});
		}
		this.updatePosition();
	};
	/* ------------- END of my own code - Rewind button creation END-------------*/


	/* ------------- START of my own code - Position update method START-------------*/
	this.updatePosition = function () {
		const bottomW = width;
		const BottomH = height * 0.2;

		this.playBtn.position(bottomW / 2 - this.r / 2, BottomH / 2 - this.r / 2);

		const offset = this.r + 20;

		if (this.rewindBtn) {
			this.rewindBtn.position(bottomW / 2 - offset - this.fb_r / 2, BottomH / 2 - this.fb_r / 2);
		}
		if (this.fastForwardBtn) {
			this.fastForwardBtn.position(bottomW / 2 + offset - this.fb_r / 2, BottomH / 2 - this.fb_r / 2);
		}

	};
	/* -------------END of my own code - Position update method END-------------*/

	/* ------------- START of my own code - Resize handler START-------------*/
	// Handle resizing / fullscreen change
	this.onResize = () => {
		this.updatePosition();
	};
	/* -------------END of my own code - Resize handler END-------------*/

}

/* ======================================================== */
/*      END of my own code - PLAYBACK BUTTON CLASS END      */
/* ======================================================== */