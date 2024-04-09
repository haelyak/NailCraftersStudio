document.addEventListener("DOMContentLoaded", function() {
    // Get a reference to the canvas element
    var canvasElement = document.getElementById('canvas');

    // Set canvas dimensions to fill the viewport
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;

    // Initialize Fabric.js canvas
    var canvas = new fabric.Canvas(canvasElement, {
        backgroundColor: 'white',
        selectionColor: 'rgba(0,255,0,0.3)',
        selectionBorderColor: 'red',
        selectionLineWidth: 5
    });

    // Load JSON file containing object data
    fetch('objects.json')
        .then(response => response.json())
        .then(data => {
            // Iterate through each object in the JSON data
            data.forEach(obj => {
                // Create Fabric.js object based on object type
                var fabricObject;
                if (obj.type === 'circle') {
                    fabricObject = new fabric.Circle({
                        radius: obj.radius,
                        fill: obj.fill,
                        top: obj.top,
                        left: obj.left
                    });
                } else if (obj.type === 'rect') {
                    fabricObject = new fabric.Rect({
                        width: obj.width,
                        height: obj.height,
                        fill: obj.fill,
                        top: obj.top,
                        left: obj.left
                    });
                }
                // Add Fabric.js object to canvas
                canvas.add(fabricObject);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});

%
7 B "objects" % 3 A % 5 B % 7 B "type" % 3 A "rect" % 2 C "left" % 3 A103 .85 % 2 C "top" % 3 A98 .85 % 2 C "width" % 3 A50 % 2 C "height" % 3 A50 % 2 C "fill" % 3 A "%239ae759" % 2 C "overlayFill" % 3 Anull % 2 C "stroke" % 3 Anull % 2 C "strokeWidth" % 3 A1 % 2 C "strokeDashArray" % 3 Anull % 2 C "scaleX" % 3 A1 .39 % 2 C "scaleY" % 3 A1 .39 % 2 C "angle" % 3 A30 % 2 C "flipX" % 3 Afalse % 2 C "flipY" % 3 Afalse % 2 C "opacity" % 3 A0 .8 % 2 C "selectable" % 3 Atrue % 2 C "hasControls" % 3 Atrue % 2 C "hasBorders" % 3 Atrue % 2 C "hasRotatingPoint" % 3 Afalse % 2 C "transparentCorners" % 3 Atrue % 2 C "perPixelTargetFind" % 3 Afalse % 2 C "rx" % 3 A0 % 2 C "ry" % 3 A0 % 7 D % 5 D % 2 C "background" % 3 A "rgba(0%2C%200%2C%200%2C%200)" % 7 D