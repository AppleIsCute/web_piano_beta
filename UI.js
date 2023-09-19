
let teaching_Modes = 0;
let staff_switch= false;/// staff record or not
let ScaleMode;
let markerpicker;
let _write = false;
let no_dots = false;
let b_switch = false;
let edit_notes = true;

const keyboard_note = document.querySelectorAll("keyboard-note");

function marker_change_color() {
   
    const marker = document.getElementById("marker");
    const clear_dot = document.getElementById("clear-dot");
    const icon = document.getElementById("fds");
   
    clear_dot.style.transition = '0.2s';
    if (marker.style.visibility == "visible") { marker.style.visibility = "collapse"; clear_dot.style.transform = "translateX(0px)"; clear_dot.style.transition = '0.2s'; icon.style.background = "inherit"; icon.style.boxShadow = "3px 3px 6px #43515c, -3px -3px 6px #add1ee";}
    else {
        marker.style.visibility = "visible"; clear_dot.style.transform = "translateX(150px)"; clear_dot.style.transition = '0.2s'; icon.style.background = "#7891a5";
        icon.style.boxShadow = "inset 3px 3px 6px #3e4b56, inset -3px -3px 6px #b2d7f4";}

}


function pickcolor(element) {
    no_dots = false;
    markerpicker = element.style.background;
    

}



for (let j = 13; j < 73; j++) {

    const keyclicked = document.getElementById("key"+j);
        keyclicked.addEventListener('click', function () {

            var vv = keyclicked.getAttribute("data-value");
            piano.triggerAttackRelease(vv, tone_length);
        });

} //works



     
function change_clef(element) {

   

    const cleff01 = document.getElementById("change01");
    const cleff02 = document.getElementById("change02");
    console.log(element.id);
    if (element.id == "change01") {
        cleff01.style.background = "linear-gradient(145deg, #809bb1, #6c8395)";
        cleff01.style.color = "#fff"; cleff02.style.color = "black"; cleff02.style.background = "none";
        cleff01.style.transition = "0.2s"; cleff02.style.transition = "0.2s";
        clef_type = "bass"
        if (staff_switch == false) {
            writer = "";
            abcString = "X: 1 T: \nV: 1 " + "clef = " + clef_type + " \n K: \n |" + writer;
            load();
        }
        if (staff_switch == true) {

            recorder.push(writer);
            console.log(recorder, writer.length);
            abcString = "X: 1 T: \nV: 1 " + "clef = " + clef_type + " \n K: \n |" + recorder.join('');
            load();

        }
    }
    else {
        cleff02.style.background = "linear-gradient(145deg, #809bb1, #6c8395)";
        cleff02.style.color = "#fff"; cleff01.style.background = "none"; cleff01.style.color = "black";
        cleff01.style.transition = "0.2s"; cleff02.style.transition = "0.2s";
        clef_type = "treble"
        if (staff_switch == false) {
            writer = "";
            abcString = "X: 1 T: \nV: 1 " + "clef = " + clef_type + " \n K: \n |" + writer;
            load();
        }

        if (staff_switch == true) {

            recorder.push(writer);
            console.log(recorder, writer.length);
            abcString = "X: 1 T: \nV: 1 " + "clef = " + clef_type + " \n K: \n |" + recorder.join('') + writer;
            load();

        }
       
    }

}





function write_or_not(element) {
    var png_color = document.getElementById("write");
    _write = !_write ;
    if (_write == false) { element.style.background = "linear-gradient(145deg, #ffffff, #e6e6e6)"; staff_switch = false;}
    else { element.style.background = "linear-gradient(145deg, #809bb1, #6c8395)"; staff_switch = true;}

    
    if (staff_switch == false) {
        png_color.style.filter = " invert(0.8)";
       // writer = "";

        abcString = "X: 1 T: \nV: 1 " + "clef = " + clef_type + " \n K: \n |" + recorder.join('')+ writer;
        load();
    }

    if (staff_switch == true) {
        
        png_color.style.filter =" invert(0)";
        writer = '';
        recorder.push(writer);
        
        abcString = "X: 1 T: \nV: 1 " + "clef = " + clef_type + " \n K: \n |" + recorder.join('') + writer;
        load();
    }
}

function clear_staff() {
    recorder.length = 0;
    abcString = "X: 1 T: \nV: 1 " + "clef = " + clef_type + " \n K: \n |" + recorder;
    staff_add = 900;
    document.getElementsByClassName("target-staff").scrollLeft = 0;
    load();
    //console.log("clear",abcString);
}

function show_staff() {
    const eye = document.getElementById("eye");
    const visible = document.getElementById("visible");
    if (document.getElementById("target").style.opacity != "0") {
        document.getElementById("target").style.opacity = "0";
        document.getElementById("target").style.transition = "0.3s";
        visible.style.background = "linear-gradient(145deg, #809bb1, #6c8395)";
        eye.style.filter = "invert(0)";
    }
    else {
        document.getElementById("target").style.opacity = "1"; document.getElementById("target").style.transition = "0.3s";
        visible.style.background = "linear-gradient(145deg, #ffffff, #e6e6e6)";
        eye.style.filter = "invert(0.8)";
    }

}

function show_hint() {

    document.getElementById("hint").style.visibility = "visible";

}

function hide_hint() {

    document.getElementById("hint").style.visibility = "hidden";

}


const marking = document.querySelectorAll('.key');


    for (let i = 0; i < marking.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        marking[i].appendChild(dot);

        dot.style.display = 'none';


        marking[i].addEventListener('click', function () {

            if (no_dots == false) {
                this.querySelectorAll(".dot");
                dot.style.background = markerpicker;
                if (dot.style.display == 'none') { dot.style.display = "block"; }
                else { dot.style.display = 'none'; }
            }
            else { }




        });
        document.getElementById("clear-dot").addEventListener('click', function () {


            this.querySelectorAll(".dot");
            dot.style.display = 'none';
        });

    }











function Enable_blackboard() {

    const check_blur = document.getElementById("show_chord");
    const label = document.getElementById("blackboard");
    const display_text = document.querySelectorAll('.display_word');


    check_blur.addEventListener('change', function () {
        for (var i = 0; i < display_text.length; i++) {
            if (check_blur.checked) {
                display_text[i].classList.add('blur');
                label.textContent="Enable blackboard"
            } else {
                display_text[i].classList.remove('blur');
                label.textContent = "Disable blackboard"
            }
        }
    });

}


function TextSizeUpdate(val) {
    document.getElementById('chord').style.fontSize=(val)+"px";
    document.getElementById('second_chord').style.fontSize = (val-30) + "px";
    
}



var a, b;

function combineSelections() {

  
    //console.log(Tonal.Interval.distance("E3", "G4")); // => "5P"



    if (ScaleMode === true) {

        const _Tonic = document.getElementById("Tonic").value;
        const _Type = document.getElementById("Scale_type").value;
        Chord_txt.innerHTML =  _Tonic +" "+ _Type;
        a = _Tonic;
        b = _Type;
        call_Scale(a, b);
    }
    else { }
    console.log(ScaleMode);
}


function change_length() {
    const length_switch = document.getElementById("note-length");

    longer = length_switch.value * 2;
    if (longer == 2) { tone_length = "8n"; }
    else if (longer == 4) { tone_length = "4n"; }
    else if (longer == 8) { tone_length = "2n";}
    console.log(longer);
    load();

}










const mode_switch = document.querySelectorAll(".btn");

const change_mode = document.querySelectorAll(".changemode");
    //mode_switch[0].addEventListener('click', function () {

    //    teaching_Modes = 0;
    //    ScaleDisable();
    //    pianoResume();
    //    ScaleMode = false;
    //    Chord_txt.innerHTML = "";
    //    console.log(teaching_Modes);


    //});

    mode_switch[0].addEventListener('click', function () {

        teaching_Modes = 1;
        ScaleDisable();
        pianoResume();
        ScaleMode = false;
        Chord_txt.innerHTML = "";
        mode_switch[0].style.color = "white"
        mode_switch[1].style.color = "#7891a5"
        change_mode[0].style.transform = "none";
        edit_notes = true;
        writer = '';
        recorder.push(writer);
        abcString = "X: 1 T: \nV: 1 " + "clef = " + clef_type + " \n K: \n |" + recorder.join('') + writer;
        load();
        document.getElementById("panel").style.visibility = "collapse";

    });
    mode_switch[1].addEventListener('click', function () {
        ScaleDisable();
        pianoResume();
        teaching_Modes = 2;
        ScaleMode = true;

        Chord_txt.innerHTML = "";
        mode_switch[1].style.color = "white"
        mode_switch[0].style.color = "#7891a5"
        change_mode[0].style.transform = "translateX(120px)";
        edit_notes = false;

        document.getElementById("clear").disabled = true;

       

        //const now = document.getElementById("now");
        //now.style.left = "0px";

        const scroll = document.getElementsByClassName("target-staff");
        scroll[0].scrollLeft = 0;
        document.getElementById("panel").style.visibility = "visible";

    });




//console.log(Tonal.Mode.get("Ionian").intervals.map(Tonal.Note.transposeFrom("A"))); // => "^C");this works, fuckme!!!



function pianoResume() {
    


    for (let i = 24; i < 49; i++) {
        var targetKey = document.getElementById("key" + (25 + (i - 24)));

        nameText[i] = document.getElementById("name" + (25 + (i - 24)));
       

        if (i % 12 === 0 || i % 12 === 2 || i % 12 === 4 || i % 12 === 5 || i % 12 === 7 || i % 12 === 9 || i % 12 === 11) {
            targetKey.style.background = 'linear-gradient(#fff 96%, #eee 4%)';
            nameText[i].innerHTML = note_sequence[i].substr(-3, 1);

           
            
        }
        else {
            targetKey.style.background = 'linear-gradient(#333 96%, #525050 4%)'; nameText[i].innerHTML = note_sequence[i].substr(-3, 2);
            if (b_switch == true) {
                if (nameText[i].innerHTML.length > 1) {

                    if (nameText[i].innerHTML.substr(-3, 1) == 'C') { nameText[i].innerHTML = "D♭"; }
                    else if (nameText[i].innerHTML.substr(-3, 1) == 'D') { nameText[i].innerHTML = "E♭"; }
                    else if (nameText[i].innerHTML.substr(-3, 1) == 'F') { nameText[i].innerHTML = "G♭"; }
                    else if (nameText[i].innerHTML.substr(-3, 1) == 'A') { nameText[i].innerHTML = "B♭"; }
                    else if (nameText[i].innerHTML.substr(-3, 1) == 'G') { nameText[i].innerHTML = "A♭"; }

                }
            }}
        nameText[24].innerHTML = note_sequence[24].substr(-3, 2) ;
        nameText[36].innerHTML = note_sequence[36].substr(-3, 2) ;
        nameText[48].innerHTML = note_sequence[48].substr(-3, 2);

    }
}





var test = [];

function make_sheet(test_notes) {
    if (edit_notes == true) {
    var sdf = [];

   

        if (b_switch == true) {
            if (test_notes.length > 2) {

                if (test_notes.substr(-3, 1) == 'C') { test_notes = "Db" + test_notes.substr(-1, 1); }
                else if (test_notes.substr(-3, 1) == 'D') { test_notes = "Eb" + test_notes.substr(-1, 1); }
                else if (test_notes.substr(-3, 1) == 'F') { test_notes = "Gb" + test_notes.substr(-1, 1); }
                else if (test_notes.substr(-3, 1) == 'A') { test_notes = "Bb" + test_notes.substr(-1, 1); }
                else if (test_notes.substr(-3, 1) == 'G') { test_notes = "Ab" + test_notes.substr(-1, 1); }

            }

        }

        else { }

        sdf.push(test_notes);

        test.push(sdf);

    }
    else { }
    //console.log(test_notes.substr(-3, 1) + "b"+test_notes.substr(-1,1));
}








