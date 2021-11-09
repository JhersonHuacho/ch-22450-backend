"use strict";

var _express = _interopRequireDefault(require("express"));

var _colorServices = require("./colorServices");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const express = require('express');
var app = (0, _express["default"])();

var suma = function suma(a, b) {
  return a + b;
};

console.log((0, _colorServices.getColor)());
app.get('/', function (req, res) {
  console.log('Hello world Dos');
});
console.log(suma(2, 6));
app.listen(8080, function () {
  console.log('Server OK');
});