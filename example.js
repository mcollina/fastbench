'use strict'

var bench = require('./')

var run = bench([
  function benchSetTimeout (done) {
    setTimeout(done, 0)
  },
  function benchSetImmediate (done) {
    setImmediate(done)
  },
  function benchNextTick (done) {
    process.nextTick(done)
  }
], { iterations: 1000, reporter: 'text' })

run(run)
