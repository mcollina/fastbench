'use strict'

var fastseries = require('fastseries')

function build (functions, max) {

  var series = fastseries()

  return run

  function run (done) {
    series(null, bench, functions, done || noop)
  }

  function bench (func, done) {
    var key = func.name + '*' + max
    var count = -1

    console.time(key)
    end()

    function end () {
      if (++count < max) {
        func(end)
      } else {
        console.timeEnd(key)
        if (done) {
          done()
        }
      }
    }
  }
}

function noop () {}

module.exports = build
