var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext('2d');

var area = 500;
var squareSize = 5;
c.lineWidth = 1;

var wave = 0;
var sqrIndex = 0;
var squares = [];
for(let y = innerHeight/2-area/2;y<innerHeight/2+area/2;y+=squareSize)
  for(let x = innerWidth/2-area/2;x<innerWidth/2+area/2;x+=squareSize)
  {
    squares.push(new Square(sqrIndex,x,y));
    sqrIndex++;
  }
var free = [];
for(let i=0;i<area*area/squareSize/squareSize;i++)
{
  free.push(i);
}
var rects = [];    
while(free.length>0)
{
  for(let i=0;i<Math.ceil(free.length/1000);i++)
  {
    if(free.length>0)
    {
      let squareIndex = Math.floor(Math.random()*free.length);
      rects.push(new Rect(squares[free[squareIndex]]));
      free.splice(squareIndex,1,);
    }
  }
  if(free.length>0)
    rects.forEach(r=>{r.expand()});
}
rects.forEach(r=>{r.finalize()});

function animate()
{
  wave+=5;
  if(wave>innerHeight)wave = 0;
  c.fillStyle = "black";
  c.fillRect(0,0,innerWidth,innerHeight);
  rects.forEach(r=>{r.update()});
  rects.forEach(r=>{r.draw()});
  //rects[0].draw();
  window.requestAnimationFrame(animate);
}
animate();