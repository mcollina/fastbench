var util = require('util')
var Report = require('../report')

function JSONReporter (opts) {
  Report.call(this, opts)
}
util.inherits(JSONReporter, Report)

JSONReporter.prototype.write = function () {}

JSONReporter.prototype.summary = function () {
  console.log(JSON.stringify(this.results, null, 2))
}

module.exports = JSONReporter
