var util = require('util')
var Report = require('../report')

function JSONReport (opts) {
  Report.call(this, opts)
}
util.inherits(JSONReport, Report)

JSONReport.prototype.write = function () {}

JSONReport.prototype.summary = function () {
  console.log(JSON.stringify(this.results, null, 2))
}

module.exports = JSONReport
