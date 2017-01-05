var test = require('tape')
var chalk = require('chalk')
var proxyquire = require('proxyquire')

test('has color', function (t) {
  chalk.enabled = true

  var TextReporter = proxyquire('./text', {
    console: {
      log: function (text) {
        t.ok(chalk.hasColor(text), 'has color')
      }
    }
  })

  t.plan(1)

  var reporter = new TextReporter()
  reporter.write({
    index: 0,
    name: 'color-test',
    duration: 1000,
    iterations: 1
  })
})

test('disable color', function (t) {
  var TextReporter = proxyquire('./text', {
    console: {
      log: function (text) {
        t.notOk(chalk.hasColor(text), 'has no color')
      }
    }
  })

  t.plan(1)

  var reporter = new TextReporter({ color: false })
  reporter.write({
    index: 0,
    name: 'color-test',
    duration: 1000,
    iterations: 1
  })
})
