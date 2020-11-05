var makeBlinkyDancer = function(top, left, timeBetweenSteps) {
  var aNewDancer = new BlinkyDancer(top, left, timeBetweenSteps);
  return aNewDancer;
};

var BlinkyDancer = function(top, left, timeBetweenSteps) {
  var test = makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node = $('<span class="dancer"></span>');
};


BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;
BlinkyDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.toggle();
};