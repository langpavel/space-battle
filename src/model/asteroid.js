pl.use(['battle', 'battle.constants', 'util', 'global'], function(battle, constants, util, window, undefined) {

  function Asteroid(universe) {
    battle.SpaceObject.call(this, universe);
    // 0 - asteroid, 1 - bullet, 2 - ship
    this.typeId = 0;

    this.customData = {};
  }
  util.inherits(Asteroid, battle.SpaceObject);


  Asteroid.prototype.render = function(universe, c, w, h) {
    var x, y, halfx = w / 2, halfy = h / 2;

    x = universe.fitToBoundary(this.x - universe.centerObject.x + halfx, universe.boundX);
    y = universe.fitToBoundary(this.y - universe.centerObject.y + halfy, universe.boundY);

    c.beginPath();
    c.arc(x, y, this.getRadius(), 0, 2 * Math.PI, false);
    c.fillStyle = '#fff';
    c.fill();
    c.lineWidth = 3;
    c.strokeStyle = '#ccc';
    c.stroke();
  };


  Asteroid.prototype.colide = function(o) {
    if (o.typeId === 0) {
      if (o.mass >= this.mass) {
        var m12 = this.mass + o.mass;

        o.x = (o.x * o.mass + this.x * this.mass) / m12;
        o.y = (o.y * o.mass + this.y * this.mass) / m12;
        o.dx = (o.dx * o.mass + this.dx * this.mass) / m12;
        o.dy = (o.dy * o.mass + this.dy * this.mass) / m12;
        o.mass = m12;

        this.mass = 0;

        return true;
      } else {
        return false;
      }
    } else if (o.typeId === 1) {
      if (this.mass < constants.shootStrenth)
        return true;

      this.mass -= constants.shootStrenth;
      return false;
    }
    return false;
  };


  Asteroid.prototype.getRadius = function() {
    return 5 + Math.pow(this.mass, 0.6);
  };


  battle.Asteroid = Asteroid;

});
