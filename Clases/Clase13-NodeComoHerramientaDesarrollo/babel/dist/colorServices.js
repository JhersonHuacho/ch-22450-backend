"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColor = void 0;

function getRandomColor(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

var getColor = function getColor() {
  var r = getRandomColor(0, 250);
  var g = getRandomColor(0, 250);
  var b = getRandomColor(0, 250);
  return "RGB(".concat(r, ",").concat(g, ",").concat(b, ")");
};

exports.getColor = getColor;