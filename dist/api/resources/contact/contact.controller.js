"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mailer = _interopRequireDefault(require("../../../mailer"));
var _models = require("../../../models");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  submit_contact: function submit_contact(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _req$body, _req$body2;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _models.db.contact.create(_objectSpread(_objectSpread({}, req.body), {}, {
              type: (_req$body = req.body) !== null && _req$body !== void 0 && _req$body.type ? (_req$body2 = req.body) === null || _req$body2 === void 0 ? void 0 : _req$body2.type : "",
              product: req.body.product ? req.body.product : ""
            }));
            return _context.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  delete_contact: function delete_contact(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var contactId;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            contactId = req.body.contactId;
            _models.db.contact.destroy({
              where: {
                id: contactId
              }
            });
            return _context2.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  reply_contact: function reply_contact(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$body3, email, content, contactId, replyText, user_reply;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _req$body3 = req.body, email = _req$body3.email, content = _req$body3.content, contactId = _req$body3.contactId, replyText = _req$body3.replyText, user_reply = _req$body3.user_reply;
            _mailer["default"].replyContact(email, content).then(function () {
              _models.db.contact.update({
                status: "replied",
                reply_text: replyText,
                user_reply: user_reply
              }, {
                where: {
                  id: contactId
                }
              });
              return res.status(200).json({
                ok: true
              });
            })["catch"](function (e) {
              return res.status(200).json({
                ok: false
              });
            });
          case 2:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  get_list_contact: function get_list_contact(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var contactList;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.db.contact.findAll({
              order: [['createdAt', 'DESC']]
            });
          case 2:
            contactList = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              data: contactList
            }));
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbWFpbGVyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfbW9kZWxzIiwib3duS2V5cyIsIm9iamVjdCIsImVudW1lcmFibGVPbmx5Iiwia2V5cyIsIk9iamVjdCIsImdldE93blByb3BlcnR5U3ltYm9scyIsInN5bWJvbHMiLCJmaWx0ZXIiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwicHVzaCIsImFwcGx5IiwiX29iamVjdFNwcmVhZCIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJmb3JFYWNoIiwia2V5IiwiX2RlZmluZVByb3BlcnR5MiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydHkiLCJfZGVmYXVsdCIsInN1Ym1pdF9jb250YWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJfcmVxJGJvZHkiLCJfcmVxJGJvZHkyIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsImRiIiwiY29udGFjdCIsImNyZWF0ZSIsImJvZHkiLCJ0eXBlIiwicHJvZHVjdCIsImFicnVwdCIsInN0YXR1cyIsImpzb24iLCJvayIsInN0b3AiLCJkZWxldGVfY29udGFjdCIsIl9jYWxsZWUyIiwiY29udGFjdElkIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiZGVzdHJveSIsIndoZXJlIiwiaWQiLCJyZXBseV9jb250YWN0IiwiX2NhbGxlZTMiLCJfcmVxJGJvZHkzIiwiZW1haWwiLCJjb250ZW50IiwicmVwbHlUZXh0IiwidXNlcl9yZXBseSIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsIm1haWxlciIsInJlcGx5Q29udGFjdCIsInRoZW4iLCJ1cGRhdGUiLCJyZXBseV90ZXh0IiwiZSIsImdldF9saXN0X2NvbnRhY3QiLCJfY2FsbGVlNCIsImNvbnRhY3RMaXN0IiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiZmluZEFsbCIsIm9yZGVyIiwic2VudCIsImRhdGEiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvY29udGFjdC9jb250YWN0LmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1haWxlciBmcm9tIFwiLi4vLi4vLi4vbWFpbGVyXCJcbmltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3luYyBzdWJtaXRfY29udGFjdChyZXEsIHJlcykge1xuICAgICAgICBkYi5jb250YWN0LmNyZWF0ZSh7XG4gICAgICAgICAgICAuLi5yZXEuYm9keSwgdHlwZTogcmVxLmJvZHk/LnR5cGUgPyByZXEuYm9keT8udHlwZSA6IFwiXCIsIHByb2R1Y3Q6IHJlcS5ib2R5LnByb2R1Y3QgPyByZXEuYm9keS5wcm9kdWN0IDogXCJcIlxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IHRydWV9KVxuICAgIH0sXG5cbiAgICBhc3luYyBkZWxldGVfY29udGFjdChyZXEsIHJlcykge1xuICAgICAgICBjb25zdCB7Y29udGFjdElkIH09IHJlcS5ib2R5XG4gICAgICAgIGRiLmNvbnRhY3QuZGVzdHJveSh7XG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIGlkOiBjb250YWN0SWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZX0pXG4gICAgfSxcblxuICAgIGFzeW5jIHJlcGx5X2NvbnRhY3QocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3Qge2VtYWlsLCBjb250ZW50LCBjb250YWN0SWQsIHJlcGx5VGV4dCwgdXNlcl9yZXBseX09IHJlcS5ib2R5XG4gICAgICAgIG1haWxlci5yZXBseUNvbnRhY3QoZW1haWwsIGNvbnRlbnQpXG4gICAgICAgIC50aGVuKCgpPT4ge1xuICAgICAgICAgICAgZGIuY29udGFjdC51cGRhdGUoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogXCJyZXBsaWVkXCIsIFxuICAgICAgICAgICAgICAgIHJlcGx5X3RleHQ6IHJlcGx5VGV4dCxcbiAgICAgICAgICAgICAgICB1c2VyX3JlcGx5XG4gICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICB3aGVyZToge2lkOiBjb250YWN0SWR9XG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZX0pXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogZmFsc2V9KVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0X2xpc3RfY29udGFjdChyZXEsIHJlcykge1xuICAgICAgICBjb25zdCBjb250YWN0TGlzdD0gYXdhaXQgZGIuY29udGFjdC5maW5kQWxsKHtcbiAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZSwgZGF0YTogY29udGFjdExpc3R9KVxuXG4gICAgfVxufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLE9BQUEsR0FBQUQsT0FBQTtBQUFvQyxTQUFBRSxRQUFBQyxNQUFBLEVBQUFDLGNBQUEsUUFBQUMsSUFBQSxHQUFBQyxNQUFBLENBQUFELElBQUEsQ0FBQUYsTUFBQSxPQUFBRyxNQUFBLENBQUFD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