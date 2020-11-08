//Bouncy Dancer Make function
//Make Bouncy Dancer
//Bouncy Dancer start Dancing
//Bouncy Dancer Set Postion
//return aNewDancer

//BouncyDancer constructor
//start with...
//random horizontal speed
//random vertical speed
//radius

//BouncyDancer inheritance

//BouncyDancer Prototypes
//Methods
//Detect Bounce

//Bounce

//New Step function

//Values
//All Bouncy Dancers


var makeBouncyDancer = function(top, left) {
  var aNewDancer = new BouncyDancer(top, left, 1000 / 60);
  aNewDancer.startDancing();
  aNewDancer.setPosition(aNewDancer.top, aNewDancer.left);
  aNewDancer.allBouncyDancers.push(aNewDancer);
  return aNewDancer;
};

//constuctor
var BouncyDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.id = this.allBouncyDancers.length;
  this.radius = 25;

  this.topSpeed = ((Math.random() - .5) * 2) * 5;
  if (this.topSpeed > 0) {
    this.topSpeed + 3;
  } else {
    this.topSpeed - 3;
  }

  this.leftSpeed = ((Math.random() - .5) * 2) * 5;
  if (this.leftSpeed > 0) {
    this.leftSpeed + 3;
  } else {
    this.leftSpeed - 3;
  }

  this.topRange = $('body').height();
  this.leftRange = $('body').width();
  this.$node.addClass('bouncy');

  //edgecase
  if (this.top > this.topRange - this.radius * 2) {
    this.top -= this.radius * 2;
  }
  if (this.left > this.leftRange - this.radius * 2) {
    this.left -= this.radius * 2;
  }
};

//inheritance
BouncyDancer.prototype = Object.create(Dancer.prototype);
BouncyDancer.prototype.constructor = BouncyDancer;

// methods
BouncyDancer.prototype.bounce = function(bounceTop, bounceLeft) {
  if (bounceTop) {
    this.topSpeed *= -1;
  }

  if (bounceLeft) {
    this.leftSpeed *= -1;
  }

};

BouncyDancer.prototype.detectBounce = function() {
  if (this.top < 0 || this.top > this.topRange - this.radius * 2) {
    this.bounce(true, false);
    return;
  }
  if (this.left < 0 || this.left > this.leftRange - this.radius * 2) {
    this.bounce(false, true);
    return;
  }

  for (let i = 0; i < this.allBouncyDancers.length; i++) {
    let currentDancer = this.allBouncyDancers[i];
    if (currentDancer.id === this.id) { continue; }

    let collision = (Math.abs(this.top - currentDancer.top) < currentDancer.radius * 2) && (Math.abs(this.left - currentDancer.left) < currentDancer.radius * 2);

    if (collision) {
      if (Math.abs(this.top - currentDancer.top) < Math.abs(this.left - currentDancer.left)) {
        this.bounce(true, false);
      } else {
        this.bounce(false, true);
      }
      return;
    }
  }
};
BouncyDancer.prototype.move = function() {
  this.top += this.topSpeed;
  this.left += this.leftSpeed;
};
BouncyDancer.prototype.step = function() {
  this.move();
  this.setPosition(this.top, this.left);
  this.detectBounce();
};

//values
BouncyDancer.prototype.allBouncyDancers = [];
