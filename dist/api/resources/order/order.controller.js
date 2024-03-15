"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mailer = _interopRequireDefault(require("../../../mailer"));
var _models = require("../../../models");
var Sequelize = require("sequelize");
var _default = {
  index: function index(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _req$body, customerId, paymentmethod, orderId, deliveryAddress, product, grandTotal, voucherId, deliveryCharge, reason;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, customerId = _req$body.customerId, paymentmethod = _req$body.paymentmethod, orderId = _req$body.orderId, deliveryAddress = _req$body.deliveryAddress, product = _req$body.product, grandTotal = _req$body.grandTotal, voucherId = _req$body.voucherId, deliveryCharge = _req$body.deliveryCharge, reason = _req$body.reason;
            console.log(voucherId);
            _models.db.customer.findOne({
              where: {
                id: customerId
              }
            }).then(function (p) {
              if (p) {
                return _models.db.Order.create({
                  custId: customerId,
                  number: orderId,
                  grandtotal: grandTotal,
                  paymentmethod: paymentmethod,
                  voucherId: voucherId || 0,
                  deliveryFee: deliveryCharge,
                  reason: reason || ""
                });
              }
              return res.status(500).json({
                'errors': ['User is not found']
              });
            }).then(function (order) {
              if (order) {
                return _models.db.Address.create({
                  orderId: order.id,
                  custId: customerId,
                  fullname: deliveryAddress ? deliveryAddress.name : '',
                  phone: deliveryAddress ? deliveryAddress.phone : '',
                  discrict: deliveryAddress ? deliveryAddress.discrict : '',
                  city: deliveryAddress ? deliveryAddress.city : '',
                  states: deliveryAddress ? deliveryAddress.states : '',
                  shipping: deliveryAddress ? deliveryAddress.address : ''
                }).then(function (p) {
                  return [order, p];
                });
              }
            }).then(function (_ref) {
              var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
                order = _ref2[0],
                p = _ref2[1];
              if (order) {
                var cartEntries = [];
                for (var i = 0; i < product.length; i++) {
                  cartEntries.push({
                    orderId: order.id,
                    addressId: p.id,
                    productId: product[i].id,
                    name: product[i].name,
                    qty: product[i].qty,
                    price: product[i].price,
                    total: product[i].total,
                    photo: product[i].photo,
                    discount: product[i].discountPer
                  });
                }
                return _models.db.Cart.bulkCreate(cartEntries).then(function (r) {
                  return [r];
                });
              }
            }).then(function (success) {
              _mailer["default"].sendUserOrder((deliveryAddress === null || deliveryAddress === void 0 ? void 0 : deliveryAddress.email) || "", "You have ordered successfully, ordered at " + new Date());
              res.status(200).json({
                'success': true
              });
            })["catch"](function (err) {
              _mailer["default"].sendUserOrder((deliveryAddress === null || deliveryAddress === void 0 ? void 0 : deliveryAddress.email) || "", "You have ordered failed, ordered at " + new Date());
              console.log(err);
              res.status(500).json({
                'errors': ['Error adding cart']
              });
            });
            _context.next = 9;
            break;
          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            throw new RequestError('Error');
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 6]]);
    }))();
  },
  getAllOrderList: function getAllOrderList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var limit, sort, offset, page;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            limit = 10;
            sort = ['createdAt', 'DESC'];
            offset = 0;
            page = 1;
            if (req.query.limit != undefined) {
              limit = parseInt(req.query.limit);
            }
            if (req.query.page != undefined) {
              page = req.query.page;
              if (page < 1) page = 1;
            }
            if (req.query.sort) {
              if (req.query.sort == 'name') {
                sort = ['name'];
              }
            }
            try {
              _models.db.Order.findAll({
                order: [['createdAt', 'DESC']],
                include: [{
                  model: _models.db.Address
                }, {
                  model: _models.db.Cart
                }]
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  order: list
                });
              })["catch"](function (err) {
                next(err);
              });
            } catch (err) {
              res.status(500).json({
                'errors': "" + err
              });
            }
          case 8:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  statusUpdate: function statusUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$body2, id, status, deliverydate;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            try {
              _req$body2 = req.body, id = _req$body2.id, status = _req$body2.status, deliverydate = _req$body2.deliverydate;
              _models.db.Order.findOne({
                where: {
                  id: id
                }
              }).then(function (list) {
                var _req$body3, _req$body6, _req$body9, _req$body12;
                if (((_req$body3 = req.body) === null || _req$body3 === void 0 ? void 0 : _req$body3.status) === "delieverd") {
                  var _req$body4, _req$body5;
                  _mailer["default"].sendUserOrder(((_req$body4 = req.body) === null || _req$body4 === void 0 ? void 0 : _req$body4.email) || "", "Your #ORDER-".concat(list.number, " have delivered successfully, delivered at ") + ((_req$body5 = req.body) === null || _req$body5 === void 0 ? void 0 : _req$body5.deliverydate));
                }
                if (((_req$body6 = req.body) === null || _req$body6 === void 0 ? void 0 : _req$body6.status) === "processing") {
                  var _req$body7, _req$body8;
                  _mailer["default"].sendUserOrder(((_req$body7 = req.body) === null || _req$body7 === void 0 ? void 0 : _req$body7.email) || "", "Your #ORDER-".concat(list.number, " is processing, delivered at ") + ((_req$body8 = req.body) === null || _req$body8 === void 0 ? void 0 : _req$body8.deliverydate));
                }
                if (((_req$body9 = req.body) === null || _req$body9 === void 0 ? void 0 : _req$body9.status) === "shipping") {
                  var _req$body10, _req$body11;
                  _mailer["default"].sendUserOrder(((_req$body10 = req.body) === null || _req$body10 === void 0 ? void 0 : _req$body10.email) || "", "Your #ORDER-".concat(list.number, " is shipping, shipping at ") + ((_req$body11 = req.body) === null || _req$body11 === void 0 ? void 0 : _req$body11.deliverydate));
                }
                if (((_req$body12 = req.body) === null || _req$body12 === void 0 ? void 0 : _req$body12.status) === "cancel") {
                  var _req$body13, _req$body14, _req$body15;
                  _mailer["default"].sendUserOrder(((_req$body13 = req.body) === null || _req$body13 === void 0 ? void 0 : _req$body13.email) || "", "Your #ORDER-".concat(list.number, " is canceled, reason: ").concat(((_req$body14 = req.body) === null || _req$body14 === void 0 ? void 0 : _req$body14.reason) || "", ", cancel at ") + ((_req$body15 = req.body) === null || _req$body15 === void 0 ? void 0 : _req$body15.deliverydate));
                }
                return _models.db.Order.update({
                  status: status,
                  deliverydate: deliverydate ? deliverydate : list.deliverydate,
                  reason: req.body.reason || ""
                }, {
                  where: {
                    id: id
                  }
                });
              }).then(function (success) {
                res.status(200).json({
                  'success': true,
                  msg: "Successfully Updated Status"
                });
              })["catch"](function (err) {
                next(err);
              });
            } catch (err) {
              res.status(500).json({
                'errors': "" + err
              });
            }
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  getAllOrderListById: function getAllOrderListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            try {
              _models.db.Order.findAll({
                where: {
                  custId: req.body.id
                },
                order: [['createdAt', 'DESC']],
                include: [{
                  model: _models.db.Address,
                  include: [{
                    model: _models.db.Cart,
                    include: [{
                      model: _models.db.product
                    }]
                  }]
                }]
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  order: list
                });
              })["catch"](function (err) {
                next(err);
              });
            } catch (err) {
              res.status(500).json({
                'errors': "" + err
              });
            }
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  },
  getAllOrderStatus: function getAllOrderStatus(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            try {
              _models.db.Order.findAll({
                where: {
                  status: req.body.status
                },
                order: [['createdAt', 'DESC']],
                include: [{
                  model: _models.db.Address,
                  include: [{
                    model: _models.db.Cart
                  }]
                }]
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  order: list
                });
              })["catch"](function (err) {
                next(err);
              });
            } catch (err) {
              res.status(500).json({
                'errors': "" + err
              });
            }
          case 1:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }))();
  },
  getAllOrderCount: function getAllOrderCount(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            try {
              _models.db.Order.findAll({
                attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('status')), 'total']],
                group: ['status']
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  data: list
                });
              })["catch"](function (err) {
                next(err);
              });
            } catch (err) {
              res.status(500).json({
                'errors': "" + err
              });
            }
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbWFpbGVyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfbW9kZWxzIiwiU2VxdWVsaXplIiwiX2RlZmF1bHQiLCJpbmRleCIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiX3JlcSRib2R5IiwiY3VzdG9tZXJJZCIsInBheW1lbnRtZXRob2QiLCJvcmRlcklkIiwiZGVsaXZlcnlBZGRyZXNzIiwicHJvZHVjdCIsImdyYW5kVG90YWwiLCJ2b3VjaGVySWQiLCJkZWxpdmVyeUNoYXJnZSIsInJlYXNvbiIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJib2R5IiwiY29uc29sZSIsImxvZyIsImRiIiwiY3VzdG9tZXIiLCJmaW5kT25lIiwid2hlcmUiLCJpZCIsInRoZW4iLCJwIiwiT3JkZXIiLCJjcmVhdGUiLCJjdXN0SWQiLCJudW1iZXIiLCJncmFuZHRvdGFsIiwiZGVsaXZlcnlGZWUiLCJzdGF0dXMiLCJqc29uIiwib3JkZXIiLCJBZGRyZXNzIiwiZnVsbG5hbWUiLCJuYW1lIiwicGhvbmUiLCJkaXNjcmljdCIsImNpdHkiLCJzdGF0ZXMiLCJzaGlwcGluZyIsImFkZHJlc3MiLCJfcmVmIiwiX3JlZjIiLCJfc2xpY2VkVG9BcnJheTIiLCJjYXJ0RW50cmllcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwiYWRkcmVzc0lkIiwicHJvZHVjdElkIiwicXR5IiwicHJpY2UiLCJ0b3RhbCIsInBob3RvIiwiZGlzY291bnQiLCJkaXNjb3VudFBlciIsIkNhcnQiLCJidWxrQ3JlYXRlIiwiciIsInN1Y2Nlc3MiLCJtYWlsZXIiLCJzZW5kVXNlck9yZGVyIiwiZW1haWwiLCJEYXRlIiwiZXJyIiwidDAiLCJSZXF1ZXN0RXJyb3IiLCJzdG9wIiwiZ2V0QWxsT3JkZXJMaXN0IiwiX2NhbGxlZTIiLCJsaW1pdCIsInNvcnQiLCJvZmZzZXQiLCJwYWdlIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwicXVlcnkiLCJ1bmRlZmluZWQiLCJwYXJzZUludCIsImZpbmRBbGwiLCJpbmNsdWRlIiwibW9kZWwiLCJsaXN0Iiwic3RhdHVzVXBkYXRlIiwiX2NhbGxlZTMiLCJfcmVxJGJvZHkyIiwiZGVsaXZlcnlkYXRlIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiX3JlcSRib2R5MyIsIl9yZXEkYm9keTYiLCJfcmVxJGJvZHk5IiwiX3JlcSRib2R5MTIiLCJfcmVxJGJvZHk0IiwiX3JlcSRib2R5NSIsImNvbmNhdCIsIl9yZXEkYm9keTciLCJfcmVxJGJvZHk4IiwiX3JlcSRib2R5MTAiLCJfcmVxJGJvZHkxMSIsIl9yZXEkYm9keTEzIiwiX3JlcSRib2R5MTQiLCJfcmVxJGJvZHkxNSIsInVwZGF0ZSIsIm1zZyIsImdldEFsbE9yZGVyTGlzdEJ5SWQiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsImdldEFsbE9yZGVyU3RhdHVzIiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJnZXRBbGxPcmRlckNvdW50IiwiX2NhbGxlZTYiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJhdHRyaWJ1dGVzIiwiZm4iLCJjb2wiLCJncm91cCIsImRhdGEiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvb3JkZXIvb3JkZXIuY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFpbGVyIGZyb20gJy4uLy4uLy4uL21haWxlcic7XG5pbXBvcnQgeyBkYiB9IGZyb20gJy4uLy4uLy4uL21vZGVscyc7XG52YXIgU2VxdWVsaXplID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIGFzeW5jIGluZGV4KHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGN1c3RvbWVySWQsIHBheW1lbnRtZXRob2QsIG9yZGVySWQsIGRlbGl2ZXJ5QWRkcmVzcywgcHJvZHVjdCwgZ3JhbmRUb3RhbCwgdm91Y2hlcklkLCBkZWxpdmVyeUNoYXJnZSwgcmVhc29uIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZvdWNoZXJJZClcbiAgICAgICAgICAgIGRiLmN1c3RvbWVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogY3VzdG9tZXJJZCB9IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuT3JkZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0SWQ6IGN1c3RvbWVySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyOiBvcmRlcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYW5kdG90YWw6IGdyYW5kVG90YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bWVudG1ldGhvZDogcGF5bWVudG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b3VjaGVySWQ6IHZvdWNoZXJJZCB8fCAwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxpdmVyeUZlZTogZGVsaXZlcnlDaGFyZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhc29uOiByZWFzb24gfHwgXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnZXJyb3JzJzogWydVc2VyIGlzIG5vdCBmb3VuZCddIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKG9yZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLkFkZHJlc3MuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlcklkOiBvcmRlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0SWQ6IGN1c3RvbWVySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsbG5hbWU6IGRlbGl2ZXJ5QWRkcmVzcz9kZWxpdmVyeUFkZHJlc3MubmFtZTonJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaG9uZTogZGVsaXZlcnlBZGRyZXNzP2RlbGl2ZXJ5QWRkcmVzcy5waG9uZTonJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjcmljdDogZGVsaXZlcnlBZGRyZXNzP2RlbGl2ZXJ5QWRkcmVzcy5kaXNjcmljdDonJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5OiBkZWxpdmVyeUFkZHJlc3M/ZGVsaXZlcnlBZGRyZXNzLmNpdHk6JycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVzOiBkZWxpdmVyeUFkZHJlc3M/ZGVsaXZlcnlBZGRyZXNzLnN0YXRlczonJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlwcGluZzogZGVsaXZlcnlBZGRyZXNzP2RlbGl2ZXJ5QWRkcmVzcy5hZGRyZXNzOicnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocCkgPT4gW29yZGVyLCBwXSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKFtvcmRlciwgcF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FydEVudHJpZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvZHVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcnRFbnRyaWVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlcklkOiBvcmRlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzc0lkOiBwLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RbaV0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHByb2R1Y3RbaV0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXR5OiBwcm9kdWN0W2ldLnF0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IHByb2R1Y3RbaV0ucHJpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsOiBwcm9kdWN0W2ldLnRvdGFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaG90bzogcHJvZHVjdFtpXS5waG90byxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzY291bnQ6IHByb2R1Y3RbaV0uZGlzY291bnRQZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLkNhcnQuYnVsa0NyZWF0ZShjYXJ0RW50cmllcykudGhlbigocikgPT4gW3JdKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoc3VjY2VzcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtYWlsZXIuc2VuZFVzZXJPcmRlcihkZWxpdmVyeUFkZHJlc3M/LmVtYWlsIHx8XCJcIiwgXCJZb3UgaGF2ZSBvcmRlcmVkIHN1Y2Nlc3NmdWxseSwgb3JkZXJlZCBhdCBcIisgbmV3IERhdGUoKSlcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBtYWlsZXIuc2VuZFVzZXJPcmRlcihkZWxpdmVyeUFkZHJlc3M/LmVtYWlsIHx8XCJcIiwgXCJZb3UgaGF2ZSBvcmRlcmVkIGZhaWxlZCwgb3JkZXJlZCBhdCBcIisgbmV3IERhdGUoKSlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTsgICBcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnZXJyb3JzJzogWydFcnJvciBhZGRpbmcgY2FydCddIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0QWxsT3JkZXJMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIGxldCBsaW1pdCA9IDEwO1xuICAgICAgICBsZXQgc29ydCA9IFsnY3JlYXRlZEF0JywgJ0RFU0MnXTtcbiAgICAgICAgbGV0IG9mZnNldCA9IDA7XG4gICAgICAgIGxldCBwYWdlID0gMTtcbiAgICAgICAgaWYocmVxLnF1ZXJ5LmxpbWl0ICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBsaW1pdCA9IHBhcnNlSW50KHJlcS5xdWVyeS5saW1pdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYocmVxLnF1ZXJ5LnBhZ2UgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHBhZ2UgPSByZXEucXVlcnkucGFnZTtcbiAgICAgICAgICAgIGlmKHBhZ2UgPCAxKVxuICAgICAgICAgICAgICAgIHBhZ2UgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmKHJlcS5xdWVyeS5zb3J0KXtcbiAgICAgICAgICAgIGlmKHJlcS5xdWVyeS5zb3J0ID09ICduYW1lJyl7XG4gICAgICAgICAgICAgICAgc29ydCA9IFsnbmFtZSddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGRiLk9yZGVyLmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuQWRkcmVzcyB9LCB7IG1vZGVsOiBkYi5DYXJ0IH1dLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG9yZGVyOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnZXJyb3JzJzogXCJcIiArIGVyciB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBzdGF0dXNVcGRhdGUocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaWQsIHN0YXR1cywgZGVsaXZlcnlkYXRlIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIGRiLk9yZGVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogaWQgfSB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXEuYm9keT8uc3RhdHVzPT09IFwiZGVsaWV2ZXJkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haWxlci5zZW5kVXNlck9yZGVyKHJlcS5ib2R5Py5lbWFpbCB8fFwiXCIsIGBZb3VyICNPUkRFUi0ke2xpc3QubnVtYmVyfSBoYXZlIGRlbGl2ZXJlZCBzdWNjZXNzZnVsbHksIGRlbGl2ZXJlZCBhdCBgKyByZXEuYm9keT8uZGVsaXZlcnlkYXRlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcS5ib2R5Py5zdGF0dXM9PT0gXCJwcm9jZXNzaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haWxlci5zZW5kVXNlck9yZGVyKHJlcS5ib2R5Py5lbWFpbCB8fFwiXCIsIGBZb3VyICNPUkRFUi0ke2xpc3QubnVtYmVyfSBpcyBwcm9jZXNzaW5nLCBkZWxpdmVyZWQgYXQgYCsgcmVxLmJvZHk/LmRlbGl2ZXJ5ZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihyZXEuYm9keT8uc3RhdHVzPT09IFwic2hpcHBpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbGVyLnNlbmRVc2VyT3JkZXIocmVxLmJvZHk/LmVtYWlsIHx8XCJcIiwgYFlvdXIgI09SREVSLSR7bGlzdC5udW1iZXJ9IGlzIHNoaXBwaW5nLCBzaGlwcGluZyBhdCBgKyByZXEuYm9keT8uZGVsaXZlcnlkYXRlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcS5ib2R5Py5zdGF0dXM9PT0gXCJjYW5jZWxcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbGVyLnNlbmRVc2VyT3JkZXIocmVxLmJvZHk/LmVtYWlsIHx8XCJcIiwgYFlvdXIgI09SREVSLSR7bGlzdC5udW1iZXJ9IGlzIGNhbmNlbGVkLCByZWFzb246ICR7cmVxLmJvZHk/LnJlYXNvbiB8fCBcIlwifSwgY2FuY2VsIGF0IGArIHJlcS5ib2R5Py5kZWxpdmVyeWRhdGUpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLk9yZGVyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJ5ZGF0ZTogZGVsaXZlcnlkYXRlID8gZGVsaXZlcnlkYXRlIDogbGlzdC5kZWxpdmVyeWRhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFzb246IHJlcS5ib2R5LnJlYXNvbiB8fCBcIlwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoc3VjY2VzcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgVXBkYXRlZCBTdGF0dXNcIiB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ2Vycm9ycyc6IFwiXCIgKyBlcnIgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0QWxsT3JkZXJMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIuT3JkZXIuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgY3VzdElkOiByZXEuYm9keS5pZCB9LFxuICAgICAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuQWRkcmVzcywgaW5jbHVkZTogW3sgbW9kZWw6IGRiLkNhcnQsIGluY2x1ZGU6IFt7bW9kZWw6IGRiLnByb2R1Y3R9XSB9XSB9XSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBvcmRlcjogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ2Vycm9ycyc6IFwiXCIgKyBlcnIgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGdldEFsbE9yZGVyU3RhdHVzKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5PcmRlci5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBzdGF0dXM6IHJlcS5ib2R5LnN0YXR1cyB9LFxuICAgICAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuQWRkcmVzcywgaW5jbHVkZTogW3sgbW9kZWw6IGRiLkNhcnQgfV0gfV0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgb3JkZXI6IGxpc3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdlcnJvcnMnOiBcIlwiICsgZXJyIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBnZXRBbGxPcmRlckNvdW50KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5PcmRlci5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbJ3N0YXR1cycsIFtTZXF1ZWxpemUuZm4oJ0NPVU5UJywgU2VxdWVsaXplLmNvbCgnc3RhdHVzJykpLCAndG90YWwnXV0sXG4gICAgICAgICAgICAgICAgZ3JvdXA6IFsnc3RhdHVzJ11cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnZXJyb3JzJzogXCJcIiArIGVyciB9KTtcbiAgICAgICAgfVxuICAgIH0sXG59XG5cblxuIl0sIm1hcHBp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