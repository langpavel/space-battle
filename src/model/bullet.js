pl.use(['battle', 'battle.constants', 'util', 'global'], function(battle, constants, util, window, undefined) {

  function Bullet() {
    battle.SpaceObject.call(this);
    // 0 - asteroid, 1 - bullet, 2 - ship
    this.typeId = 1;

    // lifetime in millisecond
    this.lifetime = 150;

    this.customData = {};
  }
  util.inherits(Bullet, battle.SpaceObject);


  Bullet.prototype.render = function(universe, c, w, h) {
    var x, y, halfx = w / 2, halfy = h / 2;

    x = universe.fitToBoundary(this.x - universe.centerObject.x + halfx, universe.boundX);
    y = universe.fitToBoundary(this.y - universe.centerObject.y + halfy, universe.boundY);

    var color = this.lifetime;
    if (color > 8) color = 8;

    c.beginPath();
    c.arc(x, y, 3, 0, 2 * Math.PI, false);
    c.fillStyle = '#' + (color + 7).toString(16) + '00';
    c.fill();
  };


  Bullet.prototype.getRadius = function() {
    return 3;
  };


  Bullet.prototype.colide = function(o) {
    return true; //o.typeId !== 1;
  };


  battle.Bullet = Bullet;

});
