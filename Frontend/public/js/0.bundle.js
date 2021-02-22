(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "alCf":
/*!**********************************!*\
  !*** ./src/component/Pagging.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.Pagging = undefined;\n\nvar _react = __webpack_require__(/*! react */ \"q1tI\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Pagging = exports.Pagging = function Pagging(props) {\n    var pages = [];\n    var max_show = 2;\n    var half = parseInt(max_show / 2);\n    var start = 1;\n    if (props.total > max_show) {\n\n        if (props.current > half) {\n            start = props.current - half;\n        }\n        if (props.current + half >= props.total) {\n            start = props.total - max_show;\n        }\n    }\n    max_show += start;\n    for (var i = start; i <= max_show && i <= props.total; i++) {\n        pages[i] = i == props.current ? _react2.default.createElement(\n            \"li\",\n            { key: \"page_\" + i, className: \"active\", \"aria-current\": \"page\" },\n            _react2.default.createElement(\n                \"a\",\n                { href: \"javascript:void(0);\" },\n                i\n            )\n        ) : _react2.default.createElement(\n            \"li\",\n            { key: \"page_\" + i },\n            _react2.default.createElement(\n                \"a\",\n                { href: \"javascript:void(0);\", onClick: props.onSelectPage(i) },\n                i\n            )\n        );\n    }\n    return _react2.default.createElement(\n        _react2.default.Fragment,\n        null,\n        props.total > 1 && _react2.default.createElement(\n            \"div\",\n            { className: \"paging\" },\n            _react2.default.createElement(\n                \"ul\",\n                null,\n                props.current == 1 ? _react2.default.createElement(\n                    \"li\",\n                    { className: \"page-item disabled previous\" },\n                    _react2.default.createElement(\n                        \"a\",\n                        { href: \"javascript:void(0);\" },\n                        _react2.default.createElement(\"i\", { className: \"icon icon-angle-double-left\" })\n                    )\n                ) : _react2.default.createElement(\n                    \"li\",\n                    { className: \"page-item previous\" },\n                    _react2.default.createElement(\n                        \"a\",\n                        { href: \"javascript:void(0);\", onClick: props.onSelectPage(1) },\n                        _react2.default.createElement(\"i\", { className: \"icon icon-angle-double-left\", \"aria-hidden\": \"true\" })\n                    )\n                ),\n                props.current == 1 ? _react2.default.createElement(\n                    \"li\",\n                    { className: \"page-item disabled previous\" },\n                    _react2.default.createElement(\n                        \"a\",\n                        { href: \"javascript:void(0);\" },\n                        _react2.default.createElement(\"i\", { className: \"icon icon-angle-left\", \"aria-hidden\": \"true\" })\n                    )\n                ) : _react2.default.createElement(\n                    \"li\",\n                    { className: \"page-item previous\" },\n                    _react2.default.createElement(\n                        \"a\",\n                        { href: \"javascript:void(0);\", onClick: props.onSelectPage(props.current - 1) },\n                        _react2.default.createElement(\"i\", { className: \"icon icon-angle-left\" })\n                    )\n                ),\n                start > 1 && _react2.default.createElement(\n                    _react2.default.Fragment,\n                    null,\n                    _react2.default.createElement(\n                        \"li\",\n                        null,\n                        _react2.default.createElement(\n                            \"a\",\n                            { href: \"javascript:void(0);\", onClick: props.onSelectPage(1) },\n                            \"1\"\n                        )\n                    ),\n                    _react2.default.createElement(\n                        \"li\",\n                        null,\n                        _react2.default.createElement(\n                            \"span\",\n                            null,\n                            \"...\"\n                        )\n                    )\n                ),\n                pages,\n                max_show < props.total && _react2.default.createElement(\n                    _react2.default.Fragment,\n                    null,\n                    _react2.default.createElement(\n                        \"li\",\n                        { className: \"page-item active\", \"aria-current\": \"page\" },\n                        _react2.default.createElement(\n                            \"span\",\n                            null,\n                            \"...\"\n                        )\n                    ),\n                    _react2.default.createElement(\n                        \"li\",\n                        { className: \"page-item\" },\n                        _react2.default.createElement(\n                            \"a\",\n                            { href: \"javascript:void(0);\", onClick: props.onSelectPage(props.total) },\n                            props.total\n                        )\n                    )\n                ),\n                props.current == props.total ? _react2.default.createElement(\n                    \"li\",\n                    { className: \"page-item disabled next\" },\n                    _react2.default.createElement(\n                        \"a\",\n                        { href: \"javascript:void(0);\" },\n                        _react2.default.createElement(\"i\", { className: \"icon icon-angle-right\" })\n                    )\n                ) : _react2.default.createElement(\n                    \"li\",\n                    { className: \"page-item next\" },\n                    _react2.default.createElement(\n                        \"a\",\n                        { href: \"javascript:void(0);\", onClick: props.onSelectPage(props.current + 1) },\n                        _react2.default.createElement(\"i\", { className: \"icon icon-angle-right\" })\n                    )\n                ),\n                props.current == props.total ? _react2.default.createElement(\n                    \"li\",\n                    { className: \"page-item disabled next\" },\n                    _react2.default.createElement(\n                        \"a\",\n                        { href: \"javascript:void(0);\" },\n                        _react2.default.createElement(\"i\", { className: \"icon icon-angle-double-right\" })\n                    )\n                ) : _react2.default.createElement(\n                    \"li\",\n                    { className: \"page-item next\" },\n                    _react2.default.createElement(\n                        \"a\",\n                        { href: \"javascript:void(0);\", onClick: props.onSelectPage(props.total) },\n                        _react2.default.createElement(\"i\", { className: \"icon icon-angle-double-right\" })\n                    )\n                )\n            )\n        )\n    );\n};\n\n//# sourceURL=webpack:///./src/component/Pagging.js?");

/***/ })

}]);