pl.use(['battle', 'battle.constants', 'global'], function(battle, constants, window, undefined) {

  function SpaceObject() {
    // 0 - asteroid, 1 - bullet, 2 - ship
    this.typeId = 0;
    // center
    this.x = 0;
    this.y = 0;
    // current increment per milisecond
    this.dx = 0;
    this.dy = 0;
    // direction
    this.a = 0;
    // rotation moment (radians per millisecond)
    this.da = 0;

    // gravity
    this.mass = 0;
    // lifetime in millisecond
    this.lifetime = -1;

    //this.universe = universe;

    this.customData = {};
  }


  SpaceObject.prototype.render = function(universe, c, w, h) {
    var x, y, halfx = w / 2, halfy = h / 2;

    x = universe.fitToBoundary(this.x - universe.centerObject.x + halfx, universe.boundX);
    y = universe.fitToBoundary(this.y - universe.centerObject.y + halfy, universe.boundY);

    c.beginPath();
    c.arc(x, y, 3, 0, 2 * Math.PI, false);
    c.fillStyle = '#ff0';
    c.fill();
    c.lineWidth = 3;
    c.strokeStyle = '#cc0';
    c.stroke();
  };


  SpaceObject.prototype.beforeMove = Function.prototype;


  SpaceObject.prototype.getRadius = function() {
    return 3;
  };


  SpaceObject.prototype.colide = function(o) {
    return false;
  };


  battle.SpaceObject = SpaceObject;

});
