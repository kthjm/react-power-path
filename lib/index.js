'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function(obj) {
        return typeof obj
      }
    : function(obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj
      }

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

var passStyleKeys = ['strokeDasharray', 'strokeDashoffset']

var PowerPath = (function(_React$Component) {
  _inherits(PowerPath, _React$Component)

  function PowerPath(props) {
    _classCallCheck(this, PowerPath)

    var _this = _possibleConstructorReturn(
      this,
      (PowerPath.__proto__ || Object.getPrototypeOf(PowerPath)).call(
        this,
        props
      )
    )

    _this.setTotalLength(props.d)
    return _this
  }

  _createClass(PowerPath, [
    {
      key: 'setTotalLength',
      value: function setTotalLength(d) {
        if (isD(d)) {
          d
          this.totalLength = d2t(d)
        }
      }
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this

        var props = Object.assign({}, this.props)
        if (_typeof(props.style) === 'object') {
          passStyleKeys.forEach(function(key) {
            props.style[key] = ifIsFn(props.style[key], _this2.totalLength)
          })
        }
        return _react2.default.createElement('path', props)
      }
    },
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.props.d !== nextProps.d) {
          this.setTotalLength(nextProps.d)
        }
      }
    }
  ])

  return PowerPath
})(_react2.default.Component)

exports.default = PowerPath

var isD = function isD(d) {
  return d && typeof d === 'string'
}

var d2t = function d2t(d) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', d)
  return path.getTotalLength()
}

var ifIsFn = function ifIsFn(value, arg) {
  return typeof value === 'function' ? value(arg) : value
}