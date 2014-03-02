angular-fast-bind
=========

Karl Seamon's fast-bind directives converted to a Bower Component.

### Installation
`bower install angular-fast-bind`

### Injection
`var myApp = angular.module('myApp', ['angular-fast-bind']);`


### Usage
- Static Text
  - `<span bind-once="some.text"></span>`
- Attributes
  - `<span bind-attr-once="{attr1: attributes.one, attr2: attributes.two}"></span>`
- Notifier
  - `<span bind-notifier="myExpression" bind-notifier-name="event-name" bind-notifier-mode="shallow|deep|collection"></span>`
- Bind on Notify
  - `<span bind-on-notify="myExpression" bind-on-notify-name="event-name"</span>`
- Bind Attr on Notify
  - `<span bind-attr-on-notify="{attr1: myExpression, attr2: myOtherExpression}" bind-on-notify-name="event-name"</span>`

### License
MIT
