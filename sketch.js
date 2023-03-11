let torch;
let observer;
let maze;
let walls;

let sliderFOV;
let sliderRES;
let sliderBRI;

const tlim = 1000;
const renDist = 4;

let time = 0.;
let pause = false;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight-4);
}

function setup() {
	noCursor();
	createCanvas(windowWidth, windowHeight-4);

	observer = new Observer(0, 500);
	maze = new Grid(renDist);
	walls = maze.updateGrid(round(observer.pos.x), round(observer.pos.y));

	sliderFOV = createSlider(50, 150, observer.fov);
	sliderFOV.input(changeFOV);
	sliderFOV.hide();

	sliderRES = createSlider(1, 100_000, observer.res);
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
	background(1, 0, 50);

	time = time + .1;
	walls = maze.updateGrid(round(observer.pos.x), round(observer.pos.y));

	sliderRES.position(width / 2 - 75, height / 2);
	sliderFOV.position(width / 2 - 75, height / 2 - 30);
	sliderBRI.position(width / 2 - 75, height / 2 + 30);
	let bri = sliderBRI.value();

	if (abs(mouseX - width / 2) > width / 16) observer.rotate(mouseX - width / 2);

	if (keyIsDown(87)) {
		if (keyIsDown(32)) {
			observer.move(2);
			torch = new Torch(mouseX, 2 * height / 3 + 9 * sin(4 * time), time, tlim);
		} else {
			observer.move(1);
			torch = new Torch(mouseX, 2 * height / 3 + 9 * sin(2 * time), time, tlim);
		}
	} else torch = new Torch(mouseX, 2 * height / 3, time, tlim);

	const scene = observer.look(walls);
	let w = width / scene.length;

	push();
	for (let i=0; i<scene.length; i++) {
		bri +=  bri * noise(time) / 1000;
		let b = map(scene[i], 0, 7 * (bri / 100), bri, 0);
		const h = height / (2 * scene[i] * tan(radians(observer.fov) / 2));
		
		strokeWeight(1);
		if (time > tlim) {
			b = 0;
		}
		stroke(b + 2, 0, 10);
		fill(b + 2, 0, 10);
		rectMode(CENTER);
		rect(i * w + w / 2, height / 2, w, h);
	}
	pop();
	torch.show();
	console.log(frameRate());
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
