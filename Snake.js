var c, ctx;
var speedx, speedy , headx , heady , tailx , taily , snakecolor , snakelen;
var directionArr , lenArr , pixeldata;
var applex , appley;
var lengthToArr , counterMove; //after each keypress
window.onload = function(){
    document.onkeydown = keypush;
    c = document.getElementById("gameCanvas");
    ctx = c.getContext("2d");
    snakeLen = 6;
    tailx = c.width/2;
    taily = c.height/2;
    headx = tailx +6*15;
    heady = taily;
    lenx = headx - tailx;
    leny = heady - taily;
    nextTx = tailx + 15;
    nextTy = taily;
    speedx = 1;
    speedy = 0;
/*array to store the changed direction and the length in each direction moved
for the black snake to delete from the tail*/
    directionArr = new Array();
    directionArr.push("right");
lenArr = new Array();
    lenArr.push(7);
    draw();
    drawapple();
   // move();
    setInterval(move , 100 );
    
}

function reset(){
    document.onkeydown = keypush;
c = document.getElementById("gameCanvas");
    ctx = c.getContext("2d");
    snakeLen = 6;
    tailx = c.width/2;
    taily = c.height/2;
    headx = tailx +6*15;
    heady = taily;
    lenx = headx - tailx;
    leny = heady - taily;
    nextTx = tailx + 15;
    nextTy = taily;
    speedx = 1;
    speedy = 0;
/*array to store the changed direction and the length in each direction moved
for the black snake to delete from the tail*/
    directionArr = new Array();
    directionArr.push("right");
    lenArr = new Array();
    lenArr.push(6);
    draw();
    drawapple();
}

function keypush(event){
    if(event.keyCode == 37){
        if(speedx == 0){
            speedx = -1;
            speedy = 0;
            directionArr.push("left");
            lenArr.push(0);
        }
    } else if(event.keyCode == 38){
        if(speedy == 0){
           speedy = -1;
           speedx = 0;
           directionArr.push("up");
            lenArr.push(0);
        }
    } else if(event.keyCode == 39){
        if(speedx == 0){
            speedx = 1;
            speedy = 0;
            directionArr.push("right");
            lenArr.push(0);
        }
    } else if(event.keyCode == 40){
        if(speedy == 0){
           speedy = 1;
           speedx = 0;
            directionArr.push("down");
            lenArr.push(0);
        }
    }
}

function changeTailDirection(){
    if(directionArr[0] == 'right'){
        tailx += 15;
    } else if (directionArr[0] == 'left'){
        tailx -= 15;
    } else if (directionArr[0] == 'up'){
        taily -= 15;
    } else if (directionArr[0] == 'down'){
        taily +=15
    }
}

function move(){
    if(lenArr.length != 1 && lenArr[0] != 0){
        lenArr[lenArr.length-1]++;
        lenArr[0]--;
    }
    drawTile(headx,heady, 'lime');
    headx += speedx*15;
    heady += speedy*15;
    pixeldata = ctx.getImageData(headx,heady,1,1).data;
    if((pixeldata[1] == 255 && pixeldata[0]!=255)
        || headx < 15 || headx >900-30 || heady >600-30 || heady < 15){
        reset();
    }
    drawTile(headx,heady, 'red');
    if(headx == applex*15 && heady == appley*15){
        drawapple();
        lenArr[0]++;
    }
    else{
        drawTile(tailx,taily,'black');
    if(directionArr[0] == 'right'){
        pixeldata = ctx.getImageData(tailx+15,taily,1,1).data;
        if(lenArr[0] !=0 ){
            tailx += 15;
        } else{
            lenArr.shift();
            directionArr.shift();
            changeTailDirection();
        }
     } else if(directionArr[0] == 'left' ){
        pixeldata = ctx.getImageData(tailx-15,taily,1,1).data;
        if(lenArr[0] !=0){
            tailx -= 15;
        } else{
            lenArr.shift();
            directionArr.shift();
            changeTailDirection();
        }
     } else if(directionArr[0] == 'up'){
        pixeldata = ctx.getImageData(tailx,taily-15,1,1).data;
        if(lenArr[0] !=0){
            taily -= 15;
        } else{
            lenArr.shift();
            directionArr.shift();
            changeTailDirection();
        }
     } else if(directionArr[0] == 'down'){
        pixeldata = ctx.getImageData(tailx,taily+15,1,1).data;
        if(lenArr[0] !=0){
            taily += 15;
        } else{
            counterMove = 0;
            lenArr.shift();
            directionArr.shift();
            changeTailDirection();
        }
     } 
    }
    
    
}

function drawapple(){
    applex = Math.floor(Math.random()*100) % 60;
    appley = Math.floor(Math.random()*100) % 40;
    pixeldata = ctx.getImageData(applex*15,appley*15,1,1).data;
    if(pixeldata[1] == 255 || pixeldata[2] == 255
      || applex <= 0 || applex >= 59 || appley >= 39 || appley <= 0
      ){
        drawapple();
    }
    else {
        drawTile(applex*15,appley*15,'yellow');
    }
}

function draw(){
//background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,900,600);
//border
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,15,600);
    ctx.fillRect(0,0,900,15);
    ctx.fillRect(885,0,15,600);
    ctx.fillRect(0,585,900,15);
//snake
    drawSnake(tailx,taily,headx,heady);
}

function drawTile(x,y,snakecolor){
    ctx.beginPath();
    ctx.fillStyle = snakecolor;
    ctx.fillRect(x,y,10,10);
}

function drawSnake(tx,ty,hx,hy){
    if(hy == ty){
        for(var i = 0; i <= Math.abs(hx-tx)/15 ; i++){ //10px for the tile and 5 space
            if(i == Math.abs(hx-tx)/15 ){
                drawTile(hx,hy,'red');
                break;
            }
            drawTile(tx + 15*i , ty , 'lime');
        }
    }
    else if(hx == tx){
        for(var i = 0; i <= Math.abs(hy-ty)/15 ; i++){ //10px for the tile and 5 space
            if(i == Math.abs(hy-ty)/15 ){
                drawTile(hx ,hy,'red');
                break;
            }
            drawTile(tx , ty + 15*i , 'lime');
        }
    }
    else{
         for(var i = 0; i <= Math.abs(hx-tx)/15 ; i++){ //draw along x
            if(hx>tx){
                 drawTile(tx + 15*i , ty , 'lime');
            } else{
                 drawTile(tx - 15*i , ty , 'lime');
            }
         }
         for(var i = 0; i <= Math.abs(hy-ty)/15 ; i++){ //draw along y
            if(hy>ty){
                if(i == Math.abs(hy-ty)/15 ){
                     drawTile(hx,hy,'red');
                     break;
                 }
                 drawTile(hx , ty + 15*i , 'lime');
            } else{
                if(i == Math.abs(hy-ty)/15 ){
                     drawTile(hx,hy,'red');
                     break;
                 }
                 drawTile(hx , ty - 15*i , 'lime');
            }
         }
    }
}