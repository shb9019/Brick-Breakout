var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw,10);

var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var ballColor = "#0095DD"
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX =(canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(var l=0;l<brickColumnCount;l++){
	bricks[l] = [];
	for(var k=0;k<brickRowCount;k++){
		bricks[l][k] = {x:0,y:0,status:1};
	}
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	collisionDetection();
	drawBall();
	drawPaddle();
	drawBricks();
	x+=dx;
	y+=dy;
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,2*Math.PI,false);
	ctx.fillStyle = ballColor;
	ctx.fill();
	ctx.closePath();

	if(x+dx>canvas.width-ballRadius||x+dx<ballRadius){
		dx = -dx;
		ballColor = getRandomColor();
	}
	if(y+dy<ballRadius){
		dy = -dy;
		ballColor = getRandomColor();
	}
	else if(y+dy>canvas.height){
		if((x+ballRadius>(paddleX))&&(x<paddleX+paddleWidth+ballRadius)){
			dy = -dy;
		}
		else{
		alert("GAME OVER");
		document.location.reload();
		}
	}

}

function getRandomColor(){
	var letters = "0123456789ABCDEF";
	var color = "#"
	for(var i=0;i<6;i++){
		color+=letters[Math.floor(Math.random()*16)];
	}
	return color;
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();

	if(rightPressed&&paddleX+paddleWidth<canvas.width){
		paddleX += 7;
	}
	if(leftPressed&&paddleX>0){
		paddleX -= 7;
	}
}

function keyDownHandler(e){
	if(e.keyCode==39){
		rightPressed = true;
	}
	if(e.keyCode==37){
		leftPressed = true;
	}
}

function keyUpHandler(e){
	if(e.keyCode==39){
		rightPressed = false;
	}
	if(e.keyCode==37){
		leftPressed = false;
	}
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
        	if(bricks[c][r].status==1){
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        	}
        }
    }
}

function collisionDetection(){
	for(var c=0;c<brickColumnCount;c++){
		for(var r=0;r<brickRowCount;r++){
			var b =bricks[c][r];
			if(b.status==1){
			if(x>b.x&&x<b.x+brickWidth&&y>b.y&&y<b.y+brickHeight){
				dy = -dy;
				b.status = 0;
			}
		}
		}
	}
}