angular-fast-bind
=========

Karl Seamon's fast-bind directives (with some additions) - ported to Bower.

### Installation
`bower install angular-fast-bind`

### Injection
`var myApp = angular.module('myApp', ['angular-fast-bind']);`

### Usage
- Static Text
  - `<span bind-once="some.text"></span>`
- HTML
  - `<span bind-html-once="some.text.including.html"></span>`
- Attributes
  - `<span bind-attr-once="{attr1: attributes.one, attr2: attributes.two}"></span>`
- Notifier
  - `<span bind-notifier="myExpression" bind-notifier-name="event-name" bind-notifier-mode="shallow|deep|collection"></span>`
- Bind on Notify
  - `<span bind-on-notify="myExpression" bind-on-notify-name="event-name"></span>`
- Bind HTML on Notify
  - `<span bind-html-on-notify="myExpression.including.html" bind-on-notify-name="event-name"></span>`
- Bind Attr on Notify
  - `<span bind-attr-on-notify="{attr1: myExpression, attr2: myOtherExpression}" bind-on-notify-name="event-name"></span>`

### License
MIT
