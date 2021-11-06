class Graphics1d {
  constructor(
    xmin = -10.0,
    xmax = 10.0,
    ymin = -10.0,
    ymax = 10.0,
    W = 120 * 4.2,
    H = 100 * 5,
    f = function(x) {
      return 10 * Math.sin(x * x);
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
    let count = 0;
    this.values = new Float64Array(this.W);
    this.dots = new Array(this.W);
    for (let i = this.xmin; i <= this.xmax; i += (-this.xmin + this.xmax) / this.W) {
      this.dots[count] = i;
      this.values[count++] = this.f(i);
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
    var graph = document.getElementById("mycanvas");
    graph.width = this.W;
    graph.height = this.H;
    var ctx = graph.getContext("2d");
    var drawed = new Graphics1d();
    if (this.ev == 0) this.evaluate();
      //     zero - это математически найденный центр; step - шаг по иксу и игрику
    let stepx = this.W / (-this.xmin + this.xmax),
      stepy = this.H / (-this.ymin + this.ymax),
      zerox = Math.abs(this.xmin) * stepx,
      zeroy = Math.abs(this.ymin) * stepy;
      //
    ctx.fillStyle = bg;  // серый
    ctx.fillRect(0, 0, graf.W, graf.H); //x - Координата начальной точки прямоугольника по оси x. y - Координата начальной точки прямоугольника по оси y. width - Ширина прямоугольника. height- Высота прямоугольника.
    
       //  координатная сетка
      
    ctx.beginPath(); 
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = axis; // зелененький
    ctx.moveTo(0, zeroy);
    ctx.lineTo(graf.W, zeroy);
    ctx.moveTo(zerox, 0);
    ctx.lineTo(zerox, graf.H);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = 0.3;
    ctx.strokeStyle = axis;
      
      // просто сетка
      
    for (let i = zerox; i < this.W; i += sqx * stepx) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.H);
      ctx.closePath();
      ctx.stroke();
    }
    for (let j = zeroy; j < this.H; j += sqy * stepy) {
      ctx.beginPath();
      ctx.lineTo(0, j);
      ctx.lineTo(this.W, j);
      ctx.closePath();
      ctx.stroke();
    }
    for (let i = zerox; i > 0; i -= sqx * stepx) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.H);
      ctx.closePath();
      ctx.stroke();
    }
    for (let j = zeroy; j > 0; j -= sqy * stepy) {
      ctx.beginPath();
      ctx.lineTo(0, j);
      ctx.lineTo(this.W, j);
      ctx.closePath();
      ctx.stroke();
    }
    //
    // наша функция
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = dots;
    ctx.moveTo(zerox + this.xmin * stepx, zeroy - this.f(this.xmin) * stepy); // нулевая точка + значение функции в минимальной точки функции * на шаг
    // точки приближенных нулей
      for (let i = 0; i <= this.H * this.W; i++) {
      if (this.dots[i] != this.xmin) {
        let cur = this.values[i];
        let prev = this.values[i - 1];
        if (cur * prev <= 0) {
          if (Math.abs(cur - prev) > this.ymax - this.ymin) {
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = gaps;
            ctx.arc(zerox + this.dots[i] * stepx, zeroy - stepy * this.ymax,stepx / 10, 0, 180);
            ctx.arc(zerox + this.dots[i] * stepx, zeroy - stepy * this.ymin, stepx / 10, 0, 180);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
          } 
          else {
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = zeros;
            ctx.arc(zerox + this.dots[i] * stepx, zeroy, stepx / 10, 0, 180);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(
              zerox + this.dots[i - 1] * stepx,
              zeroy - this.values[i - 1] * stepy
            );
            ctx.lineTo(
              zerox + this.dots[i] * stepx,
              zeroy - this.values[i] * stepy
            );
          }
        } 
        else
          ctx.lineTo(zerox + this.dots[i] * stepx, zeroy - this.values[i] * stepy);
      }
    }
  //
 // границы
    ctx.stroke();
    ctx.closePath();
    ctx.font = '20px serif';
    ctx.fillStyle = "black";
    ctx.fillText('(' + this.xmax + ", " + this.ymax + ')', zerox + this.xmax * stepx - 70, zeroy + this.ymin * stepy + 20);
    ctx.fillText('(' + this.xmin + ", "+ this.ymin + ')', zerox + this.xmin * stepx + 5, zeroy + this.ymax * stepy - 10);
    ctx.fillText('(' + this.xmax + ", "+ this.ymin + ')', zerox + this.xmax * stepx - 75, zeroy + this.ymax * stepy - 10);
    ctx.fillText('(' + this.xmin + ", "+ this.ymax + ')', zerox + this.xmin * stepx + 5, zeroy + this.ymin * stepy + 20);
  }
//
  autodraw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {
      let max, min;
      for(let i = 1; i < this.values.length(); i++){
        if(this.values[i - 1] > this.values){
          max = this.values[i - 1];
        }
      }
      console.log(max);
      for(let i = 1; i < this.values.length(); i++){
        if(this.values[i - 1] < this.values){
          min = this.values[i - 1];
        }
      }
      console.log(min);
    this.ymin = min;
    this.ymax = max;
    
    this.draw(dots, axis, zeros, gaps, bg);
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

var sqx = 1;
var sqy = 1;
    var graf = new Graphics1d();
    graf.draw();

function run(){
  var func = document.getElementById("func").value;
  func = rationing(func);
  var funct = function(x){
    return eval(func);
  };
  var graf = new Graphics1d(-10.0, 10.0, -10.0, 10.0, 120 * 4.2, 100 * 5, funct);
  graf.draw();
}
 
