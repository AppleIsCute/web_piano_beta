let isRunning = false;
let longer = 2;
let tone_length="8n";

let clef_type = "treble";


var color_fnt;

var staff_add=900;

var abcString;

var cursorControl; // see section on CursorControl
var audioParams = { chordsOff: true };
var myContext = new AudioContext();




var last_click = [];

var clickarray01 = [];

function clickListener(abcElem, tuneNumber, classes, analysis, drag, mouseEvent) {

	console.log(abcElem);
	//console.log(abcElem.duration);


	for (let i = 0; i < abcElem.pitches.length; i++) {



		var [call_key, keynumber] = NoteName_return(abcElem.pitches[i].pitch, abcElem.pitches[i].accidental);
		console.log(NoteName_return(abcElem.pitches[i].pitch, abcElem.pitches[i].accidental));
		var targetKey = document.getElementById("key" + (keynumber + 1));
		targetKey.style.background = 'linear-gradient(#E74949 96%, #CA1717 4%)';
		piano.triggerAttackRelease(call_key, (2 / abcElem.duration) + "n");
		clickarray01[i] = keynumber + 1;
	}


	for (let i = 0; i < last_click.length; i++) {
		last_click.sort();

		if (last_click[i].length !== clickarray01[i].length) {

			var targetKey = document.getElementById("key" + (last_click[i]));
			if ((last_click[i] - 1) % 12 === 0 || (last_click[i] - 1) % 12 === 2 || (last_click[i] - 1) % 12 === 4 || (last_click[i] - 1) % 12 === 5 || (last_click[i] - 1) % 12 === 7 || (last_click[i] - 1) % 12 === 9 || (last_click[i] - 1) % 12 === 11) { targetKey.style.background = 'linear-gradient(#fff 96%, #eee 4%)'; }
			else { targetKey.style.background = 'linear-gradient(#333 96%, #525050 4%)'; targetKey.style.color = 'white'; }

		}


		if (last_click[i] !== clickarray01[i]) {

			var targetKey = document.getElementById("key" + (last_click[i]));
			if ((last_click[i] - 1) % 12 === 0 || (last_click[i] - 1) % 12 === 2 || (last_click[i] - 1) % 12 === 4 || (last_click[i] - 1) % 12 === 5 || (last_click[i] - 1) % 12 === 7 || (last_click[i] - 1) % 12 === 9 || (last_click[i] - 1) % 12 === 11) { targetKey.style.background = 'linear-gradient(#fff 96%, #eee 4%)'; }
			else { targetKey.style.background = 'linear-gradient(#333 96%, #525050 4%)'; targetKey.style.color = 'white'; }



		}

		else {

			var targetKey = document.getElementById("key" + (last_click[i]));
			targetKey.style.background = 'linear-gradient(#E74949 96%, #CA1717 4%)';
		}




	}




	last_click = [...clickarray01];
	//console.log("keynum"+last_click,clickarray01);

}




const nums = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const return_notes = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];

function NoteName_return(n, a) {


	var note_return = mapArrayToNotes(n, nums, return_notes);
	var keynum;

	if (typeof a !== "undefined") {
		if (a === "sharp") {
			keynum = note_sequence.indexOf(note_return) + 1;
			note_return = note_return.substr(-2, 1) + "#" + note_return.substr(-1, 1);


		}

		if (a === "flat") {
			keynum = note_sequence.indexOf(note_return) - 1;
			note_return = note_return.substr(-2, 1) + "b" + note_return.substr(-1, 1);

		}
		if (a === "dblsharp") {
			keynum = note_sequence.indexOf(note_return) + 2;

			if (note_return.substr(-2, 1) == "C") { note_return = "D" + note_return.substr(-1, 1); }
			else if (note_return.substr(-2, 1) == "D") { note_return = "E" + note_return.substr(-1, 1); }
			//if (note_return.substr(-2, 1) == "E") { note_return = "F#" + note_return.substr(-1, 1); }

			else if (note_return.substr(-2, 1) == "F") { note_return = "G" + note_return.substr(-1, 1); }
			else if (note_return.substr(-2, 1) == "G") { note_return = "A" + note_return.substr(-1, 1); }
			//if (note_return.substr(-2, 1) == "A") { note_return = "B" + note_return.substr(-1, 1); }
			//if (note_return.substr(-2, 1) == "B") { note_return = "C#" + note_return.substr(-1, 1); }
		}

		if (a === "dblflat") {
			keynum = note_sequence.indexOf(note_return) - 2;

			if (note_return.substr(-2, 1) == "C") { note_return = "Bb" + note_return.substr(-1, 1); }
			else if (note_return.substr(-2, 1) == "D") { note_return = "C" + note_return.substr(-1, 1); }
			else if (note_return.substr(-2, 1) == "E") { note_return = "D" + note_return.substr(-1, 1); }

			else if (note_return.substr(-2, 1) == "F") { note_return = "Eb" + note_return.substr(-1, 1); }
			else if (note_return.substr(-2, 1) == "G") { note_return = "F" + note_return.substr(-1, 1); }
			else if (note_return.substr(-2, 1) == "A") { note_return = "G" + note_return.substr(-1, 1); }
			else if (note_return.substr(-2, 1) == "B") { note_return = "A" + note_return.substr(-1, 1); }
		}

	}

	else { keynum = note_sequence.indexOf(note_return); }




	return [note_return, keynum];


}

var new_abc;

function load(){

	ABCJS.renderAbc("target", abcString, {
		add_classes: true,
		format: {
			gchordfont: "Verdana 20",
			partsbox: true,

			//initialClef: true,
			paddingtop: 80,
			paddingbottom: 80,


		},

		viewportHorizontal: true,
		scrollHorizontal: true,
		scale: 1.5,
		clickListener: self.clickListener,

		staffwidth: staff_add,
		wrap: {

			minSpacing: 2.5,
			maxSpacing: 2.5,
			minSpacingLimit: 2.5,
			preferredMeasuresPerLine: 0,
		},


		selectionColor: color_fnt,
	});

	new_abc = abcString;
}

var last_abc="";




function abc_changed() {
	if (new_abc != last_abc) { playbackload(false); }
	else {
		//console.log("same");
	}
	
}






function playbackload(_call) {


	var visualObj = ABCJS.renderAbc("target", abcString, {
		add_classes: true,
		format: {
			gchordfont: "Verdana 20",
			partsbox: true,

			//initialClef: true,
			paddingtop: 80,
			paddingbottom: 80,


		},

		viewportHorizontal: true,
		scrollHorizontal: true,
		scale: 1.5,
		clickListener: self.clickListener,

		staffwidth: staff_add,
		wrap: {

			minSpacing: 2.5,
			maxSpacing: 2.5,
			minSpacingLimit: 2.5,
			preferredMeasuresPerLine: 0,
		},


		selectionColor: color_fnt,
	})[0];



	//var timingCallbacks = new ABCJS.TimingCallbacks(visualObj, {
	//	beatCallback: beatCallback,
	//	beatSubdivisions:1,
	//	//eventCallback: eventCallback,

	//});

	//console.log(staff_add);

	if (ABCJS.synth.supportsAudio()) {
		var synthControl = new ABCJS.synth.SynthController();
		synthControl.load("#start",
			cursorControl,
			{
				displayLoop: true,
				displayRestart: true,
				displayPlay: true,
				displayProgress: true,
				displayWarp: true
			}
		);


		var createSynth = new ABCJS.synth.CreateSynth();
		createSynth.init({
			audioContext: myContext,
			visualObj: visualObj,
			millisecondsPerMeasure: 500,
			options: {
				soundFontUrl: "https://paulrosen.github.io/midi-js-soundfonts/abcjs/",
				pan: [-0.3, 0.3],
				soundFontVolumeMultiplier:0.2,
			}
		}).then(function () {
			synthControl.setTune(visualObj, false, audioParams).then(function () {
				//console.log("Audio successfully loaded.")
			}).catch(function (error) {
				console.warn("Audio problem:", error);
			});
		}).catch(function (error) {
			console.warn("Audio problem:", error);
		});
	} else {
		document.querySelector("#start").innerHTML =
			"Audio is not supported in this browser.";
	}


	last_abc = abcString;

	
 


}






function beatCallback(currentBeat, totalBeats, lastMoment, position, debugInfo) {
	//console.log(position);
	//document.getElementById("cursor").style.transform = "translateX("+(position.left*1.5)+"px)";
}






function mapArrayToNotes(user_input, array1, array2) {
	if (array1.length !== array2.length) {
		throw new Error('Both arrays must have the same length.');
	}

	const index = array1.indexOf(user_input);
	if (index === -1) {
		throw new Error('Number not found in array1.');
	}

	return array2[index];
}
