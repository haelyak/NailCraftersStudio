(function() {
    var $ = function(id) { return document.getElementById(id) };

    var canvas = this.__canvas = new fabric.Canvas('canvas', {

        isDrawingMode: true
    });
    canvas.controlsAboveOverlay = true;
    // var clip = new fabric.Path('M 162.824 27 L 337.176 27 C 349.359 27 359.25 36.891 359.25 49.074 L 359.25 450.926 C 359.25 463.109 349.359 473 337.176 473 L 162.824 473 C 150.641 473 140.75 463.109 140.75 450.926 L 140.75 49.074 C 140.75 36.891 150.641 27 162.824 27 Z  M 190.041 66 C 200.046 66 208.168 74.206 208.168 84.312 L 208.168 141.688 C 208.168 151.794 200.046 160 190.041 160 C 180.037 160 171.915 151.794 171.915 141.688 L 171.915 84.312 C 171.915 74.206 180.037 66 190.041 66 Z');
    var clip = new fabric.Path("m 120.13284,206.74386 c 0.9626,20.16453 -1.83902,39.81626 -15.55368,56.10132 -23.397495,27.78257 -56.863886,37.57688 -97.247659,20.95554 -26.731376,-11.00229 -41.633546,-30.90701 -42.49274,-58.20745 -1.357078,-43.12027 -4.55766,-86.41402 -1.862778,-129.360155 2.954332,-47.080777 21.448192,-89.8916649 60.303789,-122.729712 15.350316,-12.973018 26.901462,-10.752064 41.490897,3.470063 27.876488,27.174673 44.772581,59.793877 53.254831,95.605191 4.57523,19.316248 3.14219,39.848033 3.90351,61.743273 -0.94295,25.41519 -1.36955,48.91858 -1.79617,72.42193 z", {
        left: 176,
        top: 40
    });
    clip.set({ fill: 'blue', fillRule: 'evenodd' })
    canvas.add(clip);
    // canvas.centerObject(clip);
    fabric.Image.fromURL('https://cdn.pixabay.com/photo/2015/12/09/01/02/colorful-abstract-background-1084082_640.jpg', function(img) {
        canvas.add(img);
        canvas.clipPath = clip;
    })
    canvas.renderAll();
    fabric.Object.prototype.transparentCorners = false;

    var drawingModeEl = $('drawing-mode'),
        drawingOptionsEl = $('drawing-mode-options'),
        drawingColorEl = $('drawing-color'),
        drawingShadowColorEl = $('drawing-shadow-color'),
        drawingLineWidthEl = $('drawing-line-width'),
        drawingShadowWidth = $('drawing-shadow-width'),
        drawingShadowOffset = $('drawing-shadow-offset'),
        clearEl = $('clear-canvas');

    clearEl.onclick = function() {
        canvas.clear()
    };

    drawingModeEl.onclick = function() {
        canvas.isDrawingMode = !canvas.isDrawingMode;
        if (canvas.isDrawingMode) {
            drawingModeEl.innerHTML = 'Cancel drawing mode';
            drawingOptionsEl.style.display = '';
        } else {
            drawingModeEl.innerHTML = 'Enter drawing mode';
            drawingOptionsEl.style.display = 'none';
        }
    };

    function maskNail() {
        fabric.loadSVGFromURL('output.svg', function(objects, options) {
            console.log("red nail");
            var shape = fabric.util.groupSVGElements(objects, options);
            canvas.add(shape);
            canvas.clipTo = function(ctx) {
                shape.render(ctx);
            };
            canvas.setDimensions({ width: shape.width, height: shape.height });
            canvas.renderAll();
        });
    };


    if (fabric.PatternBrush) {
        var vLinePatternBrush = new fabric.PatternBrush(canvas);
        // maskNail();
        vLinePatternBrush.getPatternSrc = function() {

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext('2d');

            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(0, 5);
            ctx.lineTo(10, 5);
            ctx.closePath();
            ctx.stroke();

            return patternCanvas;
        };

        var hLinePatternBrush = new fabric.PatternBrush(canvas);
        // maskNail();
        hLinePatternBrush.getPatternSrc = function() {

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext('2d');

            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(5, 0);
            ctx.lineTo(5, 10);
            ctx.closePath();
            ctx.stroke();
            // maskNail();
            return patternCanvas;
        };

        var squarePatternBrush = new fabric.PatternBrush(canvas);
        // maskNail();
        squarePatternBrush.getPatternSrc = function() {

            var squareWidth = 10,
                squareDistance = 2;

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
            var ctx = patternCanvas.getContext('2d');

            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, squareWidth, squareWidth);
            return patternCanvas;
        };

        var diamondPatternBrush = new fabric.PatternBrush(canvas);
        // maskNail();
        diamondPatternBrush.getPatternSrc = function() {

            var squareWidth = 10,
                squareDistance = 5;
            var patternCanvas = fabric.document.createElement('canvas');
            var rect = new fabric.Rect({
                width: squareWidth,
                height: squareWidth,
                angle: 45,
                fill: this.color
            });

            var canvasWidth = rect.getBoundingRect().width;

            patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
            rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

            var ctx = patternCanvas.getContext('2d');
            rect.render(ctx);

            return patternCanvas;
        };

        var img = new Image();
        img.src = 'hand.jpg';

        var texturePatternBrush = new fabric.PatternBrush(canvas);
        // maskNail();
        texturePatternBrush.source = img;
    }

    $('drawing-mode-selector').onchange = function() {

        if (this.value === 'hline') {
            canvas.freeDrawingBrush = vLinePatternBrush;
        } else if (this.value === 'vline') {
            canvas.freeDrawingBrush = hLinePatternBrush;
        } else if (this.value === 'square') {
            canvas.freeDrawingBrush = squarePatternBrush;
        } else if (this.value === 'diamond') {
            canvas.freeDrawingBrush = diamondPatternBrush;
        } else if (this.value === 'texture') {
            canvas.freeDrawingBrush = texturePatternBrush;
        } else {
            canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
        }

        if (canvas.freeDrawingBrush) {
            var brush = canvas.freeDrawingBrush;
            brush.color = drawingColorEl.value;
            if (brush.getPatternSrc) {
                brush.source = brush.getPatternSrc.call(brush);
            }
            brush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
            brush.shadow = new fabric.Shadow({
                blur: parseInt(drawingShadowWidth.value, 10) || 0,
                offsetX: 0,
                offsetY: 0,
                affectStroke: true,
                color: drawingShadowColorEl.value,
            });
        }
    };

    drawingColorEl.onchange = function() {
        var brush = canvas.freeDrawingBrush;
        // maskNail();
        brush.color = this.value;
        if (brush.getPatternSrc) {
            brush.source = brush.getPatternSrc.call(brush);
        }
    };
    drawingShadowColorEl.onchange = function() {
        canvas.freeDrawingBrush.shadow.color = this.value;
    };
    drawingLineWidthEl.onchange = function() {
        canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
        this.previousSibling.innerHTML = this.value;
    };
    drawingShadowWidth.onchange = function() {
        canvas.freeDrawingBrush.shadow.blur = parseInt(this.value, 10) || 0;
        this.previousSibling.innerHTML = this.value;
    };
    drawingShadowOffset.onchange = function() {
        canvas.freeDrawingBrush.shadow.offsetX = parseInt(this.value, 10) || 0;
        canvas.freeDrawingBrush.shadow.offsetY = parseInt(this.value, 10) || 0;
        this.previousSibling.innerHTML = this.value;
    };

    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = drawingColorEl.value;
        // maskNail();
        // canvas.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);
        canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
        canvas.freeDrawingBrush.shadow = new fabric.Shadow({
            blur: parseInt(drawingShadowWidth.value, 10) || 0,
            offsetX: 0,
            offsetY: 0,
            affectStroke: true,
            color: drawingShadowColorEl.value,
        });
    }
    document.getElementById('imgLoader').onchange = function handleImage(e) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function() {
                var image = new fabric.Image(imgObj);
                image.set({
                    angle: 0,
                    padding: 10,
                    cornersize: 10,
                    height: 110,
                    width: 110,
                });
                canvas.centerObject(image);
                canvas.add(image);
                canvas.renderAll();
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    fabric.loadSVGFromURL('output.svg', function(objects, options) {
        console.log("red nail");
        var shape = fabric.util.groupSVGElements(objects, options);
        canvas.add(shape);
        canvas.clipTo = function(ctx) {
            shape.render(ctx);
        };
        canvas.renderAll();
    });

})();