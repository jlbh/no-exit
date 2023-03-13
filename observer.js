class Observer {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.dir = 0.;

        this.fov = 100;
        this.res = 10_000;

        this.crdx = sin(radians(this.fov) / 2);
        this.crdy = sqrt(1 - this.crdx * this.crdx);

        this.speed = .01;
        this.rays = [];
        for (let x =- this.crdx; x < this.crdx; x += this.fov / this.res) {
            const a = atan(x / this.crdy);
            this.rays.push(new Ray(this.pos, a));
        }
    }

    move(length) {
        if (length == 2) this.speed = 0.02;
        else this.speed = 0.01;
        const vel = p5.Vector.fromAngle(this.dir);
        vel.setMag(this.speed);
        this.pos.add(vel);
    }

    rotate(angle) {
        this.dir += .000066 * angle;
        let index = 0;
        for (let x =- this.crdx; x < this.crdx; x += this.fov / this.res) {
            const a = atan(x / this.crdy);
            this.rays[index].setAngle(a + this.dir);
            index++;
        }
    }

    updateFOV(fov) {
        this.fov = fov;
        this.crdx = sin(radians(this.fov) / 2);
        this.rays = [];
        for (let x = -this.crdx; x < this.crdx; x += this.fov / this.res) {
            const a = atan(x / this.crdy);
            this.rays.push(new Ray(this.pos, a + this.dir));
        }
    }

    updateRES(res) {
        this.res = res;
        this.rays = [];
        for (let x =- this.crdx; x < this.crdx; x += this.fov / this.res) {
            const a = atan(x / this.crdy);
            this.rays.push(new Ray(this.pos, a + this.dir));
        }
    }

    look(walls) {
        const scene = [];
        for (let i=0; i<this.rays.length; i++) {
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const a = ray.dir.heading() - this.dir;
                    const d = cos(a) * p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                    if (d < 0.05) {
                        const vel = p5.Vector.fromAngle(this.dir);
                        vel.setMag(-1 * this.speed);
                        this.pos.add(vel);
                    }
                }
            }
            scene[i] = record;
        }
        return scene;
    }
}
