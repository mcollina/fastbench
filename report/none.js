var util = require('util')
var Report = require('../report')

function NoneReport (opts) {
  Report.call(this, opts)
}
util.inherits(NoneReport, Report)

NoneReport.prototype.write = function () {}

NoneReport.prototype.summary = function () {}

module.exports = NoneReport
