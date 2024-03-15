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
var _require = require("sequelize"),
  Op = _require.Op,
  Sequelize = _require.Sequelize;
var generateVoucher = function generateVoucher() {
  var min = 2;
  var max = 20;
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  var voucherValue = randomNumber * 5000;
  var expireDate = new Date();
  // Thêm 30 ngày vào ngày hiện tại để tạo expire date
  expireDate.setDate(expireDate.getDate() + 30);
  var code = generateCode();
  return {
    discount: voucherValue,
    expire: expireDate.toISOString(),
    code: code
  };
};
function generateCode() {
  // Tạo một mã code ngẫu nhiên, ví dụ: ABCD1234
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  var code = '';
  for (var i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}
var _default = {
  getAllVoucher: function getAllVoucher(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var voucherList;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models.db.voucher.findAll({
              order: [['createdAt', 'DESC']]
            });
          case 2:
            voucherList = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              ok: true,
              data: voucherList
            }));
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  createVoucher: function createVoucher(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models.db.voucher.create(_objectSpread({}, req.body));
          case 2:
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
  deleteVoucher: function deleteVoucher(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var voucherId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            voucherId = req.body.voucherId;
            _context3.next = 3;
            return _models.db.voucher.destroy({
              where: {
                id: voucherId
              }
            });
          case 3:
            return _context3.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 4:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  detailVoucher: function detailVoucher(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var voucherId, data;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            voucherId = req.query.voucherId;
            _context4.next = 3;
            return _models.db.voucher.findOne({
              where: {
                id: voucherId
              }
            });
          case 3:
            data = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              data: data
            }));
          case 5:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  },
  applyVoucher: function applyVoucher(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var uid, code, data, data1;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            uid = req.user.uid;
            code = req.body.code;
            _context5.next = 4;
            return _models.db.voucher.findOne({
              where: {
                code: code
              }
            });
          case 4:
            data = _context5.sent;
            if (!data) {
              _context5.next = 14;
              break;
            }
            _context5.next = 8;
            return _models.db.vouchercustomer.findOne({
              where: {
                voucherId: data.id,
                customerId: uid
              }
            });
          case 8:
            data1 = _context5.sent;
            if (!(data1.is_use == 1)) {
              _context5.next = 11;
              break;
            }
            return _context5.abrupt("return", res.status(200).json({
              ok: false,
              used: true
            }));
          case 11:
            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              data: {
                id: data.id
              }
            }));
          case 14:
            return _context5.abrupt("return", res.status(200).json({
              ok: false,
              data: data
            }));
          case 15:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }))();
  },
  createSchedule: function createSchedule(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var _req$body, date_start, date_end, amount_voucher, vouchers, i, voucher;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _req$body = req.body, date_start = _req$body.date_start, date_end = _req$body.date_end, amount_voucher = _req$body.amount_voucher;
            vouchers = [];
            for (i = 0; i < parseInt(amount_voucher); i++) {
              voucher = generateVoucher();
              vouchers.push(voucher);
            }
            _models.db.voucher.bulkCreate(vouchers);
            _models.db.voucherschedule.create({
              date_start: date_start,
              date_end: date_end,
              amount_voucher: amount_voucher
            });
            return _context6.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 6:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }))();
  },
  getSchedule: function getSchedule(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var data;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _models.db.voucherschedule.findOne();
          case 2:
            data = _context7.sent;
            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              data: data
            }));
          case 4:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))();
  },
  getVoucherHuting: function getVoucherHuting(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var data1, data;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _models.db.voucherschedule.findOne();
          case 2:
            data1 = _context8.sent;
            _context8.next = 5;
            return _models.db.voucher.findAll({
              order: Sequelize.literal('RAND()'),
              limit: (data1 === null || data1 === void 0 ? void 0 : data1.amount_voucher) || 0
            });
          case 5:
            data = _context8.sent;
            return _context8.abrupt("return", res.status(200).json({
              ok: true,
              data: data
            }));
          case 7:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX3JlcXVpcmUiLCJPcCIsIlNlcXVlbGl6ZSIsImdlbmVyYXRlVm91Y2hlciIsIm1pbiIsIm1heCIsInJhbmRvbU51bWJlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInZvdWNoZXJWYWx1ZSIsImV4cGlyZURhdGUiLCJEYXRlIiwic2V0RGF0ZSIsImdldERhdGUiLCJjb2RlIiwiZ2VuZXJhdGVDb2RlIiwiZGlzY291bnQiLCJleHBpcmUiLCJ0b0lTT1N0cmluZyIsImNoYXJhY3RlcnMiLCJjaGFyQXQiLCJfZGVmYXVsdCIsImdldEFsbFZvdWNoZXIiLCJyZXEiLCJyZXMiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInZvdWNoZXJMaXN0Iiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsImRiIiwidm91Y2hlciIsImZpbmRBbGwiLCJvcmRlciIsInNlbnQiLCJhYnJ1cHQiLCJzdGF0dXMiLCJqc29uIiwib2siLCJkYXRhIiwic3RvcCIsImNyZWF0ZVZvdWNoZXIiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImNyZWF0ZSIsImJvZHkiLCJkZWxldGVWb3VjaGVyIiwiX2NhbGxlZTMiLCJ2b3VjaGVySWQiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJkZXN0cm95Iiwid2hlcmUiLCJpZCIsImRldGFpbFZvdWNoZXIiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsInF1ZXJ5IiwiZmluZE9uZSIsImFwcGx5Vm91Y2hlciIsIl9jYWxsZWU1IiwidWlkIiwiZGF0YTEiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJ1c2VyIiwidm91Y2hlcmN1c3RvbWVyIiwiY3VzdG9tZXJJZCIsImlzX3VzZSIsInVzZWQiLCJjcmVhdGVTY2hlZHVsZSIsIl9jYWxsZWU2IiwiX3JlcSRib2R5IiwiZGF0ZV9zdGFydCIsImRhdGVfZW5kIiwiYW1vdW50X3ZvdWNoZXIiLCJ2b3VjaGVycyIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsInBhcnNlSW50IiwiYnVsa0NyZWF0ZSIsInZvdWNoZXJzY2hlZHVsZSIsImdldFNjaGVkdWxlIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJnZXRWb3VjaGVySHV0aW5nIiwiX2NhbGxlZTgiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJsaXRlcmFsIiwibGltaXQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvdm91Y2hlci92b3VjaGVyLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCJcbmNvbnN0IHsgT3AsIFNlcXVlbGl6ZSB9ID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcblxuY29uc3QgZ2VuZXJhdGVWb3VjaGVyID0oKT0+IHtcbiAgICBjb25zdCBtaW4gPSAyO1xuICAgIGNvbnN0IG1heCA9IDIwO1xuICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gICAgY29uc3Qgdm91Y2hlclZhbHVlID0gcmFuZG9tTnVtYmVyICogNTAwMDtcblxuICAgIGNvbnN0IGV4cGlyZURhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIC8vIFRow6ptIDMwIG5nw6B5IHbDoG8gbmfDoHkgaGnhu4duIHThuqFpIMSR4buDIHThuqFvIGV4cGlyZSBkYXRlXG4gICAgZXhwaXJlRGF0ZS5zZXREYXRlKGV4cGlyZURhdGUuZ2V0RGF0ZSgpICsgMzApO1xuXG4gICAgY29uc3QgY29kZSA9IGdlbmVyYXRlQ29kZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRpc2NvdW50OiB2b3VjaGVyVmFsdWUsXG4gICAgICBleHBpcmU6IGV4cGlyZURhdGUudG9JU09TdHJpbmcoKSxcbiAgICAgIGNvZGU6IGNvZGVcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUNvZGUoKSB7XG4gICAgLy8gVOG6oW8gbeG7mXQgbcOjIGNvZGUgbmfhuqt1IG5oacOqbiwgdsOtIGThu6U6IEFCQ0QxMjM0XG4gICAgY29uc3QgY2hhcmFjdGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjEyMzQ1Njc4OTAnO1xuICAgIGxldCBjb2RlID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgIGNvZGUgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVycy5sZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGU7XG4gIH1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzeW5jIGdldEFsbFZvdWNoZXIocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3Qgdm91Y2hlckxpc3Q9IGF3YWl0IGRiLnZvdWNoZXIuZmluZEFsbCh7XG4gICAgICAgICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZSwgZGF0YTogdm91Y2hlckxpc3R9KVxuICAgIH0sXG4gICAgYXN5bmMgY3JlYXRlVm91Y2hlcihyZXEsIHJlcykge1xuICAgICAgICBhd2FpdCBkYi52b3VjaGVyLmNyZWF0ZSh7XG4gICAgICAgICAgICAuLi5yZXEuYm9keVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe29rOiB0cnVlfSlcbiAgICB9LFxuICAgIGFzeW5jIGRlbGV0ZVZvdWNoZXIocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3Qge3ZvdWNoZXJJZCB9PSByZXEuYm9keVxuICAgICAgICBhd2FpdCBkYi52b3VjaGVyLmRlc3Ryb3koe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBpZDogdm91Y2hlcklkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZX0pXG4gICAgfSxcbiAgICBhc3luYyBkZXRhaWxWb3VjaGVyKHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IHt2b3VjaGVySWQgfT0gcmVxLnF1ZXJ5XG4gICAgICAgIGNvbnN0IGRhdGE9IGF3YWl0IGRiLnZvdWNoZXIuZmluZE9uZSh7XG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIGlkOiB2b3VjaGVySWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZSwgZGF0YX0pXG4gICAgfSxcbiAgICBhc3luYyBhcHBseVZvdWNoZXIocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3Qge3VpZCB9PSByZXEudXNlclxuICAgICAgICBjb25zdCB7Y29kZSB9PSByZXEuYm9keVxuICAgICAgICBjb25zdCBkYXRhPSBhd2FpdCBkYi52b3VjaGVyLmZpbmRPbmUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGExPSBhd2FpdCBkYi52b3VjaGVyY3VzdG9tZXIuZmluZE9uZSh7d2hlcmU6IHt2b3VjaGVySWQ6IGRhdGEuaWQsIGN1c3RvbWVySWQ6IHVpZH19KVxuICAgICAgICAgICAgaWYoZGF0YTEuaXNfdXNlPT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IGZhbHNlLCB1c2VkOiB0cnVlfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IHRydWUsIGRhdGE6IHtpZDogZGF0YS5pZH19KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogZmFsc2UsIGRhdGF9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBjcmVhdGVTY2hlZHVsZShyZXEsIHJlcykge1xuICAgICAgICBjb25zdCB7ZGF0ZV9zdGFydCwgZGF0ZV9lbmQsIGFtb3VudF92b3VjaGVyIH09IHJlcS5ib2R5XG4gICAgICAgIGNvbnN0IHZvdWNoZXJzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyc2VJbnQoYW1vdW50X3ZvdWNoZXIpOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHZvdWNoZXIgPSBnZW5lcmF0ZVZvdWNoZXIoKTtcbiAgICAgICAgICAgIHZvdWNoZXJzLnB1c2godm91Y2hlcik7XG4gICAgICAgICAgfVxuICAgICAgICBkYi52b3VjaGVyLmJ1bGtDcmVhdGUodm91Y2hlcnMpXG4gICAgICAgIGRiLnZvdWNoZXJzY2hlZHVsZS5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0ZV9zdGFydCwgZGF0ZV9lbmQsIGFtb3VudF92b3VjaGVyXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IHRydWV9KVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0U2NoZWR1bGUocmVxLCByZXMpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGRhdGE9IGF3YWl0IGRiLnZvdWNoZXJzY2hlZHVsZS5maW5kT25lKClcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZSwgZGF0YX0pXG4gICAgfSxcbiAgICBhc3luYyBnZXRWb3VjaGVySHV0aW5nKHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IGRhdGExPSBhd2FpdCBkYi52b3VjaGVyc2NoZWR1bGUuZmluZE9uZSgpXG4gICAgICAgIGNvbnN0IGRhdGE9IGF3YWl0IGRiLnZvdWNoZXIuZmluZEFsbCh7XG4gICAgICAgICAgICBvcmRlcjogU2VxdWVsaXplLmxpdGVyYWwoJ1JBTkQoKScpLFxuICAgICAgICAgICAgbGltaXQ6IGRhdGExPy5hbW91bnRfdm91Y2hlciB8fCAwXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7b2s6IHRydWUsIGRhdGF9KVxuICAgIH1cbn0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFBb0MsU0FBQUMsUUFBQUMsTUFBQSxFQUFBQyxjQUFBLFFBQUFDLElBQUEsR0FBQUMsTUFBQSxDQUFBRCxJQUFBLENBQUFGLE1BQUEsT0FBQUcsTUFBQSxDQUFBQyxxQkFBQSxRQUFBQyxPQUFBLEdBQUFGLE1BQUEsQ0FBQUMscUJBQUEsQ0FBQUosTUFBQSxHQUFBQyxjQUFBLEtBQUFJLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxNQUFBLFdBQUFDLEdBQUEsV0FBQUosTUFBQSxDQUFBSyx3QkFBQSxDQUFBUixNQUFBLEVBQUFPLEdBQUEsRUFBQUUsVUFBQSxPQUFBUCxJQUFBLENBQUFRLElBQUEsQ0FBQUMsS0FBQSxDQUFBVCxJQUFBLEVBQUFHLE9BQUEsWUFBQUgsSUFBQTtBQUFBLFNBQUFVLGNB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