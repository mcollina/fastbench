'use strict'

function Reporter (opts) {
  this.options = opts
}

Reporter.prototype.write = function () {
  throw new Error('write: must be overwritten')
}

Reporter.prototype.summary = function () {
  throw new Error('summary: must be overwritten')
}

module.exports = Reporter
