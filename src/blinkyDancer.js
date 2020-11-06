var makeBlinkyDancer = function(top, left, timeBetweenSteps) {
  var aNewDancer = new BlinkyDancer(top, left, timeBetweenSteps);
  aNewDancer.startDancing();
  aNewDancer.setPosition(aNewDancer.top, aNewDancer.left);
  return aNewDancer;
};

//Constructor
var BlinkyDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
};

//inheritance
BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

//methods
BlinkyDancer.prototype.step = function() {
  this.$node.toggle();
}; 