'use strict'

function Report (results, opts) {
  this.results = results
  this.options = opts
}

Report.prototype.write = function () {
  throw new Error('write: must be overwritten')
}

Report.prototype.summary = function () {
  throw new Error('summary: must be overwritten')
}

Report.prototype.NsPerOp = function () {
  return this.duration / this.iterations
}

Report.prototype.allocedBytesPerOp = function () {
  return this.bytesAllocated / this.iterations
}

Report.prototype.create = function (results) {
  return new Report(results)
}

module.exports = Report
