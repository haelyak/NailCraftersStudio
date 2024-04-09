class Canvas {
    constructor() {
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');
    }
}

class Palette {
    constructor() {
        this.colors = [
            ['#000000', '#FFFFFF', '#7F7F7F', '#C3C3C3', '#880015', '#B97A57', '#ED1C24', '#FFAEC9', '#FF7F27', '#FFC90E'],
            ['#FFF200', '#EFE4B0', '#22B14C', '#B5E61D', '#00A2E8', '#99D9EA', '#3F48CC', '#7092BE', '#A349A4', '#C8BFE7']
        ];
    }
    draw() {
        const row1 = document.querySelectorAll('#row-1 .palette');
        const row2 = document.querySelectorAll('#row-2 .palette');
        row1.forEach((div, idx) => {
            div.style.backgroundColor = this.colors[0][idx];
        });
        row2.forEach((div, idx) => {
            div.style.backgroundColor = this.colors[1][idx];
        });
    }
}