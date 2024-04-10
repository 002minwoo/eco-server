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
  getListBlog: function getListBlog(req, res) {
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
  getListSuggestBlog: function getListSuggestBlog(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var blogList;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.db.blog.findAll({
              limit: 4,
              attributes: {
                exclude: ['content']
              }
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
              },
              attributes: {
                exclude: ['content']
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
  getBlogDetail: function getBlogDetail(req, res) {
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
  deleteBlog: function deleteBlog(req, res) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiZ2VuZXJhdGVDb2RlIiwibGV0dGVycyIsIm51bWJlcnMiLCJjb2RlIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX2RlZmF1bHQiLCJhZGRCbG9nIiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiZGIiLCJibG9nIiwiY3JlYXRlIiwiYm9keSIsInNsdWciLCJ0aW1lX2NyZWF0ZWQiLCJEYXRlIiwidG9TdHJpbmciLCJkaXNjb3VudCIsInBob3RvIiwiaW1hZ2UiLCJjb250ZW50IiwiZGVzYyIsImFicnVwdCIsInN0YXR1cyIsImpzb24iLCJvayIsInQwIiwiY29uc29sZSIsImxvZyIsInN0b3AiLCJ1cGRhdGVCbG9nIiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJ1cGRhdGUiLCJ3aGVyZSIsImlkIiwiZ2V0TGlzdEJsb2ciLCJfY2FsbGVlMyIsImJsb2dMaXN0IiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiZmluZEFsbCIsIm9yZGVyIiwic2VudCIsImRhdGEiLCJnZXRMaXN0U3VnZ2VzdEJsb2ciLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsImxpbWl0IiwiYXR0cmlidXRlcyIsImV4Y2x1ZGUiLCJzdWNjZXNzIiwiZ2V0TGlzdEJsb2dDYXRlZ29yeSIsIl9jYWxsZWU1IiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1IiwidHlwZSIsInF1ZXJ5IiwiZ2V0QmxvZ0RldGFpbCIsIl9jYWxsZWU2IiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiZGVsZXRlQmxvZyIsIl9jYWxsZWU3IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwiZGVzdHJveSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9ibG9nL2Jsb2cuY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHNcIlxuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ29kZSgpIHtcbiAgICBjb25zdCBsZXR0ZXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJztcbiAgICBjb25zdCBudW1iZXJzID0gJzAxMjM0NTY3ODknO1xuICBcbiAgICBsZXQgY29kZSA9ICcnO1xuICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgY29kZSArPSBsZXR0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aCkpO1xuICAgIH1cbiAgXG4gICAgY29kZSArPSAnLSc7XG4gIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICBpZiAoaSA9PT0gMikge1xuICAgICAgICBjb2RlICs9ICctJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGNvZGUgKz0gJy0nO1xuICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgaWYgKGkgPT09IDMpIHtcbiAgICAgICAgY29kZSArPSAnLSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2RlICs9IG51bWJlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcnMubGVuZ3RoKSk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBjb2RlICs9ICctJztcbiAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIGNvZGUgKz0gbGV0dGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpKTtcbiAgICB9XG4gIFxuICAgIHJldHVybiBjb2RlO1xuICB9XG5cbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXN5bmMgYWRkQmxvZyhyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIuYmxvZy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIC4uLnJlcS5ib2R5LCBzbHVnOiBcIlwiLCB0aW1lX2NyZWF0ZWQ6IG5ldyBEYXRlKCkudG9TdHJpbmcoKSwgZGlzY291bnQ6IDAsIHBob3RvOiByZXEuYm9keS5pbWFnZSwgY29udGVudDogcmVxLmJvZHkuY29udGVudCwgZGVzYzogcmVxLmJvZHkuZGVzY1xuICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtvazogZmFsc2V9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyB1cGRhdGVCbG9nKHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBkYi5ibG9nLnVwZGF0ZShcbiAgICAgICAgICAgICAgICB7IC4uLnJlcS5ib2R5IH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcS5ib2R5LmlkXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0TGlzdEJsb2cocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3QgYmxvZ0xpc3QgPSBhd2FpdCBkYi5ibG9nLmZpbmRBbGwoe1xuICAgICAgICAgICAgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLFxuICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiBibG9nTGlzdCB9KVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0TGlzdFN1Z2dlc3RCbG9nKHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IGJsb2dMaXN0PSBhd2FpdCBkYi5ibG9nLmZpbmRBbGwoe1xuICAgICAgICAgICAgbGltaXQ6IDQsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgZXhjbHVkZTogWydjb250ZW50J11cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogYmxvZ0xpc3QgfSk7XG4gICAgfSxcbiAgICBhc3luYyBnZXRMaXN0QmxvZ0NhdGVnb3J5KHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBibG9nTGlzdD0gYXdhaXQgZGIuYmxvZy5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiByZXEucXVlcnkudHlwZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBleGNsdWRlOiBbJ2NvbnRlbnQnXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe29rOiB0cnVlLCBkYXRhOiBibG9nTGlzdH0pXG4gICAgICAgICAgICBcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtvazogZmFsc2V9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBnZXRCbG9nRGV0YWlsKHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBibG9nTGlzdD0gYXdhaXQgZGIuYmxvZy5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICBpZDogcmVxLnF1ZXJ5LmlkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IHRydWUsIGRhdGE6IGJsb2dMaXN0fSlcbiAgICAgICAgICAgIFxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe29rOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgLFxuICAgIGFzeW5jIGRlbGV0ZUJsb2cocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLmJvZHlcbiAgICAgICAgZGIuYmxvZy5kZXN0cm95KHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlIH0pXG4gICAgfSxcblxuXG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQW9DLFNBQUFDLFFBQUFDLE1BQUEsRUFBQUMsY0FBQSxRQUFBQyxJQUFBLEdBQUFDLE1BQUEsQ0FBQUQsSUFBQSxDQUFBRixNQUFBLE9BQUFHLE1BQUEsQ0FBQUMscUJBQUEsUUFBQUMsT0FBQSxHQUFBRixNQUFBLENBQUFDLHFCQUFBLENBQUFKLE1BQUEsR0FBQUMsY0FBQSxLQUFBSSxPQUFBLEdBQUFBLE9BQUEsQ0FBQUMsTUFBQSxXQUFBQyxHQUFBLFdBQUFKLE1BQUEsQ0FBQUssd0JBQUEsQ0FBQVIsTUFBQSxFQUFBTyxHQUFBLEVBQUFFLFVBQUEsT0FBQVAsSUFBQSxDQUFBUSxJQUFBLENBQUFDLEtBQUEsQ0FBQVQsSUFBQSxFQUFBRyxPQUFBLFlBQUFILElBQUE7QUFBQSxTQUFBVSxjQUFBQyxNQUFBLGFBQUFDLENBQUEsTUFBQUEsQ0FBQSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsRUFBQUYsQ0FBQSxVQUFBRyxNQUFBLFdBQUFGLFNBQUEsQ0FBQUQsQ0FBQSxJQUFBQyxTQUFBLENBQUFELENBQUEsUUFBQUEsQ0FBQSxPQUFBZixPQUFBLENBQUFJLE1BQUEsQ0FBQWMsTUFBQSxPQUFBQyxPQUFBLFdBQUFDLEdBQUEsUUFBQUMsZ0JBQUEsYUFBQVAsTUFB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