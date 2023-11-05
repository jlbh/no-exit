let torch;
let observer;
let maze;
let walls;

let sliderFOV;
let sliderRES;
let sliderBRI;

const tlim = 500;
const renDist = 4;

let time = 0.;
let pause = false;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
	noCursor();
	createCanvas(windowWidth, windowHeight);

	observer = new Observer(100, 100);
	maze = new Grid(renDist);
	walls = maze.updateGrid(round(observer.pos.x), round(observer.pos.y));

	sliderFOV = createSlider(50, 150, observer.fov);
	sliderFOV.input(changeFOV);
	sliderFOV.hide();
let torch;
let observer;
let maze;
let walls;

let sliderFOV;
let sliderRES;
let sliderBRI;

const tlim = 500;
const renDist = 4;

let time = 0.;
let pause = false;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
	noCursor();
	createCanvas(windowWidth, windowHeight);

	observer = new Observer(100, 100);
	maze = new Grid(renDist);
	walls = maze.updateGrid(round(observer.pos.x), round(observer.pos.y));

	sliderFOV = createSlider(50, 150, observer.fov);
	sliderFOV.input(changeFOV);
	sliderFOV.hide();

	sliderRES = createSlider(1, 50_000, observer.res);
	sliderRES.input(changeRES);
	sliderRES.hide();

	sliderBRI = createSlider(30, 70, 50);
	sliderBRI.input(draw);
	sliderBRI.hide();
}

function changeFOV() {
	let fov = sliderFOV.value();
	observer.updateFOV(fov);
}

function changeRES() {
	let res = sliderRES.value();
	observer.updateRES(res);
}

function draw() {
	background(2, 0, 10);

	time = time + .05;
	walls = maze.updateGrid(round(observer.pos.x), round(observer.pos.y));
	torch = new Torch(mouseX, mouseY, time, tlim);

	sliderRES.position(width / 2 - 75, height / 2);
	sliderFOV.position(width / 2 - 75, height / 2 - 30);
	sliderBRI.position(width / 2 - 75, height / 2 + 30);
	let bri = sliderBRI.value();

	if (abs(mouseX - width / 2) > width / 12) observer.rotate(mouseX - width / 2);

	console.log(height / 2)
	console.log(mouseY / 2)

	if (mouseY < height / 2) {
		observer.move(4 * (0.5 - mouseY / height));
	}

	const scene = observer.look(walls);
	let w = width / scene.length;

	push();
	for (let i=0; i<scene.length; i++) {
		bri +=  bri * noise(time) / 1000;
		let b = map(scene[i], 0, 7 * (bri / 100), bri, 0);
		const h = height / (2 * scene[i] * tan(radians(observer.fov) / 2));
		
		if (time > tlim) {
			b = 0;
		}
		noStroke();
		fill(b + 5, 0, 20);
		rectMode(CENTER);
		rect(i * w + w / 2, height / 2, w + 1, h);
	}
	pop();
	torch.show();
}

function keyPressed() {
	if (key == 'p') {
		pause = !pause;
		if (pause) {
			noLoop();
			cursor();			
			sliderFOV.show();
			sliderRES.show();
			sliderBRI.show();
			return;
		}
		loop();
		noCursor();
		sliderFOV.hide();
		sliderRES.hide();
		sliderBRI.hide();
		return;
	}
}

function mousePressed() {
	if (pause) loop();
}

function mouseReleased() {
	if (pause) noLoop();
}
