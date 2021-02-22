(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "/VWF":
/*!*****************************************************!*\
  !*** ./src/ui/desktop/admin/dashboard/Dashboard.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _Dashboard = __webpack_require__(/*! ./Dashboard.jsx */ \"jzzW\");\n\nvar _Dashboard2 = _interopRequireDefault(_Dashboard);\n\nvar _AdminBaseComponent2 = __webpack_require__(/*! ../../../AdminBaseComponent */ \"HysA\");\n\nvar _AdminBaseComponent3 = _interopRequireDefault(_AdminBaseComponent2);\n\n__webpack_require__(/*! ./Dashboard.scss */ \"SBKy\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Dashboard = function (_AdminBaseComponent) {\n  _inherits(Dashboard, _AdminBaseComponent);\n\n  function Dashboard(props, context) {\n    _classCallCheck(this, Dashboard);\n\n    var _this = _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this, props, context));\n\n    _this.jsxTemplate = _Dashboard2.default;\n    _this.state = {\n      curItem: {}\n    };\n    return _this;\n  }\n\n  _createClass(Dashboard, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      _get(Dashboard.prototype.__proto__ || Object.getPrototypeOf(Dashboard.prototype), 'componentDidMount', this).call(this);\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      return this.jsxTemplate.call(this);\n    }\n  }]);\n\n  return Dashboard;\n}(_AdminBaseComponent3.default);\n\nexports.default = Dashboard;\n\n//# sourceURL=webpack:///./src/ui/desktop/admin/dashboard/Dashboard.js?");

/***/ }),

/***/ "SBKy":
/*!*******************************************************!*\
  !*** ./src/ui/desktop/admin/dashboard/Dashboard.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/ui/desktop/admin/dashboard/Dashboard.scss?");

/***/ }),

/***/ "jzzW":
/*!******************************************************!*\
  !*** ./src/ui/desktop/admin/dashboard/Dashboard.jsx ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function () {\n\n  return _react2.default.createElement(\n    \"section\",\n    { className: \"dashboard\" },\n    _react2.default.createElement(\n      \"div\",\n      { className: \"container-fluid\" },\n      _react2.default.createElement(\n        \"div\",\n        { className: \"row\" },\n        _react2.default.createElement(\n          \"div\",\n          { className: \"col-xl-12 col-lg-12 col-md-12\" },\n          \"Admin dashboard\"\n        )\n      )\n    )\n  );\n};\n\nvar _react = __webpack_require__(/*! react */ \"q1tI\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack:///./src/ui/desktop/admin/dashboard/Dashboard.jsx?");

/***/ })

}]);