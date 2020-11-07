var makeWanderDancer = function(top, left) {
  var aNewDancer = new WanderDancer(top, left, 1000 / 60);

  aNewDancer.setTargetAngle();
  aNewDancer.startDancing();
  aNewDancer.setPosition(aNewDancer.top, aNewDancer.left);
  return aNewDancer;
};

//constuctor
var WanderDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);

  this.targetAngle = 0;
  this.currentAngle = Math.random() * 360;
  this.turnSpeed = (Math.random() * 2) + 3;
  this.speed = Math.random() * 5 + 3;
  this.topRange = $('body').height();
  this.leftRange = $('body').width();
};

//inheritance
WanderDancer.prototype = Object.create(Dancer.prototype);
WanderDancer.prototype.constructor = WanderDancer;


//methods
WanderDancer.prototype.step = function() {
  var nearTop = this.top < (this.topRange * .2);
  var nearBottom = this.top > (this.topRange * .8);
  var nearLeft = this.left < (this.leftRange * .1);
  var nearRight = this.left > (this.leftRange * .9);
  var minNewAngle = undefined;
  var maxNewAngle = undefined;

  if (nearTop) {
    minNewAngle = 89;
    maxNewAngle = 91;
  }
  if (nearBottom) {
    minNewAngle = 269;
    maxNewAngle = 271;
  }
  if (nearLeft) {
    minNewAngle = -1;
    maxNewAngle = 1;
  }
  if (nearRight) {
    minNewAngle = 179;
    maxNewAngle = 181;
  }
  if (nearTop || nearBottom || nearLeft || nearRight) {
    this.setTargetAngle(minNewAngle, maxNewAngle);
    this.turn();
    this.turn();
  }

  this.top = this.top + this.speed * Math.sin(this.currentAngle * Math.PI / 180);
  this.left = this.left + this.speed * Math.cos(this.currentAngle * Math.PI / 180);
  this.setPosition(this.top, this.left);
  this.teleport();
  this.turn();
};

WanderDancer.prototype.teleport = function() {
  if (this.top < -20) {
    this.top = $('body').height() + 10;
  }
  if (this.top > $('body').height() + 20) {
    this.top = -10;
  }
  if (this.left < -20) {
    this.left = $('body').width() + 10;
  }
  if (this.left > $('body').width() + 20) {
    this.left = - 10;
  }
};

WanderDancer.prototype.setTargetAngle = function(min, max) {
  if (min === undefined && max === undefined) {
    this.targetAngle = Math.random() * 360;
    return;
  }

  this.targetAngle = min + Math.random() * (max - min);
  if (this.targetAngle < 0) {
    this.targetAngle += 360;
  }
  if (this.targetAngle > 360) {
    this.targetAngle -= 360;
  }
};

WanderDancer.prototype.turn = function() {
  if (Math.abs(this.currentAngle - this.targetAngle) < this.turnSpeed * 1.1) {
    //this.setTargetAngle(this.currentAngle - 30, this.currentAngle + 30);
    this.setTargetAngle();
  }

  if (Math.abs(this.currentAngle - this.targetAngle) < Math.abs(this.currentAngle - this.targetAngle + 360)) {

    if (this.currentAngle < this.targetAngle) {
      this.currentAngle += this.turnSpeed;

    } else {
      this.currentAngle -= this.turnSpeed;
    }

  } else {
    if (this.currentAngle < this.targetAngle) {
      this.currentAngle -= this.turnSpeed;

    } else {
      this.currentAngle += this.turnSpeed;
    }
  }

  if (this.currentAngle > 360) {
    this.currentAngle -= 360;
  }

  if (this.currentAngle < 0) {
    this.currentAngle += 360;
  }
};