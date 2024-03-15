"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../../../models");
var _razorpay = _interopRequireDefault(require("razorpay"));
var _default = {
  orderDetails: function orderDetails(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var instance, _req$body, order_id, amount, payment_capture, currency, options, order;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            instance = new _razorpay["default"]({
              key_id: 'rzp_live_VHO6uZelazZ0VR',
              key_secret: 'QoeuInxjN8I5EDJ46O4fsPHz'
              // key_id: 'rzp_test_gJ29s3lexhVYEm',
              // key_secret: 'PzSyLipuA0yMPjWLy4a8QgzV',
            });
            _req$body = req.body, order_id = _req$body.order_id, amount = _req$body.amount, payment_capture = _req$body.payment_capture, currency = _req$body.currency;
            _context.prev = 2;
            options = {
              amount: amount * 100,
              // amount in smallest currency unit
              currency: currency,
              receipt: order_id,
              payment_capture: payment_capture
            };
            _context.next = 6;
            return instance.orders.create(options);
          case 6:
            order = _context.sent;
            if (order) {
              _context.next = 9;
              break;
            }
            return _context.abrupt("return", res.status(500).send("Some error occured"));
          case 9:
            res.status(200).json({
              'success': true,
              data: order
            });
            _context.next = 15;
            break;
          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", res.status(500).json({
              message: "Something error's"
            }));
          case 15:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[2, 12]]);
    }))();
  },
  // async paymentSuccess(req, res, next) {
  //     try {
  //         const secret = '12345678'
  //         const crypto = require('crypto')
  //         const shasum = crypto.createHmac('sha256', secret)
  //         shasum.update(JSON.stringify(req.body))
  //         const digest = shasum.digest('hex')
  //         if (digest === req.headers['x-razorpay-signature']) {
  //             // process it
  //             let value = req.body.payload.payment.entity;
  //             return db.payment.create({
  //                 paymentId: value.id,
  //                 currency: value.currency,
  //                 status: value.status,
  //                 amount: (value.amount)/100,
  //                 order_id: value.order_id,
  //                 method: value.method,
  //             })
  //             .then(payment=>{
  //                 res.status(200).json({ 'success': true });     
  //             })
  //         } else {
  //             // pass it
  //         }
  //         res.json({ status: 'ok'})
  //     }
  //     catch (err) {
  //         return res.status(500).json({
  //             message: "Something error's"
  //         })
  //     }
  // },
  findOrderList: function findOrderList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var instance, _req$body2, orderCreationId, razorpayPaymentId, razorpayOrderId, custId;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            instance = new _razorpay["default"]({
              key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_VHO6uZelazZ0VR',
              key_secret: process.env.RAZORPAY_SECRET || 'QoeuInxjN8I5EDJ46O4fsPHz'
            });
            _context2.prev = 1;
            _req$body2 = req.body, orderCreationId = _req$body2.orderCreationId, razorpayPaymentId = _req$body2.razorpayPaymentId, razorpayOrderId = _req$body2.razorpayOrderId, custId = _req$body2.custId; // console.log(req.body)
            _context2.next = 5;
            return instance.payments.fetch(razorpayPaymentId).then(function (order) {
              console.log("---order---", order);
              if (order) {
                return _models.db.payment.create({
                  custId: custId,
                  amount: order.amount / 100,
                  orderCreationId: orderCreationId,
                  razorpayPaymentId: razorpayPaymentId,
                  razorpayOrderId: razorpayOrderId,
                  currency: order.currency,
                  status: order.status,
                  method: order.method
                }).then(function (r) {
                  return [order, r];
                });
              }
            }).then(function (_ref) {
              var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
                order = _ref2[0],
                r = _ref2[1];
              res.status(200).json({
                success: true,
                data: order
              });
            });
          case 5:
            _context2.next = 10;
            break;
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", res.status(500).json({
              message: "Something error's"
            }));
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 7]]);
    }))();
  },
  getAllPayment: function getAllPayment(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _models.db.payment.findAll({
              include: [{
                model: _models.db.customer
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context3.next = 7;
            break;
          case 4:
            _context3.prev = 4;
            _context3.t0 = _context3["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 4]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9yYXpvcnBheSIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfZGVmYXVsdCIsIm9yZGVyRGV0YWlscyIsInJlcSIsInJlcyIsIm5leHQiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsImluc3RhbmNlIiwiX3JlcSRib2R5Iiwib3JkZXJfaWQiLCJhbW91bnQiLCJwYXltZW50X2NhcHR1cmUiLCJjdXJyZW5jeSIsIm9wdGlvbnMiLCJvcmRlciIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIlJhem9ycGF5Iiwia2V5X2lkIiwia2V5X3NlY3JldCIsImJvZHkiLCJyZWNlaXB0Iiwib3JkZXJzIiwiY3JlYXRlIiwic2VudCIsImFicnVwdCIsInN0YXR1cyIsInNlbmQiLCJqc29uIiwiZGF0YSIsInQwIiwibWVzc2FnZSIsInN0b3AiLCJmaW5kT3JkZXJMaXN0IiwiX2NhbGxlZTIiLCJfcmVxJGJvZHkyIiwib3JkZXJDcmVhdGlvbklkIiwicmF6b3JwYXlQYXltZW50SWQiLCJyYXpvcnBheU9yZGVySWQiLCJjdXN0SWQiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJwcm9jZXNzIiwiZW52IiwiUkFaT1JQQVlfS0VZX0lEIiwiUkFaT1JQQVlfU0VDUkVUIiwicGF5bWVudHMiLCJmZXRjaCIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZGIiLCJwYXltZW50IiwibWV0aG9kIiwiciIsIl9yZWYiLCJfcmVmMiIsIl9zbGljZWRUb0FycmF5MiIsInN1Y2Nlc3MiLCJnZXRBbGxQYXltZW50IiwiX2NhbGxlZTMiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJmaW5kQWxsIiwiaW5jbHVkZSIsIm1vZGVsIiwiY3VzdG9tZXIiLCJsaXN0IiwiZXJyIiwiUmVxdWVzdEVycm9yIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3BheW1lbnQvcGF5bWVudC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzJztcbmltcG9ydCBSYXpvcnBheSBmcm9tICdyYXpvcnBheSdcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgYXN5bmMgb3JkZXJEZXRhaWxzKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFJhem9ycGF5KHtcbiAgICAgICAgICAgIGtleV9pZDogICdyenBfbGl2ZV9WSE82dVplbGF6WjBWUicsXG4gICAgICAgICAgICBrZXlfc2VjcmV0OiAnUW9ldUlueGpOOEk1RURKNDZPNGZzUEh6JyxcbiAgICAgICAgICAgIC8vIGtleV9pZDogJ3J6cF90ZXN0X2dKMjlzM2xleGhWWUVtJyxcbiAgICAgICAgICAgIC8vIGtleV9zZWNyZXQ6ICdQelN5TGlwdUEweU1QaldMeTRhOFFnelYnLFxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgeyBvcmRlcl9pZCwgYW1vdW50LCBwYXltZW50X2NhcHR1cmUsIGN1cnJlbmN5IH0gPSByZXEuYm9keTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBhbW91bnQ6IGFtb3VudCAqIDEwMCwgLy8gYW1vdW50IGluIHNtYWxsZXN0IGN1cnJlbmN5IHVuaXRcbiAgICAgICAgICAgICAgICBjdXJyZW5jeTogY3VycmVuY3ksXG4gICAgICAgICAgICAgICAgcmVjZWlwdDogb3JkZXJfaWQsXG4gICAgICAgICAgICAgICAgcGF5bWVudF9jYXB0dXJlOiBwYXltZW50X2NhcHR1cmVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IG9yZGVyID0gYXdhaXQgaW5zdGFuY2Uub3JkZXJzLmNyZWF0ZShvcHRpb25zKTtcbiAgICAgICAgICAgIGlmICghb3JkZXIpIHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZChcIlNvbWUgZXJyb3Igb2NjdXJlZFwiKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBvcmRlciB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiU29tZXRoaW5nIGVycm9yJ3NcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBhc3luYyBwYXltZW50U3VjY2VzcyhyZXEsIHJlcywgbmV4dCkge1xuICAgIC8vICAgICB0cnkge1xuICAgIC8vICAgICAgICAgY29uc3Qgc2VjcmV0ID0gJzEyMzQ1Njc4J1xuICAgIC8vICAgICAgICAgY29uc3QgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJylcbiAgICAvLyAgICAgICAgIGNvbnN0IHNoYXN1bSA9IGNyeXB0by5jcmVhdGVIbWFjKCdzaGEyNTYnLCBzZWNyZXQpXG4gICAgLy8gICAgICAgICBzaGFzdW0udXBkYXRlKEpTT04uc3RyaW5naWZ5KHJlcS5ib2R5KSlcbiAgICAvLyAgICAgICAgIGNvbnN0IGRpZ2VzdCA9IHNoYXN1bS5kaWdlc3QoJ2hleCcpXG4gICAgLy8gICAgICAgICBpZiAoZGlnZXN0ID09PSByZXEuaGVhZGVyc1sneC1yYXpvcnBheS1zaWduYXR1cmUnXSkge1xuICAgIC8vICAgICAgICAgICAgIC8vIHByb2Nlc3MgaXRcbiAgICAvLyAgICAgICAgICAgICBsZXQgdmFsdWUgPSByZXEuYm9keS5wYXlsb2FkLnBheW1lbnQuZW50aXR5O1xuICAgIC8vICAgICAgICAgICAgIHJldHVybiBkYi5wYXltZW50LmNyZWF0ZSh7XG4gICAgLy8gICAgICAgICAgICAgICAgIHBheW1lbnRJZDogdmFsdWUuaWQsXG4gICAgLy8gICAgICAgICAgICAgICAgIGN1cnJlbmN5OiB2YWx1ZS5jdXJyZW5jeSxcbiAgICAvLyAgICAgICAgICAgICAgICAgc3RhdHVzOiB2YWx1ZS5zdGF0dXMsXG4gICAgLy8gICAgICAgICAgICAgICAgIGFtb3VudDogKHZhbHVlLmFtb3VudCkvMTAwLFxuICAgIC8vICAgICAgICAgICAgICAgICBvcmRlcl9pZDogdmFsdWUub3JkZXJfaWQsXG4gICAgLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogdmFsdWUubWV0aG9kLFxuICAgIC8vICAgICAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICAgICAgLnRoZW4ocGF5bWVudD0+e1xuICAgIC8vICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSB9KTsgICAgIFxuICAgIC8vICAgICAgICAgICAgIH0pXG5cbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICAgICAgLy8gcGFzcyBpdFxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgcmVzLmpzb24oeyBzdGF0dXM6ICdvayd9KVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGNhdGNoIChlcnIpIHtcbiAgICAvLyAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgLy8gICAgICAgICAgICAgbWVzc2FnZTogXCJTb21ldGhpbmcgZXJyb3Inc1wiXG4gICAgLy8gICAgICAgICB9KVxuICAgIC8vICAgICB9XG4gICAgLy8gfSxcblxuICAgIGFzeW5jIGZpbmRPcmRlckxpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgUmF6b3JwYXkoe1xuICAgICAgICAgICAga2V5X2lkOiBwcm9jZXNzLmVudi5SQVpPUlBBWV9LRVlfSUQgfHwgJ3J6cF9saXZlX1ZITzZ1WmVsYXpaMFZSJyxcbiAgICAgICAgICAgIGtleV9zZWNyZXQ6IHByb2Nlc3MuZW52LlJBWk9SUEFZX1NFQ1JFVCB8fCAnUW9ldUlueGpOOEk1RURKNDZPNGZzUEh6JyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgeyBvcmRlckNyZWF0aW9uSWQsIHJhem9ycGF5UGF5bWVudElkLCByYXpvcnBheU9yZGVySWQsIGN1c3RJZCB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXEuYm9keSlcbiAgICAgICAgICAgIGF3YWl0IGluc3RhbmNlLnBheW1lbnRzLmZldGNoKHJhem9ycGF5UGF5bWVudElkKVxuICAgICAgICAgICAgICAgIC50aGVuKG9yZGVyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS1vcmRlci0tLVwiLCBvcmRlcilcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIucGF5bWVudC5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RJZDogY3VzdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogb3JkZXIuYW1vdW50IC8gMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyQ3JlYXRpb25JZDogb3JkZXJDcmVhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhem9ycGF5UGF5bWVudElkOiByYXpvcnBheVBheW1lbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXpvcnBheU9yZGVySWQ6IHJhem9ycGF5T3JkZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeTogb3JkZXIuY3VycmVuY3ksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBvcmRlci5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBvcmRlci5tZXRob2QsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKHIgPT4gW29yZGVyLCByXSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKFtvcmRlciwgcl0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBvcmRlciB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJTb21ldGhpbmcgZXJyb3Inc1wiXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGdldEFsbFBheW1lbnQocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLnBheW1lbnQuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmN1c3RvbWVyIH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbn1cblxuXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFDQSxJQUFB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