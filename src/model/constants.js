pl.use(['battle.constants'], function() {

  this.modelUpdateInterval = 10;
  this.GravConst = 0.0025 * this.modelUpdateInterval;
  this.acceleration = 0.03 * this.modelUpdateInterval;
  this.rotationAccel = 0.001 * this.modelUpdateInterval;
  this.rotationBrake = Math.pow(0.97, this.modelUpdateInterval);

  this.shootStrenth = 5;
  this.bulletSpeed = 1 * this.modelUpdateInterval;
  this.maxRotationSpeed = Math.PI / 100 * this.modelUpdateInterval;

  this.maxAsteroidMass = 10;
});
