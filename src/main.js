pl.use(['battle', 'global'], function(battle, window, undefined) {

  var requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
  })();


  function Game(document, canvas) {
    this.document = document;
    this.canvas = canvas;
    this.keyStates = [];
    this.init();
  };


  Game.prototype.init = function() {
    window.addEventListener('keydown', this.keyHandler.bind(this, true));
    window.addEventListener('keyup', this.keyHandler.bind(this, false));
    window.addEventListener('resize', this.resize.bind(this));
    this.canvas.style.backgroundImage = 'url("resources/layer0-tiles.png")';
    this.universe = new battle.Universe();
    this.resize();
    this.universe.createAsteroids();
    this.reqRedraw();
  };


  Game.prototype.keyHandler = function(newState, ev) {
    this.universe.centerObject.customData['key' + ev.keyCode] = newState;
  };


  Game.prototype.resize = function() {
    console.log('resize' + this.document.width + 'x' + this.document.height);
    this.width = this.canvas.width = this.document.width || window.innerWidth;
    this.height = this.canvas.height = this.document.height || window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.font = '14px monospace';
  };


  Game.prototype.reqRedraw = function(lastTS) {
    var self = this;
    requestAnimFrame(function(timestamp) {

      if (typeof timestamp !== 'number')
        timestamp = Date.now();

      if (typeof lastTS !== 'number')
        lastTS = timestamp;

      self.animate(timestamp, timestamp - lastTS);

      self.reqRedraw(timestamp);
    }, this.canvas);
  };


  Game.prototype.animate = function(ts, delta) {
    var c = this.ctx;
    var universe = this.universe;
    var self = this;

    if (delta > 100)
      console.log('long requestAnimationFrame delta: ' + delta);

    c.clearRect(0, 0, this.width, this.height);

    this.canvas.style.backgroundPositionX = -(universe.centerObject.x) + 'px';
    this.canvas.style.backgroundPositionY = -(universe.centerObject.y) + 'px';

    this.universe.objects.forEach(function(o) {
      o.render(universe, c, self.width, self.height);
    });

    // fps
    c.fillStyle = '#fff';
    c.fillText(Math.round(1000 / delta) + 'fps', 5, 12);
    c.fillText(this.universe.objects.length + ' objects', 5, 30);
  };

  battle.Game = Game;

});
