'use strict'

var test = require('tape')
var bench = require('./')

test('calls multiple functions', function (t) {
  t.plan(42 * 2)

  var run = bench([
    function first (done) {
      t.pass('first called')
      setImmediate(done)
    },
    function second (done) {
      t.pass('second called')
      setImmediate(done)
    }
  ], 42)

  run()
})

test('supports a callback', function (t) {
  t.plan(1)

  var run = bench([
    function first (done) {
      setImmediate(done)
    }
  ], 42)

  run(t.pass.bind(t))
})
