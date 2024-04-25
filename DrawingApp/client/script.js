(function() {
    var $ = function(id) { return document.getElementById(id) };

    var canvas = this.__canvas = new fabric.Canvas('canvas', {

        isDrawingMode: true
    });
    canvas.controlsAboveOverlay = true;
    // var clip = new fabric.Path('M 162.824 27 L 337.176 27 C 349.359 27 359.25 36.891 359.25 49.074 L 359.25 450.926 C 359.25 463.109 349.359 473 337.176 473 L 162.824 473 C 150.641 473 140.75 463.109 140.75 450.926 L 140.75 49.074 C 140.75 36.891 150.641 27 162.824 27 Z  M 190.041 66 C 200.046 66 208.168 74.206 208.168 84.312 L 208.168 141.688 C 208.168 151.794 200.046 160 190.041 160 C 180.037 160 171.915 151.794 171.915 141.688 L 171.915 84.312 C 171.915 74.206 180.037 66 190.041 66 Z');
    var clip = new fabric.Path("m 123.09916,212.65982 c 0.98065,20.65785 -1.8735,40.79035 -15.84531,57.47384 -23.836198,28.46225 -57.930084,38.49618 -99.0710526,21.4682 -27.2325894,-11.27146 -42.4141744,-31.66314 -43.2894784,-59.63147 -1.382524,-44.17521 -4.643116,-88.52813 -1.897705,-132.524941 3.009725,-48.232602 21.850345,-92.0908513 61.434484,-125.732276 15.638134,-13.290401 27.405864,-11.015111 42.268851,3.554957 28.399172,27.8394977 45.612071,61.256726 54.253361,97.944157 4.66102,19.788818 3.2011,40.822913 3.9767,63.253803 -0.96063,26.03698 -1.39523,50.11538 -1.82985,74.19373 z", {
        left: 174,
        top: 36,
        selectable: false
    });
    clip.set({ fill: 'beige', fillRule: 'evenodd' })
    canvas.add(clip);
    canvas.clipPath = clip;
    canvas.renderAll();
    fabric.Object.prototype.transparentCorners = false;

    var drawingModeEl = $('drawing-mode'),
        drawingOptionsEl = $('drawing-mode-options'),
        drawingColorEl = $('drawing-color'),
        // drawingShadowColorEl = $('drawing-shadow-color'),
        drawingLineWidthEl = $('drawing-line-width'),
        // drawingShadowWidth = $('drawing-shadow-width'),
        // drawingShadowOffset = $('drawing-shadow-offset'),
        clearEl = $('clear-canvas');

    clearEl.onclick = function() {
        canvas.clear()
        var clip = new fabric.Path("m 123.09916,212.65982 c 0.98065,20.65785 -1.8735,40.79035 -15.84531,57.47384 -23.836198,28.46225 -57.930084,38.49618 -99.0710526,21.4682 -27.2325894,-11.27146 -42.4141744,-31.66314 -43.2894784,-59.63147 -1.382524,-44.17521 -4.643116,-88.52813 -1.897705,-132.524941 3.009725,-48.232602 21.850345,-92.0908513 61.434484,-125.732276 15.638134,-13.290401 27.405864,-11.015111 42.268851,3.554957 28.399172,27.8394977 45.612071,61.256726 54.253361,97.944157 4.66102,19.788818 3.2011,40.822913 3.9767,63.253803 -0.96063,26.03698 -1.39523,50.11538 -1.82985,74.19373 z", {
            left: 174,
            top: 36,
            selectable: false
        });
        clip.set({ fill: 'beige', fillRule: 'evenodd' })
        canvas.add(clip);
        canvas.clipPath = clip;
        canvas.renderAll();
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

        if (this.value === 'Horizontal Stripes') {
            canvas.freeDrawingBrush = vLinePatternBrush;
        } else if (this.value === 'Vertical Stripes') {
            canvas.freeDrawingBrush = hLinePatternBrush;
        } else if (this.value === 'Waffle') {
            canvas.freeDrawingBrush = squarePatternBrush;
        } else if (this.value === 'Diamonds') {
            canvas.freeDrawingBrush = diamondPatternBrush;
        } else if (this.value === 'Polka Dots') {
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
            // brush.shadow = new fabric.Shadow({
            //     blur: parseInt(drawingShadowWidth.value, 10) || 0,
            //     offsetX: 0,
            //     offsetY: 0,
            //     affectStroke: true,
            //     color: drawingShadowColorEl.value,
            // });
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
    // drawingShadowColorEl.onchange = function() {
    //     canvas.freeDrawingBrush.shadow.color = this.value;
    // };
    drawingLineWidthEl.onchange = function() {
        canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
        this.previousSibling.innerHTML = this.value;
    };
    // drawingShadowWidth.onchange = function() {
    //     canvas.freeDrawingBrush.shadow.blur = parseInt(this.value, 10) || 0;
    //     this.previousSibling.innerHTML = this.value;
    // };
    // drawingShadowOffset.onchange = function() {
    //     canvas.freeDrawingBrush.shadow.offsetX = parseInt(this.value, 10) || 0;
    //     canvas.freeDrawingBrush.shadow.offsetY = parseInt(this.value, 10) || 0;
    //     this.previousSibling.innerHTML = this.value;
    // };

    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = drawingColorEl.value;
        // maskNail();
        // canvas.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);
        canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
        // canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        //     blur: parseInt(drawingShadowWidth.value, 10) || 0,
        //     offsetX: 0,
        //     offsetY: 0,
        //     affectStroke: true,
        //     color: drawingShadowColorEl.value,
        // });
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


})();