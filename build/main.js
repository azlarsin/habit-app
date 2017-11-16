webpackJsonp([0],{

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file Utils
 * @author chencheng20
 * @date 13/11/2017
 */

var WEEK = exports.WEEK = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];

var getDatesByMonth = exports.getDatesByMonth = function getDatesByMonth(year, month) {
    month = month - 1;
    var d = new Date(year, month),
        day = d.getDay();

    var start = 0 - day;

    d = new Date(d.setDate(start + 1));

    var dates = [];
    for (var i = 0; i < 7 * 6; i++) {
        dates.push({
            date: d.getDate(),
            fullDate: getDetailDateByDate(d),
            current: isOtherMonth(d, month)
        });

        d = new Date(d.setDate(d.getDate() + 1));
    }

    return dates;
};

var getDetailDateByDate = exports.getDetailDateByDate = function getDetailDateByDate(d) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';

    if (d instanceof Date) {
        var month = d.getMonth() + 1,
            date = d.getDate();

        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;

        return '' + d.getFullYear() + separator + month + separator + date;
    }

    return null;
};

var isOtherMonth = exports.isOtherMonth = function isOtherMonth(d, month) {
    return d.getMonth() === month;
};

var getToday = exports.getToday = function getToday() {
    return getDetailDateByDate(new Date());
};

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(17);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _List = __webpack_require__(60);

var _List2 = _interopRequireDefault(_List);

var _Calendar = __webpack_require__(61);

var _Calendar2 = _interopRequireDefault(_Calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file main
 * @author chencheng20
 * @date 13/11/2017
 */

var App = function App() {
    return _react2.default.createElement(
        'div',
        { className: 'root' },
        _react2.default.createElement(_Calendar2.default, null)
    );
};

__webpack_require__(62);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById("qwe"));

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Utils = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file List
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author chencheng20
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 13/11/2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var List = function (_Component) {
    _inherits(List, _Component);

    function List(props) {
        _classCallCheck(this, List);

        var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

        _this.state = {
            habits: []
        };

        _this.handleAddHabit = _this.handleAddHabit.bind(_this);
        return _this;
    }

    _createClass(List, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            // todo: fetch habits

        }
    }, {
        key: "handleAddHabit",
        value: function handleAddHabit() {
            var newHabit = {
                id: "habit-" + Date.now(),
                name: '',
                createDate: (0, _Utils.getToday)()
            };

            var habits = this.state.habits;
            habits.push(newHabit);

            this.setState({
                habits: habits
            });
        }
    }, {
        key: "render",
        value: function render() {
            console.log(this.state.habits);

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "div",
                    { className: "control" },
                    _react2.default.createElement(
                        "div",
                        {
                            className: "add-habit",
                            onClick: this.handleAddHabit
                        },
                        "+"
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "habits" },
                    this.state.habits.map(function (habit) {
                        return _react2.default.createElement(
                            "div",
                            { key: 'habit-list-' + habit.id },
                            habit.id + '  ' + habit.createDate
                        );
                    })
                )
            );
        }
    }]);

    return List;
}(_react.Component);

exports.default = List;

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Utils = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file Calendar
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author chencheng20
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 13/11/2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Calendar = function (_Component) {
    _inherits(Calendar, _Component);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        var year = props.year || new Date().getFullYear(),
            month = props.month || new Date().getMonth() + 1;

        _this.state = {
            dates: (0, _Utils.getDatesByMonth)(year, month),
            year: year,
            month: month
        };

        _this.handleDateClick = _this.handleDateClick.bind(_this);
        _this.handleDateControlClick = _this.handleDateControlClick.bind(_this);
        return _this;
    }

    _createClass(Calendar, [{
        key: "handleDateClick",
        value: function handleDateClick(e) {
            var dom = e.target;

            if (dom.classList.contains("date")) {
                var date = dom.getAttribute("data-date");

                console.log(this.state.year + '-' + this.state.month + '-' + date);
            }
        }
    }, {
        key: "handleDateControlClick",
        value: function handleDateControlClick() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'next';

            var year = this.state.year;
            var month = this.state.month;

            if (type === 'next') {
                if (month === 12) {
                    year++;
                    month = 1;
                } else {
                    month++;
                }
            }

            if (type === 'prev') {
                if (month === 1) {
                    year--;
                    month = 12;
                } else {
                    month--;
                }
            }

            this.setState({
                dates: (0, _Utils.getDatesByMonth)(year, month),
                year: year,
                month: month
            });
        }
    }, {
        key: "render",
        value: function render() {
            var width = this.props.width || 500;

            return _react2.default.createElement(
                "div",
                { className: "calendar", style: { width: width } },
                _react2.default.createElement(
                    "section",
                    { className: "year" },
                    _react2.default.createElement(
                        "div",
                        {
                            className: "control prev",
                            onClick: this.handleDateControlClick.bind(this, "prev")
                        },
                        "<"
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        this.state.year + '-' + this.state.month
                    ),
                    _react2.default.createElement(
                        "div",
                        {
                            className: "control next",
                            onClick: this.handleDateControlClick.bind(this, "next")
                        },
                        ">"
                    )
                ),
                _react2.default.createElement(
                    "section",
                    { className: "week" },
                    _Utils.WEEK.map(function (day, index) {
                        return _react2.default.createElement(
                            "div",
                            { className: "day", key: "calendar-day" + index },
                            day
                        );
                    })
                ),
                _react2.default.createElement(
                    "section",
                    { onClick: this.handleDateClick },
                    this.state.dates.map(function (detail) {
                        return _react2.default.createElement(
                            "div",
                            {
                                key: "calendar-date-" + detail.fullDate,
                                className: "date" + (detail.current ? "" : " other"),
                                "data-date": detail.date
                            },
                            detail.date
                        );
                    })
                )
            );
        }
    }]);

    return Calendar;
}(_react.Component);

exports.default = Calendar;

/***/ }),

/***/ 62:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[59]);