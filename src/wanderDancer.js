var makeWanderDancer = function(top, left) {
  var aNewDancer = new WanderDancer(top, left, 33);

  aNewDancer.setTargetAngle();
  aNewDancer.startDancing();
  aNewDancer.setPosition(aNewDancer.top, aNewDancer.left);
  return aNewDancer;
};

//constuctor
var WanderDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);

  this.currentAngle = Math.random() * 360;
  this.turnSpeed = Math.random() * 20;
  this.speed = Math.random() * 5 + 10;
  this.topRange = $('body').height();
  this.leftRange = $('body').width();
};

//inheritance
WanderDancer.prototype = Object.create(Dancer.prototype);
WanderDancer.prototype.constructor = WanderDancer;


//methods
WanderDancer.prototype.step = function() {
  var nearTop = this.top < this.topRange * .2;
  var nearBottom = this.top > this.topRange * .8;
  var nearLeft = this.left < this.leftRange * .2;
  var nearRight = this.left > this.leftRange * .8;
  var minNewAngle = undefined;
  var maxNewAngle = undefined;

  if (nearTop) {
    minNewAngle = 0;
    maxNewAngle = 180;
  }
  if (nearBottom) {
    minNewAngle = 180;
    maxNewAngle = 360;
  }
  if (nearLeft) {
    if (nearTop) {
      minNewAngle = 0;
      maxNewAngle = 90;

    } else if (nearBottom) {
      minNewAngle = -90;
      maxNewAngle = 0;

    } else {
      minNewAngle = -90;
      maxNewAngle = 90;
    }
  }
  if (nearRight) {
    if (nearTop) {
      minNewAngle = 90;
      maxNewAngle = 180;

    } else if (nearBottom) {
      minNewAngle = 180;
      maxNewAngle = 270;

    } else {
      minNewAngle = 90;
      maxNewAngle = 270;
    }
  }
  if (nearTop || nearBottom || nearLeft || nearRight) {
    this.setTargetAngle(minNewAngle, maxNewAngle);
    this.turn();
  }
  // if (this.left > )
  // if (this.left < )

  this.top = this.top + this.speed * Math.sin(this.currentAngle * Math.PI / 180);
  this.left = this.left + this.speed * Math.cos(this.currentAngle * Math.PI / 180);
  this.setPosition(this.top, this.left);
  this.turn();
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
  if (Math.abs(this.currentAngle - this.targetAngle) < this.turnSpeed * 2) {
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