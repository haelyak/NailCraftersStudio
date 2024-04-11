class Canvas {
    constructor(socket, room) {
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');
        this.activeColor = '#000000';
        this.startPoint = null;
        this.endPoint = null;
        this.pointMode = 'start';
        this.mode = 'Paint';
        this.handleDraw = this.handleDraw.bind(this);
        this.canvas.addEventListener('click', this.handleDraw);
        this.shapeMessages = [
            { type: 'brush', start: 'Drag your mouse to paint the nail', end: 'Select the ending point' },
            { type: 'rectangle', start: 'Select the first corner', end: 'Select the second corner' },
            { type: 'circle', start: 'Select the middle of the circle', end: 'Select the edge of the circle' }
        ];
        this.socket = socket;
        this.room = room;
        this.displayMode();
        this.displayMessage();
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        // Array to store points for drawing freehand paths
        this.freehandPoints = [];
        // Add an array to store separate paths for each stroke
        this.freehandPaths = [];
        // Add an array to store the color of each stroke
        this.freehandColors = [];
        // Add a variable to track the current drawing color
        this.currentColor = '#000000';
        this.lineWidth = 2; // Default line width
        this.lineWidths = []; // Array to store line widths for each stroke
    }

    setColor(color) {
        this.activeColor = color;
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
    }

    setLineWidth(width) {
        // Update the line width
        this.lineWidth = width;
        // Update the line width of the canvas context
        this.ctx.lineWidth = width;
    }

    setMode(mode) {
        this.mode = mode;
        this.displayMode();
        this.displayMessage();
    }

    handleDraw(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (this.mode == 'Paint') {
            this.drawFreehand();
            this.setLineWidth(5);
        } else if (this.mode == 'Detail') {
            this.drawFreehand();
            this.setLineWidth(1);
            this.socket.sendDraw(this.room, this.mode, this.activeColor, this.startPoint, this.endPoint);
            this.startPoint = null;
            this.endPoint = null;
        }
        this.displayMessage();
    }

    drawMessage(msg) {
        const { mode, color, startPoint, endPoint } = msg;
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        if (mode === 'Paint') {
            this.drawFreehand();
        } else if (mode === 'Detail') {
            this.drawFreehand();
        }
        this.ctx.strokeStyle = this.activeColor;
        this.ctx.fillStyle = this.activeColor;
    }

    drawLine(startPoint, endPoint) {
        this.ctx.beginPath();
        this.ctx.moveTo(startPoint[0], startPoint[1]);
        this.ctx.lineTo(endPoint[0], endPoint[1]);
        this.ctx.stroke();
    }

    drawHollowRectangle(startPoint, endPoint) {
        this.ctx.beginPath();
        this.ctx.strokeRect(
            startPoint[0],
            startPoint[1],
            endPoint[0] - startPoint[0],
            endPoint[1] - startPoint[1]
        );
    }

    drawFilledRectangle(startPoint, endPoint) {
        this.ctx.beginPath();
        this.ctx.fillRect(
            startPoint[0],
            startPoint[1],
            endPoint[0] - startPoint[0],
            endPoint[1] - startPoint[1]
        );
    }

    drawHollowCircle(startPoint, endPoint) {
        const x = startPoint[0] - endPoint[0];
        const y = startPoint[1] - endPoint[1];
        const radius = Math.sqrt(x * x + y * y);
        this.ctx.beginPath();
        this.ctx.arc(startPoint[0], startPoint[1], radius, 0, 2 * Math.PI, false);
        this.ctx.stroke();
    }

    drawFilledCircle(startPoint, endPoint) {
        const x = startPoint[0] - endPoint[0];
        const y = startPoint[1] - endPoint[1];
        const radius = Math.sqrt(x * x + y * y);
        this.ctx.beginPath();
        this.ctx.arc(startPoint[0], startPoint[1], radius, 0, 2 * Math.PI, false);
        this.ctx.fill();
    }

    displayMode() {
        const modeDiv = document.querySelector('#mode');
        modeDiv.innerHTML = this.mode;
    }

    getModeType(mode) {
        let type = '';
        switch (mode) {
            case 'Paint':
            case 'Detail':
                type = 'brush';
                break;
            case 'Hollow Rectangle':
            case 'Filled Rectangle':
                type = 'rectangle';
                break;
            case 'Hollow Circle':
            case 'Filled Circle':
                type = 'circle';
                break;
        }
        return type;
    }

    displayMessage() {
        const type = this.getModeType(this.mode);
        const find = this.shapeMessages.find(m => m.type === type);
        const msgDiv = document.querySelector('#message');
        msgDiv.innerHTML = find[this.pointMode];
    }

    clear() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Clear the arrays storing paths, colors, and line widths
        this.freehandPoints = [];
        this.freehandPaths = [];
        this.freehandColors = [];
        this.lineWidths = [];
        this.drawImage();

        // Notify the server to clear the canvas for other users
        this.socket.sendClear();
    }

    download() {
        const image = this.canvas.toDataURL('image/png', 1.0);
        image.replace('image/png', 'image/octet-stream');
        const link = document.createElement('a');
        link.download = 'canvas-image.png';
        link.href = image;
        link.click();
    }

    clearMessage(msg) {
        this.ctx.clearRect(0, 0, 500, 500);
    }
    async getImage() {
        const result = await fetch(`http://localhost:3000/api/room/${this.room.room}`);
        const image = await result.json();
        if (image.result) {
            const img = new Image();
            img.onload = e => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(img, 0, 0, img.width, img.height);
            }
            img.setAttribute('src', image.result.image);
        }
    }
    async save() {
        const image = this.canvas.toDataURL();
        await fetch(`http://localhost:3000/api/session/${this.room.room}`, {
            method: 'POST',
            body: JSON.stringify({ image }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    drawImage() {
        const img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height); // Draw the image to cover the entire canvas
        };
        img.src = "nail.png"
    }

    setColor(color) {
        // Update the current drawing color
        this.currentColor = color;
    }

    setLineWidth(width) {
        // Update the line width
        this.lineWidth = width;
        // Update the line width of the canvas context
        this.ctx.lineWidth = width;
    }

    addPoint(x, y) {
        // Add the current mouse position to the current path
        const rect = this.canvas.getBoundingClientRect();
        this.currentPath.push({ x: x - rect.left, y: y - rect.top });
    }

    handleMouseDown(e) {
        // Start capturing points when the mouse button is pressed
        // Create a new path for the current stroke
        this.isDrawing = true;
        this.currentPath = [];
        // Store the current line width for this stroke
        this.currentLineWidth = this.lineWidth;
        this.lineWidths.push(this.currentLineWidth);
        // Record the color for the new stroke
        this.freehandColors.push(this.currentColor);
        this.addPoint(e.clientX, e.clientY);
    }

    handleMouseMove(e) {
        // If drawing, add points as the mouse moves
        if (this.isDrawing) {
            this.addPoint(e.clientX, e.clientY);
            this.drawFreehand();
        }
    }

    handleMouseUp() {
        // Stop capturing points when the mouse button is released
        this.isDrawing = false;
        // Add the completed path to the array of paths
        if (this.currentPath.length > 0) {
            this.freehandPaths.push(this.currentPath);
        }
    }

    drawFreehand() {
        // Your existing drawFreehand code here
        const ctx = this.ctx;
        ctx.lineWidth = this.currentLineWidth; // Set the line width for this stroke
        // Draw the stroke with the current line width
        for (let i = 0; i < this.freehandPaths.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = this.freehandColors[i]; // Set the stroke color
            ctx.moveTo(this.freehandPaths[i][0].x, this.freehandPaths[i][0].y);
            for (let j = 1; j < this.freehandPaths[i].length; j++) {
                ctx.lineTo(this.freehandPaths[i][j].x, this.freehandPaths[i][j].y);
            }
            ctx.stroke();
        }
        // Draw the current path being drawn
        ctx.strokeStyle = this.currentColor; // Set the stroke color for the current path
        ctx.beginPath();
        const currentPath = this.currentPath;
        if (currentPath.length > 0) {
            ctx.moveTo(currentPath[0].x, currentPath[0].y);
            for (let i = 1; i < currentPath.length; i++) {
                ctx.lineTo(currentPath[i].x, currentPath[i].y);
            }
            ctx.stroke();
        }
    }

}

class Palette {
    constructor() {
        this.colors = [
            ['#000000', '#FFFFFF', '#7F7F7F', '#C3C3C3', '#880015', '#B97A57', '#ED1C24', '#FFAEC9', '#FF7F27', '#FFC90E'],
            ['#FFF200', '#EFE4B0', '#22B14C', '#B5E61D', '#00A2E8', '#99D9EA', '#3F48CC', '#7092BE', '#A349A4', '#C8BFE7']
        ];
    }

    draw(canvas) {
        const row1 = document.querySelectorAll('#row-1 .palette');
        const row2 = document.querySelectorAll('#row-2 .palette');
        row1.forEach((div, idx) => {
            div.style.backgroundColor = this.colors[0][idx];
            div.onclick = e => canvas.setColor(this.colors[0][idx]);
        });
        row2.forEach((div, idx) => {
            div.style.backgroundColor = this.colors[1][idx];
            div.onclick = e => canvas.setColor(this.colors[1][idx]);
        });
    }
}

class Socket {
    constructor(room) {
        this.socket = new WebSocket('ws://localhost:8080');
        this.socket.onmessage = msg => this.handleMessage(msg);
        this.room = room;
    }

    sendDraw(room, mode, color, startPoint, endPoint) {
        this.socket.send(JSON.stringify({
            type: 'draw',
            roomId: room.id,
            roomName: room.room,
            mode,
            color,
            startPoint,
            endPoint
        }));
    }

    async handleMessage(msg) {
        const msgDecoded = JSON.parse(await msg.data.text());
        if (msgDecoded.roomName == this.room.room && msgDecoded.roomId !== this.room.id) {
            if (msgDecoded.type === 'draw') {
                this.canvas.drawMessage(msgDecoded);
            } else if (msgDecoded.type === 'clear') {
                this.canvas.clearMessage(msgDecoded);
            }
        }
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }

    sendClear() {
        this.socket.send(JSON.stringify({
            type: 'clear',
            roomId: this.room.id,
            roomName: this.room.room
        }));
    }
}

class Room {
    constructor() {
        this.getRoom();
        this.id = Math.round(Math.random() * 10000).toString();
    }

    getRoom() {
        const { pathname } = location;
        if (pathname !== '/') {
            this.room = pathname.split('/')[1];
        } else {
            this.room = Math.round(Math.random() * 10000).toString();
            history.pushState({}, '', '/' + this.room);
        }
    }
}