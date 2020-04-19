class Rect
{
    constructor(sqr)
    {
        sqr.free = false;
        this.squares = [sqr];
        this.width = 5;
        this.height = 5;
        this.x;
        this.y;
        this.curX;
        this.curY;
        this.ang;
        this.toCenter;
        this.flying = 0;
        this.cycle = 0;
        this.rot;
        this.curRot;
    }

    expand()
    {
        switch(Math.floor(Math.random()*4))
        {
            case 0:
                var minY = Math.min(...(this.squares.map(sqr=>sqr.y)));
                var topSquares = this.squares.filter(sqr => sqr.y == minY);
                var expand = true;
                topSquares.forEach(sqr => 
                {
                    if(squares[sqr.i-area/squareSize])
                        expand &= squares[sqr.i-area/squareSize].free;
                    else expand = false;
                });
                if(expand)
                {
                    topSquares.forEach(sqr => 
                    {   
                        this.squares.push(squares[sqr.i-area/squareSize]);
                        squares[sqr.i-area/squareSize].free = false;
                        free.splice(free.indexOf(sqr.i-area/squareSize),1,);
                    });
                    this.height+=squareSize;
                }
                break;

            case 1:
                var maxX = Math.max(...(this.squares.map(sqr=>sqr.x)));
                var rightSquares = this.squares.filter(sqr => sqr.x == maxX);
                var expand = true;
                rightSquares.forEach(sqr => 
                {
                    if(squares[sqr.i+1] && (sqr.i+1)%(area/squareSize) != 0)
                        expand &= squares[sqr.i+1].free;
                    else expand = false;
                });
                if(expand)
                {
                    rightSquares.forEach(sqr => 
                    {    
                        this.squares.push(squares[sqr.i+1]);
                        squares[sqr.i+1].free = false;
                        free.splice(free.indexOf(sqr.i+1),1,);
                    });
                    this.width+=squareSize;
                }
                break;

            case 2:
                var maxY = Math.max(...(this.squares.map(sqr=>sqr.y)));
                var bottomSquares = this.squares.filter(sqr => sqr.y == maxY);
                var expand = true;
                bottomSquares.forEach(sqr => 
                {
                    if(squares[sqr.i+100])
                        expand &= squares[sqr.i+area/squareSize].free;
                    else expand = false;
                });
                if(expand)
                {
                    bottomSquares.forEach(sqr => 
                    {    
                        this.squares.push(squares[sqr.i+area/squareSize]);
                        squares[sqr.i+100].free = false;
                        free.splice(free.indexOf(sqr.i+area/squareSize),1,);
                        
                    });
                    this.height+=squareSize;
                }
            break;

            case 3:
                var minX = Math.min(...(this.squares.map(sqr=>sqr.x)));
                var leftSquares = this.squares.filter(sqr => sqr.x == minX);

                var maxY = Math.max(...(this.squares.map(sqr=>sqr.y)));
                var bottomSquares = this.squares.filter(sqr => sqr.y == maxY);
                var expand = true;
                leftSquares.forEach(sqr => 
                {
                    if(squares[sqr.i-1] && (sqr.i-1)%(area/squareSize) != area/squareSize-1)
                        expand &= squares[sqr.i-1].free;
                    else expand = false;
                });
                if(expand)
                {
                    leftSquares.forEach(sqr => 
                    {    
                        this.squares.push(squares[sqr.i-1]);
                        squares[sqr.i-1].free = false;
                        free.splice(free.indexOf(sqr.i-1),1,);
                        
                    });
                    this.width+=squareSize;
                }
                break;
        }
    }

    finalize()
    {
        var minY = Math.min(...(this.squares.map(sqr=>sqr.y)));
        var minX = Math.min(...(this.squares.map(sqr=>sqr.x)));

        this.x = minX+this.width/2
        this.y = minY+this.height/2
        this.ang = Math.atan2(this.x-innerWidth/2,this.y-innerHeight/2);
        this.toCenter = Math.sqrt((this.x-innerWidth/2)*(this.x-innerWidth/2)+(this.y-innerHeight/2)*(this.y-innerHeight/2));
    }

    update()
    {
        if(!this.flying)
        {
            if(Math.abs(this.y-wave)<10)
            {
                if(this.cycle == 0)
                {
                    this.flying = 1;
                    this.rot = Math.random()*200-100;
                }
                else this.flying = -1;
                
            }
        }
        else
        {
            this.cycle+=this.flying*4;
            if(this.cycle >= 180)
            {
                this.cycle = 180;
                this.flying = 0;
            }
            if(this.cycle <= 0)
            {
                this.cycle = 0;
                this.flying = 0;
            }
        }
        this.curX = this.x + Math.sin(this.ang)*this.toCenter/2 * (-Math.cos(this.cycle/180*Math.PI)+1);
        this.curY = this.y + Math.cos(this.ang)*this.toCenter/3 * (-Math.cos(this.cycle/180*Math.PI)+1);
        this.curRot = this.rot*(-Math.cos(this.cycle/180*Math.PI)+1);
    }

    draw()
    {
        c.fillStyle = "white";
        c.strokeStyle = "white";

        c.translate(this.curX,this.curY);
        c.rotate(this.curRot/180*Math.PI);
        c.strokeRect(-this.width/2,-this.height/2,this.width,this.height);
        c.rotate(-this.curRot/180*Math.PI);
        c.translate(-this.curX,-this.curY);
    }
}