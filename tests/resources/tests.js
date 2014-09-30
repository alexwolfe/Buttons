var log = [];
var testName;
var $dropdown;
var plugin;

QUnit.done(function (test_results) {
  var tests = [];
  for(var i = 0, len = log.length; i < len; i++) {
    var details = log[i];
    tests.push({
      name: details.name,
      result: details.result,
      expected: details.expected,
      actual: details.actual,
      source: details.source
    });
  }
  test_results.tests = tests;

  window.global_test_results = test_results;
});
QUnit.testStart(function(testDetails){
  QUnit.log(function(details){
    if (!details.result) {
      details.name = testDetails.name;
      log.push(details);
    }
  });
  $dropdown = $("#testmeout").menuButton();
  plugin = $dropdown.data().plugin_menuButton;
});

QUnit.testDone(function( details ) {
  $dropdown = null;
  plugin = null;
});

test("plugin defaults", function() {
  equal(plugin._name, "menuButton", "default plugin name");
  equal(plugin.options.propertyName, "value", "default property name");
  ok($(plugin.$element).hasClass('button-dropdown'), "has button-dropdown class");
});

test("shows", function() {
  var $dropdown = $("#testmeout").menuButton();
  plugin = $dropdown.data().plugin_menuButton;
  plugin.showMenu();
  equal($dropdown.data('dropdown'), "show", "gets shown");
});

test("hides", function() {
  var $dropdown = $("#testmeout").menuButton();
  plugin = $dropdown.data().plugin_menuButton;
  plugin.hideMenu();
  equal($dropdown.data('dropdown'), "hide", "gets hidden");
});

