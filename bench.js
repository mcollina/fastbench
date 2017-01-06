'use strict'

var fastseries = require('fastseries')

function build (functions, opts) {

  var max
  var series = fastseries()
  var results = []
  var reporter
  var currentIndex = 0

  if (typeof opts === 'object') {
    max = opts.max || opts.iterations
  } else {
    max = opts
    opts = { reporter: 'text' }
  }

  if (!max) {
    throw new Error('missing number of iterations')
  }

  try {
    var Reporter = require('./report/' + (opts.reporter || 'text'))
  } catch (ex) {
    if (ex.code === 'MODULE_NOT_FOUND') {
      throw new Error('No such reporter: ' + opts.reporter)
    }
    throw ex
  }
  reporter = new Reporter({ color: opts.color })

  return run

  function run (done) {
    currentIndex = 0
    series(null, bench, functions, function () {
      reporter.summary(results)
      done ? done(null, results) : noop()
    })
  }

  function bench (func, done) {
    var funcName = func.name
    var count = -1

    var start = process.hrtime()
    end()

    function end () {
      if (++count < max) {
        func(end)
      } else {
        var diff = process.hrtime(start)

        var result = {
          index: currentIndex,
          name: funcName,
          iterations: max,
          duration: diff[0] * 1e9 + diff[1] // nanoseconds
        }
        results[currentIndex] = result
        currentIndex++

        reporter.write(result)
        return done ? done(null, result) : result
      }
    }
  }
}

function noop () {}

module.exports = build
