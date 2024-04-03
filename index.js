function initCanvas() {
    // Create a new Fabric.js canvas instance
    const canvas = new fabric.Canvas('canvas');

    // Example: Add a rectangle to the canvas
    const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 200,
        height: 100
    });

    // Add the rectangle to the canvas
    canvas.add(rect);
}