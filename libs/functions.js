var container, canvas, canvasContext;
var img, player;
var circle;
var piskel;
var x = y = 0;
var moveSpeed = 10;

const FPS = 30;

function draw() {
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	canvasContext.drawImage(player.asset, player.x, player.y);
}

function init() {
	setupCanvas();
	loadAssets();
	registerEvents();

	return setInterval(draw, 1000/FPS);
}

function loadAssets() {
	player = {
		x: 0,
		y: 0,
		width: 32,
		height: 32,
		asset: new Image(),
		draw: function () {
			this.asset.addEventListener("load", function() {
				canvasContext.drawImage(this.asset, x, y, width, height);
			}, false);
			this.asset.src = "./assets/piskel.png";
		}
	}

	player.draw();
}

function moveAsset(event) {
	// 38, 39, 40, 37
	switch(event.keyCode) {
		case 38:
			player.y -= moveSpeed;
			break;
		case 39:
			player.x += moveSpeed;
			break;
		case 40:
			player.y += moveSpeed;
			break;
		case 37:
			player.x -= moveSpeed;
			break;
	}

	// contain asset
	if (player.x <= 0) {
		player.x = 0;
	} else if (player.x >= canvas.width) {
		player.x = canvas.width - player.width;
	}

	if (player.y <= 0) {
		player.y = 0;
	} else if (player.y >= canvas.height) {
		player.y = canvas.height - player.height;
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
