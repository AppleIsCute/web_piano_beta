

let updown01 = ['q','2','w','3','e','4','r','t', '6', 'y', '7', 'u', 'i','9', 'o', '0', 'p', '-',"[","]"]; // start from f3
let updown02 = ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n','j', 'm',  ",", 'l', ".", ";", "/"]; /// start from c3
var gaswrite = [];
var writer;
var recorder = [];
//var srollttest=20;







    piano = new Tone.Sampler({
        urls: {

            C4: "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            A4: "A4.mp3",
            //C4: "C4v14.mp3",
            //"D#4": "D%234v14.mp3",
            //"F#4": "F%234v14.mp3",
            //C5: "C5v14.mp3",
            //"F#5": "F%235v14.mp3",
            //A5:"A5v14.mp3",
            //"D#5:":"D%235v14.mp3",
            //C6: "C6v14.mp3", 
            //C7: "C7v14.mp3",

        },
        release: 1,
        volume: 0.5,

//baseUrl: "https://unpkg.com/@audio-samples/piano-mp3-velocity14@1.0.5/audio/",
       baseUrl:" https://tonejs.github.io/audio/salamander/",
       
    }).toDestination();





window.addEventListener('keydown', function (e) {
    if (e.repeat) { return; }

    var keyID = event.key;

   

    for (let j = 0; j < 73; j++) {


        if (event.key === updown01[j]) {
            
                var targetDiv = document.getElementById("key" + (j +1+29));
                targetDiv.style.background = 'linear-gradient(#E74949 96%, #CA1717 4%)';

            piano.triggerAttackRelease(note_sequence[j+29], tone_length);

            NowChord.push(53 + j);
            make_sheet(note_sequence[j + 29]);

           

          




            for (i = 0; i < test.length; i++) {

                test[i] = test[i].toString();

                gaswrite[i] = Tonal.AbcNotation.scientificToAbcNotation(test[i])+longer;// to abcjs form



                if (test.length > 1) {
                    writer = "[" + gaswrite.join("") + "]"
                }
                else { writer = "" + gaswrite + ""; }
            }




            if (staff_switch == false && edit_notes == true) {
                
                abcString = "X: 1 T: \nV: 1 " + "clef = " + clef_type + " \n K: \n |" + recorder.join('')+writer+"\n"+"w: \n ";
                load();
            }





        
        }


        if (event.key === updown02[j]) {

            var targetDiv = document.getElementById("key" + (j + 1 + 24));
            targetDiv.style.background = 'linear-gradient(#E74949 96%, #CA1717 4%)';

            piano.triggerAttackRelease(note_sequence[j + 24], tone_length);

            NowChord.push(36 + j);
            make_sheet(note_sequence[j + 24]);


           

            for (i = 0; i < test.length; i++) {
                
                test[i] = test[i].toString();
                
                gaswrite[i] = Tonal.AbcNotation.scientificToAbcNotation(test[i])+longer;// to abcjs form

               

                if (test.length > 1) {
                    writer = "[" + gaswrite.join("") + "]"
                }
                else { writer = ""+gaswrite+""; }     
            }

            


            if (staff_switch == false && edit_notes == true) {
                
                abcString = "X: 1 T: \nV: 1 " + "clef = " + clef_type + " \n K: \n |" + recorder.join('')+ writer;
                load();
            }

           
          

        }

      

        
    }

    
    NowChord.sort();
    Chord_detect();
    
  
    

}, false);










document.addEventListener('keyup', function (event) {
    var keyID = event.key;



    for (let j = 0; j < 73; j++) {
        if (event.key === updown01[j]) {

            var targetDiv = document.getElementById("key" + (j + 1 + 29));
            var i = j + 29;

            if (i % 12 === 0 || i % 12 === 2 || i % 12 === 4 || i % 12 === 5 || i % 12 === 7 || i % 12 === 9 || i % 12 === 11) { targetDiv.style.background = 'linear-gradient(#fff 96%, #eee 4%)'; }
            else { targetDiv.style.background = 'linear-gradient(#333 96%, #525050 4%)'; }

            if (staff_switch == true && edit_notes == true) {
               
                recorder.push(writer);
                writer = "";
                //console.log(recorder, writer.length);
               // abcString = "X: 1 T: \nV: 1 " + "clef = " + clef_type + " \n K: \n |" + recorder.join('') + writer;//
                abcString ="X: 1 T: \nV: 1 " + "clef = " + clef_type + " \n K: \n |" + recorder.join('') + writer + "\n" + "w: \n ";

                load();

                const scroll = document.getElementsByClassName("target-staff");

                scroll[0].scrollLeft = scroll[0].scrollWidth;
                //console.log(scroll[0].style.width);

                //srollttest += 10;

                staff_add += 30;

                //const now = document.getElementById("now");
                //now.style.left = (staff_add - 830) + "px";
                //scroll[0].scrollLeft = srollttest ;
                //console.log(srollttest);






            }

            ///important lines//
            test.length = 0;
            gaswrite.length = 0;
            writer = "";
            ///important lines//

        }

        if (event.key === updown02[j]) {

            var targetDiv = document.getElementById("key" + (j + 1 + 24));
            var i = j + 24;
            if (i % 12 === 0 || i % 12 === 2 || i % 12 === 4 || i % 12 === 5 || i % 12 === 7 || i % 12 === 9 || i % 12 === 11) { targetDiv.style.background = 'linear-gradient(#fff 96%, #eee 4%)'; }
            else { targetDiv.style.background = 'linear-gradient(#333 96%, #525050 4%)'; }

            if (staff_switch == true && edit_notes == true) {
               
                recorder.push(writer);
                writer = "";
               // console.log(recorder, writer.length);
                abcString = "X: 1 T: \nV: 1 " + "clef = " + clef_type + " \n K: \n |" + recorder.join('') + writer;



                load();

                

                const scroll = document.getElementsByClassName("target-staff");

                scroll[0].scrollLeft = scroll[0].scrollWidth;
               

              
                staff_add += 30;
              
                //const now = document.getElementById("now");
                //now.style.left = (staff_add -830) + "px";


            }

           // console.log(clef_type);


            ///important lines//

            test.length = 0;
            gaswrite.length = 0;
            writer = "";

            ///important lines//
        }


        NowChord.splice(NowChord.indexOf(53 + j), 1);
        Nownote.splice(Nownote.indexOf(53 + j), 1);
        NowChord.splice(NowChord.indexOf(36 + j), 1);
        Nownote.splice(Nownote.indexOf(36 + j), 1);
      
        

        
        
        
    }
  
   
   

},false);






