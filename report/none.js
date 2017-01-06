var util = require('util')
var Report = require('../report')

function NoneReporter (opts) {
  Report.call(this, opts)
}
util.inherits(NoneReporter, Report)

NoneReporter.prototype.write = function () {}

NoneReporter.prototype.summary = function () {}

module.exports = NoneReporter
