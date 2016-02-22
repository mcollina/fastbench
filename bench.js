'use strict'

var fastseries = require('fastseries')
var chalk = require('chalk')
var colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray']
var console = require('console')

function build (functions, opts) {

  var max
  var series = fastseries()
  var currentColor = 0

  if (typeof opts === 'object') {
    max = opts.max || opts.iterations
  } else {
    max = opts
  }

  if (!max) {
    throw new Error('missing number of iterations')
  }

  return run

  function run (done) {
    currentColor = 0
    series(null, bench, functions, done || noop)
  }

  function bench (func, done) {
    var key = func.name + '*' + max
    var count = -1

    // true by default
    if (opts.color !== false) {
      key = chalk[nextColor()](key)
    }

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

  function nextColor () {
    if (currentColor === colors.length) {
      currentColor = 0
    }
    return colors[currentColor++]
  }
}

function noop () {}

module.exports = build
