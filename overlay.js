class Torch {
	constructor(x, y, time, tlim) {
        this.x = x;
		this.y = y;
		this.t = (116 / tlim) * time;

		this.mag = 5;
		this.noise = noise(time);
    }

    show() {
		translate(this.x, this.y);
		scale(width / 1920);
		if (this.t < 116) {
			noStroke();

			fill(255, 200, 150, 3);
			ellipse(0, 40 + this.t, 20 * (7 + this.noise));
			fill(255, 200, 150, 5);
			ellipse(0, 40 + this.t, 25 * (7 + this.noise));
			fill(255, 200, 150, 10);
			ellipse(0, 40 + this.t, 30 * (7 + this.noise));

			fill(255, 80 + 10 * this.noise, 60 + 50 * this.noise, 100);
			beginShape();
			vertex(-20, 15 + 2 * this.mag * this.noise + this.t);
			vertex(-12 - this.mag * this.noise, 20 + 2 * this.mag * this.noise + this.t);
			vertex(0, 2 * this.mag * this.noise + this.t);
			vertex(12 + this.mag * this.noise, 20 + 2 * this.mag * this.noise + this.t);
			vertex(20, 15 + 2 * this.mag * this.noise + this.t);
			bezierVertex(60, 100 + this.t, -60, 100 + this.t, -20, 15 + 2 * this.mag * this.noise + this.t);
			endShape(CLOSE);

			fill(255, 255, 100 + 100 * this.noise,  50);
			beginShape();
			vertex(-10, 37.5 + 2 * this.mag * this.noise + this.t);
			vertex(-6 - .5 * this.mag * this.noise, 40 + 2 * this.mag * this.noise + this.t);
			vertex(0, 30 + 2 * this.mag * this.noise + this.t);
			vertex(6 + .5 * this.mag * this.noise, 40 + 2 * this.mag * this.noise + this.t);
			vertex(10, 37.5 + 2 * this.mag * this.noise + this.t)
			bezierVertex(30, 80 + this.t, -30, 80 + this.t, -10, 37.5 + 2 * this.mag * this.noise + this.t);
			endShape(CLOSE);

			strokeWeight(4);
			stroke(60 * this.noise, 20 * this.noise, 0);
			noFill();
			beginShape();
			vertex(0, 96 + this.t);
			bezierVertex(-1, 78 + this.t, 5, 59 + this.t, -1, 60 + this.t);
			endShape();

			strokeWeight(2);
			stroke(130 + 30 * this.noise);
			fill(130 + 30 * this.noise);

			beginShape();
			vertex(17, 94 + this.t);
			vertex(-17, 98 + this.t);
			vertex(-17, 225);
			vertex(17, 225);
			endShape(CLOSE);

			if (this.t < 50) {
				ellipse(-20, 160, 10);
				triangle(-22, 156, -17, 156, -17, 151);
			}
			if (this.t > 50 && this.t < 57) {
				ellipse(-20 + 0.8 * this.t - 40, 160, 10 - 0.5 * this.t + 25);
				triangle(-22 + this.t - 50, 156, -17, 156, -17, 151 + this.t - 50);
			}

			stroke(102 + 15 * this.noise, 64 + 15 * this.noise, 25 + 15 * this.noise);
			fill(102 + 15 * this.noise, 64 + 15 * this.noise, 25 + 15 * this.noise);

			beginShape();
			vertex(-30, 210);
			bezierVertex(-30, 230, 30, 230, 30, 210);
			endShape(CLOSE);

			beginShape();
			vertex(25, 215);
			vertex(-25, 215);
			vertex(-10, 245);
			vertex(10, 245);
			endShape(CLOSE);

			ellipse(0, 242, 38, 20);
			
			beginShape();
			vertex(-20, 265);
			vertex(20, 265);
			vertex(10, 235);
			vertex(-10, 235);
			endShape(CLOSE);

			beginShape();
			vertex(-65, 265);
			bezierVertex(-50, 285, 50, 285, 65, 265);
			endShape(CLOSE);

			strokeWeight(8);
			noFill();
			ellipse(76, 252, 40);
		} else {
			strokeWeight(4);
			stroke(40 * this.noise, 5 * this.noise, 0);
			noFill();
			beginShape();
			vertex(0, 96 + 116);
			bezierVertex(-1, 78 + 116, 5, 59 + 116, -1, 60 + 116);
			endShape();

			strokeWeight(2)
			stroke(5, 0, 20)
			fill(5, 0, 20);

			beginShape();
			vertex(-30, 210);
			bezierVertex(-30, 230, 30, 230, 30, 210);
			endShape(CLOSE);

			beginShape();
			vertex(25, 215);
			vertex(-25, 215);
			vertex(-10, 245);
			vertex(10, 245);
			endShape(CLOSE);

			ellipse(0, 242, 38, 20);
			
			beginShape();
			vertex(-20, 265);
			vertex(20, 265);
			vertex(10, 235);
			vertex(-10, 235);
			endShape(CLOSE);

			beginShape();
			vertex(-65, 265);
			bezierVertex(-50, 285, 50, 285, 65, 265);
			endShape(CLOSE);

			strokeWeight(8);
			noFill();
			ellipse(76, 252, 40);
		}
    }
}