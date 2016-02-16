var container, canvas, canvasContext;
var img;
var circle;
var piskel;
var x = y = 0;
var moveSpeed = 10;

const FPS = 30;

function draw() {
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	canvasContext.drawImage(img, x, y);
}

function init() {
	setupCanvas();
	loadAssets();
	registerEvents();

	return setInterval(draw, 1000/FPS);
}

function loadAssets() {
	img = new Image();
	img.addEventListener("load", function() {
		canvasContext.drawImage(this, x, y);
	}, false);
	img.src = "./assets/piskel.png";
}

function moveAsset(event) {
	// 38, 39, 40, 37
	switch(event.keyCode) {
		case 38:
			y -= moveSpeed;
			break;
		case 39:
			x += moveSpeed;
			break;
		case 40:
			y += moveSpeed;
			break;
		case 37:
			x -= moveSpeed;
			break;
	}
}

function registerEvents() {
	window.addEventListener("keydown", moveAsset, true);
	window.addEventListener("resize", resizeGame, false);
	window.addEventListener("orientationchange", resizeGame, false);
}

function resizeGame() {
	var widthtoHeight = 4/3;
	var newWidth = window.innerWidth;
	var newHeight = window.innerHeight;
	var newWidthToHeight  = newWidth/newHeight;

	// aspect ratio stuff
	if (newWidthToHeight > widthtoHeight) {
		newWidth = newHeight * widthtoHeight;
		container.style.height = newHeight + 'px';
		container.style.width = newWidth + 'px';
	} else {
		newHeight = newWidth * widthtoHeight;
		container.style.width = newWidth + 'px';
		container.style.height = newHeight + 'px';
	}

	// resizing
	canvas.width = newWidth;
	canvas.height = newHeight;
	console.log("game resized: ", canvas.width, canvas.height)
}

function setupCanvas() {
	container = document.getElementById("game-container");
	canvas = document.getElementById("game-canvas");
	canvas.width = 400;
	canvas.height = 300;
	canvasContext = canvas.getContext("2d");
}
