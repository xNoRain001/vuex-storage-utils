var error = function error(message) {
  console.error(message);
};

var set = function set(key, state, expirationDate) {
  try {
    localStorage.setItem(key, "".concat(expirationDate, "-").concat(JSON.stringify(state)));
  } catch (e) {
    error(e);
  }
};

var cb = function cb(_, state, key, expirationDate) {
  set(key, state, expirationDate);
};

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var now = function now() {
  return Date.now();
};

var get = function get(key) {
  try {
    var value = localStorage.getItem(key);

    if (value === null) {
      return null;
    }

    var _value$split = value.split('-'),
        _value$split2 = _slicedToArray(_value$split, 2),
        expirationDate = _value$split2[0],
        state = _value$split2[1];

    return now() > +expirationDate ? null : JSON.parse(state);
  } catch (e) {
    error(e);
  }
};

var isPlainObject = function isPlainObject(v) {
  return Object.prototype.toString.call(v).slice(8, -1) === 'Object';
};

var storage = function storage() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$key = options.key,
      key = _options$key === void 0 ? 'default' : _options$key,
      expires = options.expires,
      date = options.date;
  var filtered = date || expires;
  var expirationDate = typeof filtered === 'number' ? now() + filtered * 1000 : filtered ? filtered.getTime() : null;
  return function (store) {
    // init
    var state = get(key);

    if (isPlainObject(state)) {
      store.replaceState(state);
    } // execute cb when the state changed by mutation


    store.subscribe(function (mutation, state) {
      cb(mutation, state, key, expirationDate);
    });
  };
};

export { storage as default };
