var note_sequence = ['C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1', 'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5', 'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6', 'C7'];
var show;

var pitch_name02 = ['', '', '', '', '', '', '', '', '', '', '', '','C', '', 'D', '', 'E', 'F', '', 'G', '', 'A', '', 'B', 'c', '', 'd', '', 'e', 'f', '', 'g', '', 'a', '', 'b', 'c1', '', 'd1', '', 'e1', 'f1', '', 'g1', '', 'a1', '', 'b1', 'c2', '', 'd2', '', 'e2', 'f2', '', 'g2', '', 'a2', '', 'b2', 'c3', '', 'd3', '', 'e3', 'f3', '', 'g3', '', 'a3', '', 'b3', 'c4'];
var Chord_txt = document.getElementById("chord");
var sub_Chord_txt = document.getElementById("second_chord");
var NowChord = [];
var Nownote = [];
let _cal = [];

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
    console.log("MIDI ready!");
    for (var input of midiAccess.inputs.values())
        input.onmidimessage = getMIDIMessage;

}


function onMIDIFailure(msg) {
    console.error(`Failed to get MIDI access - ${msg}`);
}




function getMIDIMessage(midiAccess) {
   //console.log(midiAccess);
    

    switch (midiAccess.data[0]) {

        case 144:

            NowChord.push(midiAccess.data[1]);
            NowChord.sort();
            Chord_detect();


            for (let j = 0; j < 73; j++) {
                if ((midiAccess.data[1] - 24) === j) {

                    var targetDiv = document.getElementById("key" + (25 + (j - 24)));
                    targetDiv.style.background = 'linear-gradient(#E74949 96%, #CA1717 4%)';
                    piano.triggerAttackRelease(note_sequence[j], tone_length);


                    make_sheet(note_sequence[j ]);

                    
                }
                
            }



            for (i = 0; i < test.length; i++) {

                test[i] = test[i].toString();

                gaswrite[i] = Tonal.AbcNotation.scientificToAbcNotation(test[i]) + longer;// to abcjs form



                if (test.length > 1) {
                    writer = "[" + gaswrite.join("") + "]"
                }
                else { writer = "" + gaswrite + ""; }
            }




            if (staff_switch == false && edit_notes==true) {

                abcString = "X: 1 T: \nV: 1 " + "clef = " + clef_type + " \n K: \n" + recorder.join('') + writer;
                load();
            }

            break;


        case 128:

            NowChord.splice(NowChord.indexOf(midiAccess.data[1]), 1);
            Nownote.splice(Nownote.indexOf(midiAccess.data[1]), 1)
            


            
            for (let j = 0; j < 73; j++) { 
                if ((midiAccess.data[1] - 24) === j ) {
                    var targetDiv = document.getElementById("key" + (25 + (j - 24)));
                    if (j % 12 === 0 || j % 12 === 2 || j % 12 === 4 || j % 12 === 5 || j % 12 === 7 || j % 12 === 9 || j % 12 === 11) { targetDiv.style.background = 'linear-gradient(#fff 96%, #eee 4%)'; }
                    else { targetDiv.style.background = 'linear-gradient(#333 96%, #525050 4%)'; }

                }

               




            }


            if (staff_switch == true && edit_notes == true) {

                recorder.push(writer);
                writer = "";
                //console.log(recorder, writer.length);
                abcString = "X: 1 T: \nV: 1 " + "clef = " + clef_type + " \n K: \n" + recorder.join('') + writer;//
                load();

                const scroll = document.getElementsByClassName("target-staff");
                scroll[0].scrollLeft = scroll[0].scrollWidth;
                staff_add += 30;
                //const now = document.getElementById("now");
                //now.style.left = (staff_add - 830) + "px";
            }

            ///important lines//
            test.length = 0;
            gaswrite.length = 0;
            writer = "";
                ///important lines//


            break;
    }


}

function Chord_detect() {
    
    for (let i = 0; i < NowChord.length; i++) {

        if (b_switch == false) { Nownote[i] = Tonal.Midi.midiToNoteName(NowChord[i], { sharps: true }); } // => "C#4" NowChord

        else { Nownote[i] = Tonal.Midi.midiToNoteName(NowChord[i], { sharps: false }); }


        //if (NowChord[i] % 12 == 0) { Nownote[i] = "C"; }
        //if (NowChord[i] % 12 == 1)
        //{
        //    if (b_switch == false) {
        //        Nownote[i] = "C#";
        //    }else { Nownote[i] = "Db"; }
        //}
        //if (NowChord[i] % 12 == 2) { Nownote[i] = "D"; }
        //if (NowChord[i] % 12 == 3) {
        //    if (b_switch == false) {
        //        Nownote[i] = "D#";
        //    } else { Nownote[i] = "Eb"; } }
        //if (NowChord[i] % 12 == 4) { Nownote[i] = "E"; }
        //if (NowChord[i] % 12 == 5) { Nownote[i] = "F"; }
        //if (NowChord[i] % 12 == 6) {
            
        //    if (b_switch == false) {
        //        Nownote[i] = "F#";
        //    } else { Nownote[i] = "Gb"; }}
        //if (NowChord[i] % 12 == 7) { Nownote[i] = "G"; }
        //if (NowChord[i] % 12 == 8) {
        //    if (b_switch == false) {
        //        Nownote[i] = "G#";
        //    } else { Nownote[i] = "Ab"; } }
        //if (NowChord[i] % 12 == 9) { Nownote[i] = "A"; }
        //if (NowChord[i] % 12 == 10) {
           
        //    if (b_switch == false) {
        //        Nownote[i] = "A#";
        //    } else { Nownote[i] = "Bb"; }
        //}
        //if (NowChord[i] % 12 == 11) { Nownote[i] = "B"; }
    }
   // console.log(Nownote);

    show = Tonal.Chord.detect(Nownote, { assumePerfectFifth: true });
   
   

    Chord_txt.innerHTML = '';
    sub_Chord_txt.innerHTML = '';


    if (_interval == false) {
        if (show.length >= 1) {
            Chord_txt.innerHTML = show[0];
        }

        sub_Chord_txt.innerHTML = show.slice(1).join('<br>');
    }


    if (_interval == true) {

        let interval_name = Tonal.Interval.distance(Nownote[0], Nownote[1]);
        let dig0, dig1 = "_";
        let interval_line ;

        
        dig0 = Nownote[0];
        dig1 = Nownote[1];
        interval_line = Tonal.Interval.quality(interval_name) + Tonal.Interval.num(interval_name);
        if (Tonal.Interval.num(interval_name) < 0) { interval_line = Tonal.Interval.quality(interval_name) + Math.abs(Tonal.Interval.num(interval_name)); }
         
        if (typeof dig1 === 'undefined') { dig1 = "__"; interval_line = "?"; }
        if (typeof dig0 === 'undefined') { dig0 = "__"; interval_line = "?";}
        //if (isNaN(interval_line)) { interval_line = "?"; }
        
        Chord_txt.innerHTML = "The " + dig0 + " to " + dig1+" interval is " +interval_line;
        sub_Chord_txt.innerHTML = '';
        
        

    } else { }

    //console.log(Nownote);
}


function interval_cal(cal) {


    if (_interval == true) {
        _cal.push(cal);
        console.log(cal, _cal);
        let interval_name = Tonal.Interval.distance(_cal[0], _cal[1]);
        let interval_line = Tonal.Interval.quality(interval_name) + Tonal.Interval.num(interval_name)
        console.log(Tonal.Interval.quality(interval_name) + Tonal.Interval.num(interval_name));

        //let dig0, dig1 = "_";
        //dig0 = _cal[0];
        //dig1 = _cal[1];

        //if (typeof dig1 === 'undefined') { dig1 = "__"; }
        //if (typeof dig0 === 'undefined') { dig0 = "__"; }
        //Chord_txt.innerHTML = "The " + dig0 + " to " + dig1 + " interval is " + interval_name;
        //sub_Chord_txt.innerHTML = '';
        return interval_line;
    } else { }

}




var Ionian=[0,2,4,5,7,9,11];
var Dorian = [0, 2, 3, 5, 7, 9, 10];
var Phrygian = [0,1,3,5,7,8,10]; 
var Lydian = [0, 2, 4, 6, 7, 9, 11];
var Mixolydian = [0,2,4,5,7,9,10];
var Aeolian = [0, 2, 3, 5, 7, 8, 10];
var Locrian = [0, 1, 3, 5, 6, 8, 10];
var M_pen = [0, 2, 4, 7, 9];
var minor_pen = [0, 3, 5, 7, 10];
var Major = [0, 2, 4, 5, 7, 9, 11];
var minor = [0, 2, 3, 5, 7, 8, 10 ];
var nameText = [];






function call_Scale(start_note, type) {
    var getNotesbyname = [];
    var how_many = [];
    var sheet = [];

    if (start_note.substr(-1, 1) == "♭") {start_note = start_note.substr(-2,1) + "b"; }
   

    switch (type) {
        case "Major":
            getNotesbyname = Tonal.Mode.get("Major").intervals.map(Tonal.Note.transposeFrom(start_note+"4"));
            how_many = Major;
           
            break;

        case "minor":
            getNotesbyname = Tonal.Mode.get("minor").intervals.map(Tonal.Note.transposeFrom(start_note+"4"));
            how_many = minor;
            break;

        case "Ionian":
            getNotesbyname = Tonal.Mode.get("Ionian").intervals.map(Tonal.Note.transposeFrom(start_note + "4"));
            how_many = Ionian;
            break;

        case "Ionian":
            getNotesbyname = Tonal.Mode.get("Ionian").intervals.map(Tonal.Note.transposeFrom(start_note + "4"));
            how_many = Ionian;
            break;
        case "Dorian":
            getNotesbyname = Tonal.Mode.get("Dorian").intervals.map(Tonal.Note.transposeFrom(start_note + "4"));
            how_many = Dorian;
            break;

        case "Phrygian":
            getNotesbyname = Tonal.Mode.get("Phrygian").intervals.map(Tonal.Note.transposeFrom(start_note + "4"));
            how_many = Phrygian;
            break;
        case "Lydian":
            getNotesbyname = Tonal.Mode.get("Lydian").intervals.map(Tonal.Note.transposeFrom(start_note + "4"));
            how_many = Lydian;
            break;

        case "Mixolydian":
            getNotesbyname = Tonal.Mode.get("Mixolydian").intervals.map(Tonal.Note.transposeFrom(start_note + "4"));
            how_many = Mixolydian;
            break;
        case "Aeolian":
            getNotesbyname = Tonal.Mode.get("Aeolian").intervals.map(Tonal.Note.transposeFrom(start_note + "4"));
            how_many = Aeolian;
            break;
        case "Locrian":
            getNotesbyname = Tonal.Mode.get("Locrian").intervals.map(Tonal.Note.transposeFrom(start_note + "4"));
            how_many = Locrian;
            break;

        case "minor Pentatonic":
            getNotesbyname = Tonal.Scale.get(start_note+"4" + " minor pentatonic").notes;
            console.log(getNotesbyname)
            how_many = minor_pen;
            break;

        case "Major Pentatonic":
            getNotesbyname = Tonal.Scale.get(start_note +"4"+ " major pentatonic").notes;
            how_many = M_pen;
            break;

    }



    
    
    var count;
    ScaleDisable();
    if (start_note == 'C') { count = 0; }
    else if (start_note == 'Db' || start_note == 'C#') { count = 1; }
    else if (start_note == 'D') { count = 2; }
    else if (start_note == 'Eb' || start_note == 'D#') { count = 3; }
    else if (start_note == 'E') { count = 4; }
    else if (start_note == 'F') { count = 5; }
    else if (start_note == 'F#' || start_note == 'Gb') { count = 6; }
    else if (start_note == 'G') { count = 7; }
    else if (start_note == 'G#' || start_note == 'Ab') { count = 8; }
    else if (start_note == 'A') { count = 9; }
    else if (start_note == 'A#' || start_note == 'Bb') { count = 10; }
    else if (start_note == 'B') { count = 11; }

    

    for (let i = 0; i < how_many.length; i++) {
        
        var targetKey = document.getElementById("key" + (37 + count + how_many[i]));

        var  number = document.querySelectorAll('.word2');

        nameText[i] = document.getElementById("name" + (37 + count + how_many[i]));
        targetKey.style.background = 'linear-gradient(#9ab5df 96%, #8395b1 4%)';
        targetKey.style.color = 'black';
        //targetKey.style.borderLeft = "1px solid white";
        //targetKey.style.borderRight = "1px solid white";

        targetKey.style.boxShadow ="inset -2px -2px 3px #fff , -2px 2px 3px #fff";
            
        nameText[i].innerHTML = getNotesbyname[i];
        number[24 + count + how_many[i]].innerHTML = i+1;

        if (longer == 1) { longer = "1" + " ";}
        sheet[i] = Tonal.AbcNotation.scientificToAbcNotation(getNotesbyname[i]) + longer;
        

        }
    

   
 
    abcString = "X:1 T: \nV: 1 " + "clef =" + "treble " + " \n K: \n" + sheet.join('');
   // console.log(abcString);
    load();

   

}

function ScaleDisable() {
   
    

    for (let i = 12; i < 73; i++) {
        var targetKey = document.getElementById("key" + (25 + (i - 24)));
        
        nameText[i] = document.getElementById("name" + (25 + (i - 24)));
        

        if (i % 12 === 0 || i % 12 === 2 || i % 12 === 4 || i % 12 === 5 || i % 12 === 7 || i % 12 === 9 || i % 12 === 11) { targetKey.style.background = 'linear-gradient(#fff 96%, #eee 4%)';  }
        else { targetKey.style.background = 'linear-gradient(#333 96%, #525050 4%)'; targetKey.style.color = 'white'; }
        targetKey.style.boxShadow = " 2px 2px 5px #a5a5a5, -2px 2px 2px #ffffff";
        nameText[i].innerHTML = "";
       
        abcString = "X:1 T: \nV: 1 " + "clef =" + "treble " + " \n K: \n";
        load();
        var number = document.querySelectorAll('.word2');
        for (let i = 0; i < number.length; i++) {

            number[i].innerHTML = "";
        }

    }
    
        
        



    
}
 //call_Scale(Locrian, "D", "Locrian");


function change_b(element) {



    const flat = document.getElementById("b");
    const sharp = document.getElementById("#");

    if (element.id == "b") {
        flat.style.background = "linear-gradient(145deg, #809bb1, #6c8395)";
        flat.style.color = "#fff"; sharp.style.color = "black"; sharp.style.background = "none";
        flat.style.transition = "0.2s"; sharp.style.transition = "0.2s";
        b_switch = true;
        load();

    }
    else {
        sharp.style.background = "linear-gradient(145deg, #809bb1, #6c8395)";
        sharp.style.color = "#fff"; flat.style.background = "none"; flat.style.color = "black";
        flat.style.transition = "0.2s"; sharp.style.transition = "0.2s";
        b_switch = false;
        load();

    }


    for (let i = 12; i < 73; i++) {
        nameText[i] = document.getElementById("name" + (25 + (i - 24)));

        var note_names = [];
      
        if (_pitch == 1) { note_names = note_sequence; } else { note_names = pitch_name02; }


        if (i % 12 === 0 || i % 12 === 2 || i % 12 === 4 || i % 12 === 5 || i % 12 === 7 || i % 12 === 9 || i % 12 === 11) {
            nameText[i].innerHTML = note_names[i];
        }
        else {
             nameText[i].innerHTML = note_names[i];
            if (b_switch == true) {
                if (nameText[i].innerHTML.length > 1) {

                    if (nameText[i].innerHTML.substr(-3, 1) == 'C') { nameText[i].innerHTML = "D♭" + nameText[i].innerHTML.substr(-1, 1); }
                    else if (nameText[i].innerHTML.substr(-3, 1) == 'D') { nameText[i].innerHTML = "E♭" + nameText[i].innerHTML.substr(-1, 1); }
                    else if (nameText[i].innerHTML.substr(-3, 1) == 'F') { nameText[i].innerHTML = "G♭" + nameText[i].innerHTML.substr(-1, 1); }
                    else if (nameText[i].innerHTML.substr(-3, 1) == 'A') { nameText[i].innerHTML = "B♭" + nameText[i].innerHTML.substr(-1, 1); }
                    else if (nameText[i].innerHTML.substr(-3, 1) == 'G') { nameText[i].innerHTML = "A♭" + nameText[i].innerHTML.substr(-1, 1); }
                }
            }
        }
       

    }
   

}


function change_pitch_name(){

    const pitch_name = document.getElementById("pitch-name");
    _pitch = pitch_name.value;
    console.log(typeof _pitch)
    pianoResume();

}

   
    







