let N, fin, cnt=0;
let dots = [];

let printCnt;
let printRet;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('canvas');
  
  fin = 1;
  let s = select("#num");
  s.changed(init);

  N = 0;
  printCnt = select("#counts");
  printRet = select("#result");

  let btn = select("#btn");
  btn.mousePressed(function(){ noLoop(); });

  background(0);
}

function draw() {
  background(0);
  
  // draw point
  strokeWeight(2);
  stroke(255);
  for(let i=0;i<dots.length;i++) {
    point(dots[i][0], dots[i][1]);
  }

  // draw arc
  stroke(3);
  stroke(color('yellow'));
  noFill();
  arc(0, 400, 800, 800, PI*3/4, 0);

  
  // calculate
  if(!fin) {
    printRet.hide();
    if(dots.length < N) {
      for(let i=0;i<N/24 && dots.length<N;i++) {
        let x = random(400);
        let y = random(400);

        dots.push([x, y]);
      }
    }
    else {
      cnt = 0;
      for(let i=0;i<dots.length;i++) {
        if(abs(dots[i][0]-0)**2 + abs(dots[i][1]-400)**2 <= 400**2) {
          cnt++;
        }
      }

      fin = 1;
    }
  }
  else {
    if(N == 0) {
      printRet.html("choose the number of points!!!");
    }
    else {
      let val = 4*cnt/N;
      printRet.html("pie : " + Math.round((val + Number.EPSILON)*1000)/1000);

      printRet.show();
    }
  }

  // current total number of dots
  printCnt.html("total count: " + dots.length);
}

function init() {
  if(this.value() != "select") {
    fin = 0;
    dots = [];

    N = parseInt(this.value());
  }
}