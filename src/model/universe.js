pl.use(['battle', 'battle.constants', 'global'], function(battle, constants, window, undefined) {

  function Universe() {
    // width and height of universe (pixels)
    this.boundX = 2048 * 2;
    this.boundY = 1536 * 3;
    this.maxSpeed = 5;

    this.objects = [];
    this.centerObject = this.createShip();
    var self = this;
    window.setInterval(function() {
      self.move();
    }, constants.modelUpdateInterval);
  }


  Universe.prototype.createAsteroid = function() {
    var o = new battle.Asteroid();
    o.x = Math.random() * this.boundX;
    o.y = Math.random() * this.boundY;
    o.dx = (Math.random() - 0.5) * 2 * this.maxSpeed;
    o.dy = (Math.random() - 0.5) * 2 * this.maxSpeed;
    o.mass = Math.random();
    o.mass = 5 + (o.mass * o.mass * constants.maxAsteroidMass);
    this.objects.push(o);
    return o;
  };


  Universe.prototype.createAsteroids = function(count) {
    count = count || 250;
    console.log('Creating ' + count + ' asteroids');
    var a;
    while (count--) {
      a = this.createAsteroid();
    }
  };


  Universe.prototype.createBullet = function() {
    var bullet = new battle.Bullet();
    this.objects.push(bullet);
    return bullet;
  };


  Universe.prototype.createShip = function() {
    var o = new battle.RocketShip(this);
    o.x = Math.random() * this.boundX;
    o.y = Math.random() * this.boundY;
    this.objects.push(o);
    return o;
  };


  Universe.prototype.fitToBoundary = function(val, boundary) {
    if (val > boundary)
      return this.fitToBoundary(val - boundary, boundary);
    else if (val < 0)
      return this.fitToBoundary(val + boundary, boundary);
    else
      return val;
  };


  Universe.prototype.gravity = function(a, b, possibleCollisions) {
    var halfX = this.boundX / 2;
    var halfY = this.boundY / 2;
    var x = this.fitToBoundary(a.x - b.x + halfX, this.boundX) - halfX;
    var y = this.fitToBoundary(a.y - b.y + halfY, this.boundY) - halfY;
    var shortening = a.getRadius() + b.getRadius();
    var squaredTiledDistance = x * x + y * y;
    var dx = (a.dx - b.dx);
    var dy = (a.dy - b.dy);

    if (squaredTiledDistance < (shortening * shortening) + (dx * dx) + (dy * dy) + 9) {
      possibleCollisions.push([a, b]);
    }

    var factor = constants.GravConst / squaredTiledDistance;

    a.dx -= factor * x * b.mass;
    a.dy -= factor * y * b.mass;

    b.dx += factor * x * a.mass;
    b.dy += factor * y * a.mass;
  };


  Universe.prototype.move = function() {
    var i, j, l, possibleCollisions = [];
    l = this.objects.length;
    for (i = 0; i < l; i++) {
      if (this.objects[i].lifetime !== -1) {
        if (this.objects[i].lifetime-- < 1) {
          this.objects[i] = null;
          continue;
        }
      }
      for (j = i + 1; j < l; j++) {
        this.gravity(this.objects[i], this.objects[j], possibleCollisions);
      }
    }

    for (i = 0; i < l; i++) {
      if (this.objects[i] === null)
        continue;

      this.objects[i].beforeMove(this);
      this.objects[i].x = this.fitToBoundary(this.objects[i].x + this.objects[i].dx, this.boundX);
      this.objects[i].y = this.fitToBoundary(this.objects[i].y + this.objects[i].dy, this.boundY);
      this.objects[i].a += this.objects[i].da;
    }

    this.resolveCollisions(possibleCollisions);

    this.objects = this.objects.filter(function(x) { return x !== null; });
  };


  Universe.prototype.resolveCollisions = function(possibleCollisions) {
    var i, a, b, l = possibleCollisions.length;
    var halfX = this.boundX / 2;
    var halfY = this.boundY / 2;
    var x, y, shortening, squaredTiledDistance;

    for (i = 0; i < l; i++) {
      a = possibleCollisions[i][0];
      b = possibleCollisions[i][1];

      x = this.fitToBoundary(a.x - b.x + halfX, this.boundX) - halfX;
      y = this.fitToBoundary(a.y - b.y + halfY, this.boundY) - halfY;

      shortening = a.getRadius() + b.getRadius();
      squaredTiledDistance = x * x + y * y;

      if (squaredTiledDistance <= (shortening * shortening)) {
        if (b.colide(a)) {
          this.objects[this.objects.indexOf(b)] = null;
          if (this.centerObject === b)
            this.centerObject = a;
        }
        if (a.colide(b)) {
          this.objects[this.objects.indexOf(a)] = null;
          if (this.centerObject === a)
            this.centerObject = b;
        }
      }
    }
  };


  battle.Universe = Universe;

});
