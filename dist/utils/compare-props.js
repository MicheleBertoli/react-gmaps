'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (props, nextProps) {

  var propsKeys = Object.keys(props);
  var nextPropsKeys = Object.keys(nextProps);
  if (propsKeys.length !== nextPropsKeys.length) {
    return false;
  }

  for (var i = 0; i < propsKeys.length; i++) {
    var key = propsKeys[i];
    if (key !== 'children' && key.indexOf('on') !== 0 && (!nextProps.hasOwnProperty(key) || props[key] !== nextProps[key])) {
      return false;
    }
  }

  return true;
};

module.exports = exports['default'];