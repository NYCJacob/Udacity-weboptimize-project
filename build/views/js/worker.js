/**
 * Created by jsherman on 12/20/16.
 */

// Moves the sliding background pizzas based on scroll position
 function updatePositions(scrollPosition) {
    frame++;
    window.performance.mark("mark_start_frame");

    var items = document.getElementsByClassName('mover');
    for (var i = 0; i < items.length; i++) {
        var phase = Math.sin((scrollPosition/ 1250) + (i % 5));
        // items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
        var startLeft = items[i].style.left;
        var startX = parseInt(startLeft.slice(0, -2));
        items[i].style.transform = 'translateX(' + (startX + 100 * phase) + 'px)';
    }

    // User Timing API to the rescue again. Seriously, it's worth learning.
    // Super easy to create custom metrics.
    window.performance.mark("mark_end_frame");
    window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
    if (frame % 10 === 0) {
        var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
        logAverageFrame(timesToUpdatePosition);
    }

    worker.postMessage('worker done');
 }

 this.onmessage = function (e) {
     console.log('message received from main.js');
     var scrollPosition =  e.data;
     updatePositions(scrollPosition)
 };
