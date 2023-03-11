class Boundary {
    constructor(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }
}

class Grid {
    constructor(r) {
        this.r = round(r);
        this.grid = [];
        for (let j=0; j<1000 * this.r; j++) {
            this.grid[j] = [];
        }
    }

    collapseTile(x, y) {
        let edges = [];
        if (this.grid[y][x+1]) {
            edges[0] = this.grid[y][x+1][2];
        } else edges[0] = round(random());
        if (this.grid[y+1][x]) {
            edges[1] = this.grid[y+1][x][3];
        } else edges[1] = round(random());
        if (this.grid[y][x-1]) {
            edges[2] = this.grid[y][x-1][0];
        } else edges[2] = round(random());
        if (this.grid[y-1][x]) {
            edges[3] = this.grid[y-1][x][1];
        } else edges[3] = round(random());
        return edges;
    }

    makeFence(x, y) {
        let fences = [];
        if (this.grid[y][x][0] == 0) {
            fences[0] = new Boundary(x + .25, y - .25, x + .5, y - .25);
            fences[1] = new Boundary(x + .25, y + .25, x + .5, y + .25);
        } else {
            fences[0] = new Boundary(x + .25, y - .5, x + .25, y);
            fences[1] = new Boundary(x + .25, y, x + .25, y + .5);
        }
        if (this.grid[y][x][1] == 0) {
            fences[2] = new Boundary(x + .25, y + .25, x + .25, y + .5);
            fences[3] = new Boundary(x - .25, y + .25, x - .25, y + .5);
        } else {
            fences[2] = new Boundary(x, y + .25, x + .5, y + .25);
            fences[3] = new Boundary(x - .5, y + .25, x, y + .25);
        }
        if (this.grid[y][x][2] == 0) {
            fences[4] = new Boundary(x - .25, y - .25, x - .5, y - .25);
            fences[5] = new Boundary(x - .25, y + .25, x - .5, y + .25);
        } else {
            fences[4] = new Boundary(x - .25, y - .5, x - .25, y);
            fences[5] = new Boundary(x - .25, y, x - .25, y + .5);
        }
        if (this.grid[y][x][3] == 0) {
            fences[6] = new Boundary(x + .25, y - .25, x + .25, y - .5);
            fences[7] = new Boundary(x - .25, y - .25, x - .25, y - .5);
        } else {
            fences[6] = new Boundary(x, y - .25, x + .5, y - .25);
            fences[7] = new Boundary(x - .5, y - .25, x, y - .25);
        }
        return fences;
    }

    updateGrid(x, y) {
        let wall = [];
        for (let j = y - this.r; j <= y + this.r; j++) {
            for (let i = x - this.r; i <= x + this.r; i++) {
                if (!this.grid[j][i]) this.grid[j][i] = this.collapseTile(i, j);
                else {
                    if (abs(y-j) > this.r || abs(x-i) > this.r) this.grid[j].splice(i, 1);
                    else wall = wall.concat(this.makeFence(i, j));
                    }
                }
        }
        return wall;
    }
}