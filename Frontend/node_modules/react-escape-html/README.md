# react-escape-html [![npm version](https://img.shields.io/npm/v/react-escape-html.svg)](https://www.npmjs.com/package/react-escape-html)

ES6 tagged template string escaping HTML and producing a 'tainted string object' directly usable with React 'dangerouslySetInnerHTML' property.

Use [wbinnssmith/eskape](https://github.com/wbinnssmith/eskape).

## Installation

```
npm install --save react-escape-html
```

## Example

```javascript
var html = require('react-escape-html');

var tag = '<script>';
var safeHTMLString = html`This is a <b>dangerous</b> HTML tag: ${tag}!`;
var safeReactElement = <div dangerouslySetInnerHTML={safeHTMLString} />;
```

## License

MIT
