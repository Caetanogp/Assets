let explosionImg;
let explosion;

let speedSlider;
let loopCheckbox;

const FRAME_COLS = 16;
const FRAME_ROWS = 1;

function preload() {
  explosionImg = loadImage('./assets/image/explosion.png');
}

function setup() {
  createCanvas(600, 600);
  explosion = new Explosion(width / 2, height / 2, 4, true);

  speedSlider = createSlider(1, 20, 4);
  speedSlider.position(10, 10);
  speedSlider.style('width', '100px');

  loopCheckbox = createCheckbox('Repetir explosão', true);
  loopCheckbox.position(10, 40);
}

function draw() {
  background(0);

  // Atualiza parâmetros com os controles da tela
  explosion.delayFrames = speedSlider.value();
  explosion.loop = loopCheckbox.checked();

  explosion.update();
  explosion.draw();
}

class Explosion {
  constructor(x, y, delayFrames = 4, loop = true) {
    this.x = x;
    this.y = y;
    this.delayFrames = delayFrames;
    this.loop = loop;

    this.frame = 0;
    this.counter = 0;

    this.frameW = explosionImg.width / FRAME_COLS;
    this.frameH = explosionImg.height / FRAME_ROWS;
    this.totalFrames = FRAME_COLS * FRAME_ROWS;
  }

  update() {
    this.counter++;
    if (this.counter >= this.delayFrames) {
      this.counter = 0;
      this.frame++;

      if (this.frame >= this.totalFrames) {
        if (this.loop) {
          this.frame = 0;
        } else {
          this.frame = this.totalFrames - 1;
        }
      }
    }
  }

  draw() {
    const col = this.frame % FRAME_COLS;
    const row = Math.floor(this.frame / FRAME_COLS);
    const sx = col * this.frameW;
    const sy = row * this.frameH;

    image(
      explosionImg,
      this.x - this.frameW / 2,
      this.y - this.frameH / 2,
      this.frameW,
      this.frameH,
      sx,
      sy,
      this.frameW,
      this.frameH
    );
  }
}
