console.log('Client.js loaded');
console.log(fabric);


// Create Fabric.js canvas
var canvas = new fabric.Canvas('canvas');

// Create a circle object
var circle = new fabric.Circle({
    radius: 30,
    fill: '#f55',
    top: 100,
    left: 100
});

// Add the circle to the canvas
canvas.add(circle);