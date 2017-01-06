var util = require('util')
var Report = require('../report')

var console = require('console')
var chalk = require('chalk')
var colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray']

function TextReporter (opts) {
  opts = opts || {}
  Report.call(this, opts)

  this.color = opts.color
}
util.inherits(TextReporter, Report)

TextReporter.prototype.write = function (result) {
  var key = result.name + '*' + result.iterations

  // true by default
  if (this.color !== false) {
    key = chalk[this.nextColor(result.index)](key)
  }

  var duration = result.duration * 1e-6
  console.log(key + ': ' + Math.round(duration) + 'ms')
}

TextReporter.prototype.nextColor = function (index) {
  if (index === colors.length) {
    index = 0
  }
  return colors[index++]
}

TextReporter.prototype.summary = function () {}

module.exports = TextReporter
