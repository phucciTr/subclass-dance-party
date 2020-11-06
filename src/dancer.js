// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps) {
  aNewDancer = new Dancer;
  aNewDancer.startDancing();
  aNewDancer.setPosition(aNewDancer.top, aNewDancer.left);
  return aNewDancer;
};

var Dancer = function(top, left, timeBetweenSteps) {
  //properties
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;

  //display span
  this.$node = $('<span class="dancer"></span>');
};

//methods
Dancer.prototype.startDancing = function() {
  var _this = this;

  this.interval = setInterval(function() {
    _this.step();
  }, _this.timeBetweenSteps);
};
Dancer.prototype.step = function() { };
Dancer.prototype.setPosition = function(top, left) {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};