// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps) {
  aNewDancer = new Dancer(top, left, timeBetweenSteps);
  aNewDancer.startDancing();
  aNewDancer.setPosition(aNewDancer.top, aNewDancer.left);
  return aNewDancer;
};

var Dancer = function(top, left, timeBetweenSteps) {
  //properties
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  this.dancing;


  //display span
  this.$node = $('<span class="dancer"></span>');

  this.$node.mouseenter(function() {

    $(this).addClass('hoveredDancer');

  }).mouseout(function() {
    console.log('mouseout');
    $(this).removeClass('hoveredDancer');
  });
};

//methods
Dancer.prototype.startDancing = function() {
  var _this = this;

  this.interval = setInterval(function() {
    _this.step();
  }, _this.timeBetweenSteps);
  this.dancing = true;
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
Dancer.prototype.lineUp = function(index, length) {
  if (!window.dancing) {

    let maxWidth = $('body').width();
    this.left = maxWidth / (length + 1) * (index + 1);
    this.top = 100;
    this.stopDancing();
    this.setPosition(this.top, this.left);

  } else {
    this.startDancing();
  }
};
Dancer.prototype.stopDancing = function() {
  clearInterval(this.interval);
  this.dancing = false;
};
