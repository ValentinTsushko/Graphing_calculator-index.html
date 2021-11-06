class Graphics2d {
  constructor(
    xmin = -10.0,
    xmax = 10.0,
    ymin = -10.0,
    ymax = 10.0,
    W = 512,
    H = 512,
    f = function(x, y) {
      return 10 * Math.sin(x * y);
    }
  ) {
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.W = W;
    this.H = H;
    this.f = f;
    this.ev = 0;
  }
  
  // реализация этого массива
  
  evaluate() {
    this.values = new Float64Array(this.H * this.W);
    this.dots = new Array(this.H * this.W);
    let count = 0;
    for (let i = this.xmin; i <= this.xmax; i += (-this.xmin + this.xmax) / this.W)
      for (let j = this.ymin; j <= this.ymax; j += (-this.ymin + this.ymax) / this.H) {
        this.dots[count] = [i, j];
        this.values[count++] = this.f(i, j);
      }
    this.ev = 1;
  }
  //
  draw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {
    var graph = document.getElementById("mycanvas2");
    graph.width = this.W;
    graph.height = this.H;
    var ctx = graph.getContext("2d");
    if (this.ev == 0) this.evaluate();
    //     zero - это математически найденный центр; step - шаг по иксу и игрику
    let stepx = this.W / (-this.xmin + this.xmax),
      stepy = this.H / (-this.ymin + this.ymax),
      zerox = -this.xmin * stepx,
      zeroy = this.ymax * stepy;
    //
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, graf.W, graf.H);
      
       //  координатная сетка
      
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = axis;
    ctx.moveTo(0, zeroy);
    ctx.lineTo(graf.W, zeroy);
    ctx.moveTo(zerox, 0);
    ctx.lineTo(zerox, graf.H);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = axis;
      
      // просто сетка
      
    for (let i = 0; i < this.W; i += sqx2 * stepx) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.H);
      ctx.closePath();
      ctx.stroke();
    }
    for (let j = 0; j < this.H; j += sqy2 * stepy) {
      ctx.beginPath();
      ctx.lineTo(0, j);
      ctx.lineTo(this.W, j);
      ctx.closePath();
      ctx.stroke();
    }
//
    ctx.lineWidth = 1;
    ctx.strokeStyle = dots;
    for (let i = 0; i < this.W * this.H; ++i) {
      ctx.beginPath();
      if (this.values[i] < 0) {
        ctx.fillStyle = "rgba(0, 0, 255, 0.1)";
      } 
      else if (this.values[i] > 0){
        ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
      }
      ctx.arc(zerox + this.dots[i][0] * stepx, zeroy - this.dots[i][1] * stepy, 1, 0, 360);
      ctx.fill();
      ctx.closePath();
    }
    ctx.stroke();
    ctx.closePath();
    ctx.font = '20px serif';
    ctx.fillStyle = "black";
    ctx.fillText('(' + this.xmax + ", " + this.ymax + ')', zerox + this.xmax * stepx - 70, zeroy + this.ymin * stepy + 20);
    ctx.fillText('(' + this.xmin + ", "+ this.ymin + ')', zerox + this.xmin * stepx + 5, zeroy + this.ymax * stepy - 10);
    ctx.fillText('(' + this.xmax + ", "+ this.ymin + ')', zerox + this.xmax * stepx - 75, zeroy + this.ymax * stepy - 10);
    ctx.fillText('(' + this.xmin + ", "+ this.ymax + ')', zerox + this.xmin * stepx + 5, zeroy + this.ymin * stepy + 20);
  }
}
function rationing(str) {
  str = str.split("cos").join("Math.cos");
  str = str.split("sin").join("Math.sin");
  str = str.split("tan").join("Math.tan");
  str = str.split("aMath.cos").join("Math.acos");
  str = str.split("aMath.sin").join("Math.asin");
  str = str.split("aMath.tan").join("Math.atan");
  str = str.split("pi").join("Math.PI");
  str = str.split("ln2").join("Math.LN2");
  str = str.split("ln10").join("Math.LN10");
  str = str.split("log2e").join("Math.LOG2E");
  str = str.split("log10e").join("Math.LOG10E");
  str = str.split("sqrt1_2").join("Math.SQRT1_2");
  str = str.split("sqrt2").join("Math.SQRT2");
  str = str.split("abs").join("Math.abs");
  str = str.split("ceil").join("Math.ceil");
  str = str.split("exp").join("Math.exp");
  str = str.split("floor").join("Math.floor");
  str = str.split("ln").join("Math.log");
  str = str.split("max").join("Math.max");
  str = str.split("min").join("Math.min");
  str = str.split("pow").join("Math.pow");
  str = str.split("round").join("Math.round");
  str = str.split("lg").join("logab");
  str = str.split("sqrt").join("Math.sqrt");
  str = str.split("e").join("Math.E");
  return str;
}
var sqx2 = 1,
  sqy2 = 1;
var graf = new Graphics2d();
graf.draw();
function run1() {
  var func = document.getElementById("funct").value;
  func = rationing(func);
  var funct = function(x, y) {
    return eval(func);
  };
  graf = new Graphics2d(-10.0, 10.0, -10.0, 10.0, 120 * 4.2, 100 * 5, funct);
  graf.draw();
}
function smesh(
funct = function(x, y) {
  return (Math.abs(x-y+5)+Math.abs(x+y-5)-10)*(x*x+(y-5)*(y-5)-9)*((y-10)*(y-x-15)*(y+x-15))*(((x+7)*(x+7))+((y+5.6)*(y+5.6)) - 3)*(((x+8)*(x+8))/0.8 + ((y+7.6)*(y+7.6))/0.2 - 1)*(((x+6)*(x+6))/0.8 + ((y+7.6)*(y+7.6))/0.2 - 1)*(((x+9.1)*(x+9.1))/0.2 + ((y+6.2)*(y+6.2))/0.6 - 1)*(((x+4.9)*(x+4.9))/0.2 + ((y+6.2)*(y+6.2))/0.6 - 1)*(((x+6)*(x+6))/0.2 + ((y+2.7)*(y+2.7))/2.3 - 1)*(((x+8)*(x+8))/0.2 + ((y+2.7)*(y+2.7))/2.3 - 1)*((x+7.8)*(x+7.8)+(y+5.4)*(y+5.4)-0.3)*((x+7.8)*(x+7.8)+(y+5.4)*(y+5.4)-0.1)*((x+6.3)*(x+6.3)+(y+5.4)*(y+5.4)-0.3)*((x+6.3)*(x+6.3)+(y+5.4)*(y+5.4)-0.1)*(((x+7)*(x+7))/5+((y+6.5)*(y+6.5))/0.2 - 0.1)*(((x-7)*(x-7))+((y+5.6)*(y+5.6)) - 3)*(((x-6.2)*(x-6.2))/0.6 + ((y+7.7)*(y+7.7))/0.1 - 1)*(((x-7.9)*(x-7.9))/0.6 + ((y+7.7)*(y+7.7))/0.1 - 1)*(((x-9)*(x-9))/0.1 + ((y+6)*(y+6))/0.3 - 1)*(((x-5)*(x-5))/0.1 + ((y+6)*(y+6))/0.3 - 1)*(((x-7)*(x-7))/2 + ((y+6.5)*(y+6.5))/0.1 - 0.1)*((x-7.6)*(x-7.6)+(y+5.4)*(y+5.4)-0.1)*((x-6.4)*(x-6.4)+(y+5.4)*(y+5.4)-0.1)*((x-7.6)*(x-7.6)+(y+5.4)*(y+5.4)-0.3)*((x-6.4)*(x-6.4)+(y+5.4)*(y+5.4)-0.3) * ((x-8)*(x-8) / 0.0025 + (y+3.7) * (y+3.7) / 0.2 - 1) * ((x-7.6) * (x-7.6) / 0.0025 + (y+3.5) * (y+3.5)/0.2 - 1) * ( (x-7.2) * (x-7.2)/0.0025 + (y+3.45) * (y+3.45)/0.2 - 1) * ((x-6.8)*(x-6.8)/0.0025+(y+3.45)*(y+3.45)/0.2 - 1) * ((x-6.4)*(x-6.4)/0.0025+(y+3.45)*(y+3.45)/0.2-1)*((x-6)*(x-6)/0.0025+(y+3.7)*(y+3.7)/0.2-1);
}
  ) {
  
  graf = new Graphics2d(-15.0, 15.0, -15.0, 15.0, 120 * 4.2, 100 * 5, funct);
  graf.draw();
}
