/* ===================================== */
/*     visualisation CLASS START         */
/* ===================================== */
function Visualisations() {
	this.visuals = [];
	this.selectedVisual = null;

	//add a new visualisation to the array
	this.add = function (vis) {
		this.visuals.push(vis);
		//if selectedVisual is null set the new visual as the 
		if (this.selectedVisual == null) {
			this.selectVisual(vis.name);
		}
	};

	//select a visualisation using it name property
	this.selectVisual = function (visName) {
		for (var i = 0; i < this.visuals.length; i++) {
			if (visName == this.visuals[i].name) {
				this.selectedVisual = this.visuals[i];
			}
		}
	};
}
/* ===================================== */
/*     visualisation CLASS END           */
/* ===================================== */