class Disk {
  constructor(_x, _y, _idx) {
    this.x = _x;
    this.y = _y;
    this.sz = _idx*40;
    this.c = [random(255), random(255), random(255)];

    this.xSpeed = 0;
    this.ySpeed = 0;

    this.from = 0;
    this.to = 0;
    this.mv = 0;
  }

  show() {
    rectMode(CENTER);
    fill(this.c[0], this.c[1], this.c[2]);
    rect(this.x, this.y, this.sz, 20);

    fill(255-this.c[0], 255-this.c[1], 255-this.c[2]);
    textAlign(CENTER, CENTER);
    text((this.sz/40).toString(), this.x, this.y);

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if(this.x == pillars[this.from].x) {
      if(this.y>50) this.ySpeed = -5;
      else {
        this.ySpeed = 0;
        this.xSpeed = (this.to - this.from)>0 ? 5:-5;
      }
    }
    
    if(this.x == pillars[this.to].x) {
      this.xSpeed = 0;
      if(this.y < pillars[this.to].level) this.ySpeed = 5;
      else {
        this.ySpeed = 0;
        
        pillars[this.from].level += 25;
        pillars[this.to].level -= 25;
        
        this.mv = 0;
        this.from = this.to = 0;
      }
    }
  }
}

class Pillar {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.level = 280;
  }

  show() {
    rectMode(CENTER);
    fill(0);
    rect(this.x, this.y, 10, 200);
    rect(this.x, this.y+100, 100, 10);
  }
}

let inp, btn;

let pillars = [];
let disks = [];
let moves = [];

let fin;
let idx, cur;

function setup() {
  inp = select('#inp');
  btn = select('#btn');

  let canvas = createCanvas(750, 400);
  canvas.parent("canvasp");

  fin = 1;
  for(let _x=width/2-width/3;_x<width;_x+=width/3) {
    let t = new Pillar(_x, height/2);
    pillars.push(t);
  }

  btn.mousePressed(init);
  
}

function draw() {
  background(220);

  for(let i=0;i<3;i++) pillars[i].show();
  if(disks.length > 0) {
    for(let i=0;i<N;i++) disks[i].show();
  }

  if(fin == 0) {
    if(idx<0 || disks[cur].mv == 0) {
      idx++;
      
      // Finish
      if(idx == moves.length) {
        let p = createP("Finishi!!!");
        fin = 1;
      }

      // Move
      else {
        let p = createElement("li", "Move " + (moves[idx][0]+1).toString() + "st disk to " + (moves[idx][2]+1).toString() + "st pillar")
        p.parent("route");

        cur = moves[idx][0];
        disks[cur].from = moves[idx][1];
        disks[cur].to = moves[idx][2];
        disks[cur].mv = 1;
      }
    }
  }
}

function init() {
  N = parseInt(inp.value());
  removeElements();

  fin = 0;
  for(let i=0;i<3;i++) pillars[i].level = 280;

  disks = [];
  for(let i=N;i>0;i--) {
    let t = new Disk(pillars[0].x, pillars[0].level, i, 0);
    disks.push(t);

    pillars[0].level -= 25;
  }

  disks = disks.reverse();

  moves = [];
  getHanoi(N, 0, 2, 1);

  idx = -1;
}

function getHanoi(n, from, to, temp) {
  if (n >= 1) {
    getHanoi(n-1, from, temp, to);
    
    moves.push([n-1, from, to]);
    
    getHanoi(n-1, temp, to, from);
  }
}