var Calendar = function() {

  var layOutDay = function(events) {
    var eventsLength = events.length;
    var timeslots = [];
    var event, i, j;

    //Step 1: Sort events by id.
    events = events.sort(function(a, b){return a.id - b.id;});

    //Step 2: Initialize timeslots
    for (i=0; i<720; i++) {
      timeslots[i] = [];
    }

    //Step 3: Arrange events by timeslot.
    for (i = 0; i < eventsLength; i++) {
      event = events[i];

      //Safety.
      if (event.start > event.end) {
        var temp = event.start;
        event.start = event.end;
        event.end = temp;
      }

      for (j=event.start; j<event.end; j++) {
        timeslots[j].push(event.id);
      }
    }

    //Step 4: Events Horizontal Positions and max number of conflicts.
    for (i=0; i<720; i++) {
      var next_hindex = 0;
      var timeslotLength = timeslots[i].length;

      if (timeslotLength > 0) {

        for (j=0; j<timeslotLength; j++) {
          event = events[timeslots[i][j]-1];

          if (!event.cevc || event.cevc < timeslotLength) {
            event.cevc = timeslotLength;

            if (!event.hindex) {
              event.hindex = next_hindex;

              next_hindex++;
            }
          }
        }
      }
    }

    //Step 5: Calculate Event coordinates and dimensions
    for (i=0; i<events.length; i++) {
      event = events[i];

      //Height and Y coordinates are known.
      event.pxh = event.end - event.start;
      event.pxy = event.start;

      //Width based on Calendar Width and the cevc.
      event.pxw = 600 / event.cevc;

      //Height uses same calendar/cevc figure multiplied by hindex to prevent overlap
      event.pxx = event.hindex * event.pxw;

      // Now, the easy part.
       var div = document.createElement("div");
       div.style.width = event.pxw + "px";
       div.style.height = event.pxh + "px";
       div.style.top = event.pxy + "px";
       div.style.left = event.pxx + "px";
       div.style.position = "absolute";
       div.style.background = "#"+Math.floor(Math.random()*16777215).toString(16);
       // (random colours will make the events easy to tell apart.)

       console.log(document);
       document.getElementById("calendar").appendChild(div);
    }
  };

  return {
    layOutDay : layOutDay
  };

}();

var events = [
 {id : 1, start : 30, end : 150},  // an event from 9:30am to 11:30am
 {id : 2, start : 540, end : 600}, // an event from 6pm to 7pm
 {id : 3, start : 560, end : 620}, // an event from 6:20pm to 7:20pm
 {id : 4, start : 610, end : 670} // an event from 7:10pm to 8:10pm
];

//Call Now
Calendar.layOutDay(events);
