(function () {
  'use strict';

  var module = angular.module('angular-fast-bind', []);

  /*
    * Binds to the expression once at startup,
    * Usage: <span bind-once="myExpression"></span>
  */

  module.directive('bindOnce', ['$parse', function ($parse) {
    return {
      compile: function (element, attributes) {
        var expr = $parse(attributes.bindOnce);
        return function link(scope, element) {
          element.text(expr(scope));
        };
      }
    };
  }]);

  /*
    * Binds to the expression once at startup - html safe,
    * Usage: <span bind-html-once="myExpression"></span>
  */

  module.directive('bindHtmlOnce', ['$parse', '$sanitize', function ($parse, $sanitize) {
    return {
      compile: function (element, attributes) {
        var expr = $parse(attributes.bindHtmlOnce);
        return function link(scope, element) {
          element.html($sanitize(expr(scope)));
        };
      }
    };
  }]);

  /*
    * Binds the attributes to the expression once at startup,
    * Usage: <span bind-attr-once="{attr1: myExpression, attr2: myOtherExpression}"></span>
  */

  module.directive('bindAttrOnce', ['$parse', function ($parse) {
    return {
      compile: function (element, attributes) {
        var expr = $parse(attributes.bindAttrOnce);
        return function link(scope, element, attrs) {
          var values = expr(scope);

          angular.forEach(values, function(value, key) {
            attrs.$set(key, value);
          });
        };
      }
    };
  }]);

  /*
    * Watches the specified expression, and sends a notification to its child scopes
    * when it changes.  Used in conjunction with bind-on-notify directives, it allows
    * for bindings that update only when the watcher on this element fires.
    * Usage: <span bind-notifier="myExpression"
    *              bind-notifier-name="event-name"
    *              bind-notifier-mode="shallow|deep|collection"></span>
  */

  module.directive('bindNotifier', ['$parse', function ($parse) {
    var Mode = {
      SHALLOW: 'shallow',
      DEEP: 'deep',
      COLLECTION: 'collection'
    };

    var DEFAULT_EVENT_NAME = 'bind-notify',
        DEFAULT_MODE = Mode.SHALLOW;

    return {
      scope: true,
      compile: function (element, attributes) {
        var expr = $parse(attributes.bindNotifier),
            name = attributes.bindNotifierName || DEFAULT_EVENT_NAME,
            mode = attributes.bindNotifierMode || DEFAULT_MODE;

        return function link(scope, element) {
          var handler = function (newValue, oldValue, scope) {
            scope.$broadcast(name, newValue, oldValue);
          };

          switch (mode) {
            case Mode.SHALLOW:
            case Mode.DEEP:
              scope.$watch(expr, handler, mode === Mode.DEEP);
              break;
            case Mode.COLLECTION:
              scope.$watchCollection(expr, handler);
              break;
            default:
              throw Error('bind-notifier: Invalid mode "' + mode + '"');
          }
        };
      }
    };
  }]);

  /*
    * Binds to the expression, dirty-checking and updating only when notified on the specified event-name,
    * Usage: <span bind-on-notify="myExpression"
    *              bind-on-notify-name="event-name"</span>
  */


  module.directive('bindOnNotify', ['$parse', function ($parse) {
    var DEFAULT_EVENT_NAME = 'bind-notify';

    return {
      compile: function (element, attributes) {
        var expr = $parse(attributes.bindOnNotify),
            name = attributes.bindOnNotifyName || DEFAULT_EVENT_NAME;

        return function link(scope, element) {
          var lastValue;
          scope.$on(name, function () {
            var value = expr(scope);

            if (value !== lastValue) {
              element.text(value);
            }
            lastValue = value;
          });
        };
      }
    };
  }]);

  /*
    * Binds to the expression - html safe, dirty-checking and updating only when notified on the specified event-name,
    * Usage: <span bind-html-on-notify="myExpression"
    *              bind-html-on-notify-name="event-name"</span>
  */

  module.directive('bindHtmlOnNotify', ['$parse', '$sanitize', function ($parse, $sanitize) {
    var DEFAULT_EVENT_NAME = 'bind-notify';

    return {
      compile: function (element, attributes) {
        var expr = $parse(attributes.bindHtmlOnNotify),
            name = attributes.bindOnNotifyName || DEFAULT_EVENT_NAME;

        return function link(scope, element, attrs) {
          var lastValue;
          scope.$on(name, function () {
            var value = expr(scope);

            if (value !== lastValue) {
              element.html($sanitize(value));
            }
            lastValue = value;
          });
        }
      }
    }
  }]);

  /*
    * Binds the attributes to the object values, dirty-checking and updating only
    *     when notified on the specified event-name,
    * Usage: <span bind-attr-on-notify="{attr1: myExpression, attr2: myOtherExpression}"
    *              bind-on-notify-name="event-name"</span>
  */


  module.directive('bindAttrOnNotify', ['$parse', function ($parse) {
    var DEFAULT_EVENT_NAME = 'bind-notify';

    return {
      compile: function (element, attributes) {
        var expr = $parse(attributes.bindAttrOnNotify),
            name = attributes.fastBindOnNotifyName || DEFAULT_EVENT_NAME;

        return function link(scope, element, attrs) {
          var lastValues = {};
          scope.$on(name, function () {
            var values = expr(scope);

            angular.forEach(values, function (value, key) {

              if (value !== lastValues[key]) {
                attrs.$set(key, value);
              }
              lastValues[key] = value;
            })
          });
        };
      }
    };
  }]);

}());
