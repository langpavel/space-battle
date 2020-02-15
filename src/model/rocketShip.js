pl.use(['battle', 'battle.constants', 'util', 'global'], function(battle, constants, util, window, undefined) {

  function RocketShip() {
    battle.SpaceObject.call(this);
    // 0 - asteroid, 1 - bullet, 2 - ship
    this.typeId = 2;

    this.customData = {
      color: '#f70'
    };
  }
  util.inherits(RocketShip, battle.SpaceObject);


  RocketShip.prototype.getRadius = function() {
    return 15;
  };


  RocketShip.prototype.colide = function(o) {
    // next life etc...
    return true;
  }


  RocketShip.prototype.beforeMove = function(universe) {
    //this.da *= 0.97;
    if (this.customData['key40']) {
      // rotation brake
      this.da *= constants.rotationBrake;
    }
    if (this.customData['key37']) {
      // left
      this.da -= constants.rotationAccel;
      if (this.da < - constants.maxRotationSpeed)
        this.da = - constants.maxRotationSpeed;
    }
    if (this.customData['key39']) {
      // right
      this.da += constants.rotationAccel;
      if (this.da > constants.maxRotationSpeed)
        this.da = constants.maxRotationSpeed;
    }
    if (this.customData.accelerating = this.customData['key38']) {
      // up
      this.dx += Math.sin(this.a) * constants.acceleration;
      this.dy -= Math.cos(this.a) * constants.acceleration;
    }
    if (this.customData['key32']) {
      // shoot
      var bullet = universe.createBullet();
      bullet.dx = this.dx + Math.sin(this.a) * constants.bulletSpeed;
      bullet.dy = this.dy - Math.cos(this.a) * constants.bulletSpeed;
      bullet.x = this.x + Math.sin(this.a) * 22 + bullet.dx;
      bullet.y = this.y - Math.cos(this.a) * 22 + bullet.dy;
    }
  };


  RocketShip.prototype.render = function(universe, ctx, w, h) {
    var x, y, halfx = w / 2, halfy = h / 2;
    var color = this.customData.color;
    var scale = 1.5;

    x = universe.fitToBoundary(this.x - universe.centerObject.x + halfx, universe.boundX);
    y = universe.fitToBoundary(this.y - universe.centerObject.y + halfy, universe.boundY);

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(this.a % (2 * Math.PI));
    ctx.translate(-9, -14);

    if (this.customData.accelerating) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-570.22783, 445.73644);
      ctx.arc(9, 30, 5, 0, 2 * Math.PI, false);
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = '#f00';
      ctx.fill();
      ctx.restore();
    }

    ctx.save();
    ctx.translate(579.31235, -445.5346);
    // telo
    ctx.save();
    ctx.fillStyle = '#aaa';
    ctx.beginPath();
    ctx.moveTo(-570.22783, 445.73644);
    ctx.bezierCurveTo(-571.54867, 446.78768, -581.7011, 455.59842, -574.01086, 472.47103);
    ctx.lineTo(-566.34962, 472.47103);
    ctx.lineTo(-566.32152, 472.47103);
    ctx.bezierCurveTo(-558.63131, 455.5985, -568.78368, 446.78906, -570.10455, 445.73778);
    ctx.closePath();
    ctx.fill();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.restore();

    // hlavice
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(-575.34781, 452.66359);
    ctx.lineTo(-573.48448, 449.24027);
    ctx.lineTo(-570.88449, 446.29361);
    ctx.lineTo(-570.14783, 445.73029);
    ctx.lineTo(-567.37451, 448.63361);
    ctx.lineTo(-565.20785, 452.14360);
    ctx.lineTo(-565.03452, 452.88026);
    ctx.lineTo(-575.39114, 452.83696);
    ctx.fill();
    ctx.restore();

    // kridylko leve
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(-576.3878, 465.70686);
    ctx.bezierCurveTo(-576.3878, 465.70686, -580.98111, 465.64966, -578.20779, 477.32014);
    ctx.bezierCurveTo(-578.20779, 477.32014, -577.94779, 467.57552, -575.52114, 468.77689);
    ctx.fill();
    ctx.restore();

    // kridylko prave
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(-563.93126, 465.70686);
    ctx.bezierCurveTo(-563.93126, 465.70686, -559.33795, 465.64966, -562.11128, 477.32014);
    ctx.bezierCurveTo(-562.11128, 477.32014, -562.37127, 467.57552, -564.79793, 468.77689);
    ctx.fill();
    ctx.restore();

    // okynko
    ctx.save();
    ctx.transform(0.04289762, 0, 0, 0.04289762, -557.42623, 456.28086);
    ctx.beginPath();
    ctx.translate(-296.98485999999997, 70.49391295907495);
    ctx.arc(0, 0, 64, 0, 2 * Math.PI, 0);
    ctx.closePath();

    ctx.fillStyle = '#80e5ff';
    ctx.fill();
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#777';
    ctx.stroke();
    ctx.restore();

    // smerovka
    ctx.beginPath();
    ctx.moveTo(-570, 465.6202);
    ctx.lineTo(-570, 477.32014);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    ctx.restore();
    ctx.restore();
  };



  battle.RocketShip = RocketShip;

});
