function initCanvas() {
    try {
        // Create a new Fabric.js canvas instance
        const canvas = new fabric.Canvas('canvas');

        // Log canvas dimensions
        console.log('Canvas width:', canvas.width, 'Canvas height:', canvas.height);

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

        console.log('Rectangle added successfully');
    } catch (error) {
        console.error('Error initializing canvas:', error);
    }
}