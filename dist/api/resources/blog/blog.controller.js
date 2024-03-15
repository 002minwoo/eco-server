"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../../../models");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function generateCode() {
  var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var numbers = '0123456789';
  var code = '';
  for (var i = 0; i < 3; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  code += '-';
  for (var _i = 0; _i < 5; _i++) {
    if (_i === 2) {
      code += '-';
    } else {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
  }
  code += '-';
  for (var _i2 = 0; _i2 < 5; _i2++) {
    if (_i2 === 3) {
      code += '-';
    } else {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
  }
  code += '-';
  for (var _i3 = 0; _i3 < 4; _i3++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return code;
}
var _default = {
  addBlog: function addBlog(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _models.db.blog.create(_objectSpread(_objectSpread({}, req.body), {}, {
              slug: "",
              time_created: new Date().toString(),
              discount: 0,
              photo: req.body.image,
              content: req.body.content,
              desc: req.body.desc
            }));
            return _context.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 5]]);
    }))();
  },
  updateBlog: function updateBlog(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models.db.blog.update(_objectSpread({}, req.body), {
              where: {
                id: req.body.id
              }
            });
          case 3:
            return _context2.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 6]]);
    }))();
  },
  getListTour: function getListTour(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var blogList;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.db.blog.findAll({
              order: [['createdAt', 'DESC']]
            });
          case 2:
            blogList = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              data: blogList
            }));
          case 4:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  getListSuggestTour: function getListSuggestTour(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var blogList;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.db.blog.findAll({
              limit: 4
            });
          case 2:
            blogList = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              success: true,
              data: blogList
            }));
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  },
  getListBlogCategory: function getListBlogCategory(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var blogList;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _models.db.blog.findAll({
              where: {
                type: req.query.type
              }
            });
          case 3:
            blogList = _context5.sent;
            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              data: blogList
            }));
          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 11:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 7]]);
    }))();
  },
  getTourDetail: function getTourDetail(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var blogList;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _models.db.blog.findAll({
              where: {
                id: req.query.id
              }
            });
          case 3:
            blogList = _context6.sent;
            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              data: blogList
            }));
          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 11:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 7]]);
    }))();
  },
  deleteTour: function deleteTour(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var id;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            id = req.body.id;
            _models.db.blog.destroy({
              where: {
                id: id
              }
            });
            return _context7.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 3:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiZ2VuZXJhdGVDb2RlIiwibGV0dGVycyIsIm51bWJlcnMiLCJjb2RlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX2RlZmF1bHQiLCJhZGRCbG9nIiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiZGIiLCJibG9nIiwiY3JlYXRlIiwiYm9keSIsInNsdWciLCJ0aW1lX2NyZWF0ZWQiLCJEYXRlIiwidG9TdHJpbmciLCJkaXNjb3VudCIsInBob3RvIiwiaW1hZ2UiLCJjb250ZW50IiwiZGVzYyIsImFicnVwdCIsInN0YXR1cyIsImpzb24iLCJvayIsInQwIiwiY29uc29sZSIsImxvZyIsInN0b3AiLCJ1cGRhdGVCbG9nIiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJ1cGRhdGUiLCJ3aGVyZSIsImlkIiwiZ2V0TGlzdFRvdXIiLCJfY2FsbGVlMyIsImJsb2dMaXN0IiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiZmluZEFsbCIsIm9yZGVyIiwic2VudCIsImRhdGEiLCJnZXRMaXN0U3VnZ2VzdFRvdXIiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsImxpbWl0Iiwic3VjY2VzcyIsImdldExpc3RCbG9nQ2F0ZWdvcnkiLCJfY2FsbGVlNSIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsInR5cGUiLCJxdWVyeSIsImdldFRvdXJEZXRhaWwiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRlbGV0ZVRvdXIiLCJfY2FsbGVlNyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImRlc3Ryb3kiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvYmxvZy9ibG9nLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCJcblxuXG5mdW5jdGlvbiBnZW5lcmF0ZUNvZGUoKSB7XG4gICAgY29uc3QgbGV0dGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWic7XG4gICAgY29uc3QgbnVtYmVycyA9ICcwMTIzNDU2Nzg5JztcbiAgXG4gICAgbGV0IGNvZGUgPSAnJztcbiAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcbiAgICB9XG4gIFxuICAgIGNvZGUgKz0gJy0nO1xuICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgaWYgKGkgPT09IDIpIHtcbiAgICAgICAgY29kZSArPSAnLSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2RlICs9IGxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKSk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBjb2RlICs9ICctJztcbiAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgIGlmIChpID09PSAzKSB7XG4gICAgICAgIGNvZGUgKz0gJy0nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29kZSArPSBudW1iZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBudW1iZXJzLmxlbmd0aCkpO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgY29kZSArPSAnLSc7XG4gIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICBjb2RlICs9IGxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKSk7XG4gICAgfVxuICBcbiAgICByZXR1cm4gY29kZTtcbiAgfVxuXG4gIFxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzeW5jIGFkZEJsb2cocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLmJsb2cuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAuLi5yZXEuYm9keSwgc2x1ZzogXCJcIiwgdGltZV9jcmVhdGVkOiBuZXcgRGF0ZSgpLnRvU3RyaW5nKCksIGRpc2NvdW50OiAwLCBwaG90bzogcmVxLmJvZHkuaW1hZ2UsIGNvbnRlbnQ6IHJlcS5ib2R5LmNvbnRlbnQsIGRlc2M6IHJlcS5ib2R5LmRlc2NcbiAgICAgICAgICAgIH0pXG4gICAgXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSB9KVxuICAgICAgICAgICAgXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7b2s6IGZhbHNlfSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgdXBkYXRlQmxvZyhyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgZGIuYmxvZy51cGRhdGUoXG4gICAgICAgICAgICAgICAgeyAuLi5yZXEuYm9keSB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXEuYm9keS5pZFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGdldExpc3RUb3VyKHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IGJsb2dMaXN0ID0gYXdhaXQgZGIuYmxvZy5maW5kQWxsKHtcbiAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IGJsb2dMaXN0IH0pXG4gICAgfSxcbiAgICBhc3luYyBnZXRMaXN0U3VnZ2VzdFRvdXIocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3QgYmxvZ0xpc3Q9IGF3YWl0IGRiLmJsb2cuZmluZEFsbCh7XG4gICAgICAgICAgICBsaW1pdDogNFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBibG9nTGlzdCB9KTtcbiAgICB9LFxuICAgIGFzeW5jIGdldExpc3RCbG9nQ2F0ZWdvcnkocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGJsb2dMaXN0PSBhd2FpdCBkYi5ibG9nLmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHJlcS5xdWVyeS50eXBlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IHRydWUsIGRhdGE6IGJsb2dMaXN0fSlcbiAgICAgICAgICAgIFxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe29rOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGdldFRvdXJEZXRhaWwocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGJsb2dMaXN0PSBhd2FpdCBkYi5ibG9nLmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiByZXEucXVlcnkuaWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZSwgZGF0YTogYmxvZ0xpc3R9KVxuICAgICAgICAgICAgXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7b2s6IGZhbHNlfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAsXG4gICAgYXN5bmMgZGVsZXRlVG91cihyZXEsIHJlcykge1xuICAgICAgICBjb25zdCB7IGlkIH0gPSByZXEuYm9keVxuICAgICAgICBkYi5ibG9nLmRlc3Ryb3koe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBpZDogaWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUgfSlcbiAgICB9LFxuXG5cbn0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFBb0MsU0FBQUMsUUFBQUMsTUFBQSxFQUFBQyxjQUFBLFFBQUFDLElBQUEsR0FBQUMsTUFBQSxDQUFBRCxJQUFBLENBQUFGLE1BQUEsT0FBQUcsTUFBQSxDQUFBQyxxQkFBQSxRQUFBQyxPQUFBLEdBQUFGLE1BQUEsQ0FBQUMscUJBQUEsQ0FBQUosTUFBQSxHQUFBQyxjQUFBLEtBQUFJLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxNQUFBLFdBQUFDLEdBQUEsV0FBQUosTUFBQSxDQUFBSyx3QkFBQSxDQUFBUixNQUFBLEVBQUFPLEdBQUEsRUFBQUUsVUFBQSxPQUFBUCxJQUFBLENBQUFRLElBQUEsQ0FBQUMsS0FBQSxDQUFBVCxJQUFBLEVBQUFHLE9BQUEsWUFBQUgsSUFBQTtBQUFBLFNBQUFVLGNBQUFDLE1BQUEsYUFBQUMsQ0FBQSxNQUFBQSxDQUFBLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxFQUFBRixDQUFBLFVBQUFHLE1BQUEsV0FBQUYsU0FBQSxDQUFBRCxDQUFBLElBQUFDLFNBQUEsQ0FBQUQsQ0FBQSxRQUFBQSxDQUFBLE9BQUFmLE9BQUEsQ0FBQUksTUFBQSxDQUFBYyxNQUFBLE9BQUFDLE9BQUEsV0FBQUMsR0FBQSxRQUFBQyxnQkFBQSxhQUFBUCxNQUFBLEVBQUFNLEdBQUEsRUFBQUYsTUFBQSxDQUFBRSxHQUFBLFNBQUFoQixNQUFBLENBQUFrQix5QkFBQSxHQUFBbEIsTUFBQSxDQUFBbUIsZ0JBQUEsQ0FBQVQsTUFBQSxFQUFBVixNQUFBLENBQUFrQix5QkFBQSxDQUFBSixNQUFBLEtBQUFsQixPQUFBLENBQUFJLE1BQUEsQ0FBQWMsTUFBQSxHQUFBQyxPQUFBLFdBQUFDLEdBQUEsSUFBQWhCLE1BQUEsQ0FBQW9CLGNBQUEs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