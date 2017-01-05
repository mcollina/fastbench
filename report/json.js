var util = require('util')
var Report = require('../report')

function JSONReporter (opts) {
  Report.call(this, opts)
}
util.inherits(JSONReporter, Report)

JSONReporter.prototype.write = function () {}

JSONReporter.prototype.summary = function (results) {
  console.log(JSON.stringify(results, null, 2))
}

module.exports = JSONReporter
