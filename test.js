'use strict'

var test = require('tape')
var bench = require('./')
var proxyquire = require('proxyquire')
var chalk = require('chalk')

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

test('does two rounds', function (t) {
  t.plan(42 * 2 * 2)

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

  run(run)
})

test('supports an option object', function (t) {
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
  ], { iterations: 42 })

  run()
})

test('has color', function (t) {
  var chalkEnabled = chalk.enabled
  chalk.enabled = true

  var bench = proxyquire('./', {
    console: {
      time: function (key) {
        t.ok(chalk.hasColor(key), 'has color')
      },
      timeEnd: function (key) {
        t.ok(chalk.hasColor(key), 'has color')
      }
    }
  })

  t.plan(2)

  var run = bench([
    function first (done) {
      setImmediate(done)
    }
  ], { iterations: 42 })

  run(function () {
    chalk.enabled = chalkEnabled
  })
})

test('disable color', function (t) {
  var bench = proxyquire('./', {
    console: {
      time: function (key) {
        t.notOk(chalk.hasColor(key), 'has no color')
      },
      timeEnd: function (key) {
        t.notOk(chalk.hasColor(key), 'has no color')
      }
    }
  })

  t.plan(2)

  var run = bench([
    function first (done) {
      setImmediate(done)
    }
  ], {
    iterations: 42,
    color: false
  })

  run()
})
