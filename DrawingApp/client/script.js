var canvas = new fabric.Canvas('canvas');

fabric.Image.fromURL('https://i.pinimg.com/736x/97/f5/98/97f598a33ebd734731cd92c1ba778d2c.jpg', function(myImg) {
    //i create an extra var for to change some image properties
    var img1 = myImg.set({ left: 0, top: 0, width: 500, height: 500 });
    canvas.add(img1);
});

canvas.on('mouse:down', function(event) {
    if (canvas.getActiveObject()) {
        alert(event.target);
    }

})

canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));

canvas.selectionColor = 'rgba(0,255,0,0.3)';
canvas.selectionBorderColor = 'red';
canvas.selectionLineWidth = 5;