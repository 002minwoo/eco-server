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
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _mailer = _interopRequireDefault(require("../../../mailer"));
var _config = _interopRequireDefault(require("../../../config"));
var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));
var _speakeasy = _interopRequireDefault(require("speakeasy"));
var _functions = require("./../../../functions");
var _sequelize = require("sequelize");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var JWTSign = function JWTSign(user, date) {
  return _jsonwebtoken["default"].sign({
    // iss: config.app.name,
    sub: user.id,
    iam: user.type,
    iat: date.getTime(),
    exp: new Date().setMinutes(date.getMinutes() + 30)
  }, process.env.JWT_SECRET);
};
function generateOtp() {
  var token = _speakeasy["default"].totp({
    secret: process.env.OTP_KEY,
    encoding: 'base32',
    step: 30 - Math.floor(new Date().getTime() / 1000.0 % 30)
  });
  return token;
}
function verifyOtp(token) {
  var expiry = _speakeasy["default"].totp.verify({
    secret: process.env.OTP_KEY,
    encoding: 'base32',
    token: token,
    step: 30 - Math.floor(new Date().getTime() / 1000.0 % 30),
    window: 0
  });
  return expiry;
}
var _default = {
  addUser: function addUser(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _req$body, firstName, lastName, phone, email, address, password, passwordHash;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, phone = _req$body.phone, email = _req$body.email, address = _req$body.address, password = _req$body.password;
            passwordHash = _bcryptNodejs["default"].hashSync(password); // var token = generateOtp();
            // var otp = verifyOtp(token);
            _models.db.customer.findOne({
              where: {
                email: email
              },
              paranoid: false
            }).then(function (find) {
              if (find) {
                return res.status(409).json("Email is already in use");
              }
              _models.db.customer.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
                password: passwordHash
              });
              return res.status(200).json({
                "success": true
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  findUser: function findUser(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _models.db.customer.findOne({
              where: {
                email: req.query.email
              },
              paranoid: false,
              include: [{
                model: _models.db.Address
              }]
            }).then(function (user) {
              if (user) {
                return res.status(200).json({
                  success: true,
                  data: user
                });
              } else res.status(500).json({
                'success': false
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  login: function login(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$body2, email, password, findUser, token;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // var date = new Date();
            _context3.next = 3;
            return _models.db.customer.findOne({
              where: {
                email: email
              }
            });
          case 3:
            findUser = _context3.sent;
            console.log("email", email);
            console.log("findUser", findUser);
            if (!findUser) {
              _context3.next = 12;
              break;
            }
            token = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id
            }, process.env.JWT_SECRET);
            console.log(findUser.dataValues.id);
            return _context3.abrupt("return", res.status(200).json({
              success: true,
              token: token,
              findUser: findUser
            }));
          case 12:
            return _context3.abrupt("return", res.status(200).json({
              success: false
            }));
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  rootUserCheck: function rootUserCheck(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            if ((0, _functions.validateEmail)(req.body.email)) {
              _models.db.user.findOne({
                where: {
                  email: req.body.email
                }
              }).then(function (user) {
                if (user) return res.status(200).json({
                  success: true,
                  redirect: false,
                  email: req.body.email
                });
                return res.status(401).json({
                  success: false,
                  redirect: false,
                  msg: "Jankpur Grocerry account with that sign-in information does not exist. Try again or create a new account."
                });
              });
            }
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  },
  sendReset: function sendReset(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var email;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            email = req.body.email;
            _mailer["default"].sendResetPassword(email).then(function (r) {
              return res.status(200).json({
                success: true
              });
            })["catch"](function (err) {
              console.log(err);
              return res.status(500).json({
                errors: ['Error Sending Email!']
              });
            });
          case 2:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }))();
  },
  resetPassword: function resetPassword(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var _req$body3, email, verificationCode, password;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _req$body3 = req.body, email = _req$body3.email, verificationCode = _req$body3.verificationCode, password = _req$body3.password;
            _models.db.user.findOne({
              where: {
                email: email,
                verf_key: verificationCode
              }
            }).then(function (result) {
              if (result) {
                var hash = _bcryptNodejs["default"].hashSync(password);
                _models.db.user.update({
                  password: hash,
                  verf_key: null,
                  attempt: 0,
                  isVerify: 1
                }, {
                  where: {
                    email: email
                  }
                });
                return res.status(200).json({
                  success: true
                });
              } else {
                return res.status(500).json({
                  errors: ['Invalid verification code!']
                });
              }
            })["catch"](function (err) {
              console.log(err);
              return res.status(500).json({
                errors: ['Error Updating Password!']
              });
            });
          case 2:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }))();
  },
  getAllCustomer: function getAllCustomer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _models.db.customer.findAll().then(function (user) {
              if (user) {
                return res.status(200).json({
                  success: true,
                  data: user
                });
              } else res.status(500).json({
                'success': false
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
          case 1:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))();
  },
  deleteCustomer: function deleteCustomer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _models.db.customer.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (customer) {
              if (customer) {
                return _models.db.customer.destroy({
                  where: {
                    id: customer.id
                  }
                });
              }
              throw new RequestError('Customer is not found');
            }).then(function (re) {
              return res.status(200).json({
                'msg': 'success',
                'status': "deleted Customer Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context8.next = 7;
            break;
          case 4:
            _context8.prev = 4;
            _context8.t0 = _context8["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 4]]);
    }))();
  },
  //Api customer update 
  getCustomerUpdate: function getCustomerUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var _req$body$data, id, firstName, lastName, phone, gender;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _req$body$data = req.body.data, id = _req$body$data.id, firstName = _req$body$data.firstName, lastName = _req$body$data.lastName, phone = _req$body$data.phone, gender = _req$body$data.gender;
            _models.db.customer.findOne({
              where: {
                id: id
              }
            }).then(function (customer) {
              if (customer) {
                return _models.db.customer.update({
                  firstName: firstName,
                  lastName: lastName,
                  phone: phone,
                  gender: gender
                }, {
                  where: {
                    id: customer.id
                  }
                });
              }
              throw new RequestError('Customer is not found');
            }).then(function (re) {
              return res.status(200).json({
                'msg': 'success',
                'status': "deleted Customer Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context9.next = 8;
            break;
          case 5:
            _context9.prev = 5;
            _context9.t0 = _context9["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 5]]);
    }))();
  },
  getVoucherCustomer: function getVoucherCustomer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var id;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            console.log(req.user);
            id = req.body.id;
            _models.db.vouchercustomer.findAll({
              where: {
                customerId: id
              }
            }).then(function (data) {
              return res.status(200).json({
                ok: true,
                data: data
              });
            })["catch"](function (e) {
              return next(e);
            });
          case 3:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    }))();
  },
  getVoucherCustomer2: function getVoucherCustomer2(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var uid, email, data;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            console.log(req.user);
            uid = req.user.uid;
            email = req.query.email;
            _context11.next = 5;
            return _models.db.sequelize.query("SELECT vouchers.*, vouchercustomers.is_use AS is_use FROM vouchers INNER JOIN vouchercustomers ON vouchercustomers.voucherId = vouchers.id INNER JOIN customers ON customers.id = vouchercustomers.customerId WHERE customers.id= ".concat(uid)).then(function (data) {
              return res.status(200).json({
                ok: true,
                data: data
              });
            })["catch"](function (e) {
              return next(e);
            });
          case 5:
            data = _context11.sent;
          case 6:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    }))();
  },
  postVoucherCustomer: function postVoucherCustomer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var uid, voucherId;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            uid = req.user.uid;
            voucherId = req.body.voucherId;
            _models.db.vouchercustomer.create(_objectSpread(_objectSpread({}, req.body), {}, {
              customerId: uid,
              is_use: false
            }));
            return _context12.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 4:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    }))();
  },
  putVoucherCustomer: function putVoucherCustomer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var uid, voucherId;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            uid = req.user.uid;
            voucherId = req.body.voucherId;
            _models.db.vouchercustomer.update({
              is_use: true
            }, {
              where: {
                voucherId: voucherId,
                customerId: uid
              }
            });
            return _context13.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 4:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    }))();
  },
  deleteVoucherCustomer: function deleteVoucherCustomer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var uid, voucherId;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            uid = req.user.uid;
            voucherId = req.body.voucherId;
            _models.db.vouchercustomer.destroy({
              where: _objectSpread(_objectSpread({}, req.body), {}, {
                customerId: uid
              })
            });
            return _context14.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 4:
          case "end":
            return _context14.stop();
        }
      }, _callee14);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9mdW5jdGlvbnMiLCJfc2VxdWVsaXplIiwib3duS2V5cyIsIm9iamVjdCIsImVudW1lcmFibGVPbmx5Iiwia2V5cyIsIk9iamVjdCIsImdldE93blByb3BlcnR5U3ltYm9scyIsInN5bWJvbHMiLCJmaWx0ZXIiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwicHVzaCIsImFwcGx5IiwiX29iamVjdFNwcmVhZCIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJmb3JFYWNoIiwia2V5IiwiX2RlZmluZVByb3BlcnR5MiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydHkiLCJKV1RTaWduIiwidXNlciIsImRhdGUiLCJKV1QiLCJzaWduIiwic3ViIiwiaWQiLCJpYW0iLCJ0eXBlIiwiaWF0IiwiZ2V0VGltZSIsImV4cCIsIkRhdGUiLCJzZXRNaW51dGVzIiwiZ2V0TWludXRlcyIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwiZ2VuZXJhdGVPdHAiLCJ0b2tlbiIsInNwZWFrZWFzeSIsInRvdHAiLCJzZWNyZXQiLCJPVFBfS0VZIiwiZW5jb2RpbmciLCJzdGVwIiwiTWF0aCIsImZsb29yIiwidmVyaWZ5T3RwIiwiZXhwaXJ5IiwidmVyaWZ5Iiwid2luZG93IiwiX2RlZmF1bHQiLCJhZGRVc2VyIiwicmVxIiwicmVzIiwibmV4dCIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiX3JlcSRib2R5IiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJwaG9uZSIsImVtYWlsIiwiYWRkcmVzcyIsInBhc3N3b3JkIiwicGFzc3dvcmRIYXNoIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwiYm9keSIsImJjcnlwdCIsImhhc2hTeW5jIiwiZGIiLCJjdXN0b21lciIsImZpbmRPbmUiLCJ3aGVyZSIsInBhcmFub2lkIiwidGhlbiIsImZpbmQiLCJzdGF0dXMiLCJqc29uIiwiY3JlYXRlIiwiZXJyIiwiY29uc29sZSIsImxvZyIsInN0b3AiLCJmaW5kVXNlciIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwicXVlcnkiLCJpbmNsdWRlIiwibW9kZWwiLCJBZGRyZXNzIiwic3VjY2VzcyIsImRhdGEiLCJsb2dpbiIsIl9jYWxsZWUzIiwiX3JlcSRib2R5MiIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInNlbnQiLCJ1aWQiLCJkYXRhVmFsdWVzIiwiYWJydXB0Iiwicm9vdFVzZXJDaGVjayIsIl9jYWxsZWU0IiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwidmFsaWRhdGVFbWFpbCIsInJlZGlyZWN0IiwibXNnIiwic2VuZFJlc2V0IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJtYWlsZXIiLCJzZW5kUmVzZXRQYXNzd29yZCIsInIiLCJlcnJvcnMiLCJyZXNldFBhc3N3b3JkIiwiX2NhbGxlZTYiLCJfcmVxJGJvZHkzIiwidmVyaWZpY2F0aW9uQ29kZSIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsInZlcmZfa2V5IiwicmVzdWx0IiwiaGFzaCIsInVwZGF0ZSIsImF0dGVtcHQiLCJpc1ZlcmlmeSIsImdldEFsbEN1c3RvbWVyIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJmaW5kQWxsIiwiZGVsZXRlQ3VzdG9tZXIiLCJfY2FsbGVlOCIsIl9jYWxsZWU4JCIsIl9jb250ZXh0OCIsInBhcnNlSW50IiwiZGVzdHJveSIsIlJlcXVlc3RFcnJvciIsInJlIiwidDAiLCJnZXRDdXN0b21lclVwZGF0ZSIsIl9jYWxsZWU5IiwiX3JlcSRib2R5JGRhdGEiLCJnZW5kZXIiLCJfY2FsbGVlOSQiLCJfY29udGV4dDkiLCJnZXRWb3VjaGVyQ3VzdG9tZXIiLCJfY2FsbGVlMTAiLCJfY2FsbGVlMTAkIiwiX2NvbnRleHQxMCIsInZvdWNoZXJjdXN0b21lciIsImN1c3RvbWVySWQiLCJvayIsImUiLCJnZXRWb3VjaGVyQ3VzdG9tZXIyIiwiX2NhbGxlZTExIiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTEiLCJzZXF1ZWxpemUiLCJjb25jYXQiLCJwb3N0Vm91Y2hlckN1c3RvbWVyIiwiX2NhbGxlZTEyIiwidm91Y2hlcklkIiwiX2NhbGxlZTEyJCIsIl9jb250ZXh0MTIiLCJpc191c2UiLCJwdXRWb3VjaGVyQ3VzdG9tZXIiLCJfY2FsbGVlMTMiLCJfY2FsbGVlMTMkIiwiX2NvbnRleHQxMyIsImRlbGV0ZVZvdWNoZXJDdXN0b21lciIsIl9jYWxsZWUxNCIsIl9jYWxsZWUxNCQiLCJfY29udGV4dDE0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2N1c3RvbWVyL2N1c3RvbWVyLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMnO1xuaW1wb3J0IEpXVCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IG1haWxlciBmcm9tICcuLi8uLi8uLi9tYWlsZXInO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi8uLi9jb25maWcnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQtbm9kZWpzJztcbmltcG9ydCBzcGVha2Vhc3kgZnJvbSAnc3BlYWtlYXN5JztcbmltcG9ydCB7IHZhbGlkYXRlRW1haWwgfSBmcm9tICcuLy4uLy4uLy4uL2Z1bmN0aW9ucydcbmltcG9ydCB7IFNlcXVlbGl6ZSB9IGZyb20gJ3NlcXVlbGl6ZSc7XG5cbnZhciBKV1RTaWduID0gZnVuY3Rpb24gKHVzZXIsIGRhdGUpIHtcbiAgICByZXR1cm4gSldULnNpZ24oe1xuICAgICAgICAvLyBpc3M6IGNvbmZpZy5hcHAubmFtZSxcbiAgICAgICAgc3ViOiB1c2VyLmlkLFxuICAgICAgICBpYW0gOiB1c2VyLnR5cGUsXG4gICAgICAgIGlhdDogZGF0ZS5nZXRUaW1lKCksXG4gICAgICAgIGV4cDogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApXG4gICAgfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlT3RwKCkge1xuICAgIGxldCB0b2tlbiA9IHNwZWFrZWFzeS50b3RwKHtcbiAgICAgICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxuICAgICAgICBlbmNvZGluZzogJ2Jhc2UzMicsXG4gICAgICAgIHN0ZXA6ICgzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wICUgMzApKSlcbiAgICB9KTtcbiAgICByZXR1cm4gdG9rZW47XG59XG5cbmZ1bmN0aW9uIHZlcmlmeU90cCh0b2tlbikge1xuICAgIGxldCBleHBpcnkgPSBzcGVha2Vhc3kudG90cC52ZXJpZnkoe1xuICAgICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXG4gICAgICAgIGVuY29kaW5nOiAnYmFzZTMyJyxcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICBzdGVwOiAoMzAgLSBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCAlIDMwKSkpLFxuICAgICAgICB3aW5kb3c6IDBcbiAgICB9KTtcbiAgICByZXR1cm4gZXhwaXJ5XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzeW5jIGFkZFVzZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgZW1haWwsIGFkZHJlc3MsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcbiAgICAgICAgdmFyIHBhc3N3b3JkSGFzaCA9IGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCk7XG4gICAgICAgIC8vIHZhciB0b2tlbiA9IGdlbmVyYXRlT3RwKCk7XG4gICAgICAgIC8vIHZhciBvdHAgPSB2ZXJpZnlPdHAodG9rZW4pO1xuICAgICAgICBkYi5jdXN0b21lci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxuICAgICAgICAgICAgLnRoZW4oZmluZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA5KS5qc29uKFwiRW1haWwgaXMgYWxyZWFkeSBpbiB1c2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBkYi5jdXN0b21lci5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHBob25lOiBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkSGFzaFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcInN1Y2Nlc3NcIjogdHJ1ZX0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgfSxcblxuICAgIGFzeW5jIGZpbmRVc2VyKHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGRiLmN1c3RvbWVyLmZpbmRPbmUoeyBcbiAgICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiByZXEucXVlcnkuZW1haWwgfSwgcGFyYW5vaWQ6IGZhbHNlLFxuICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLkFkZHJlc3MgfV1cbiAgICAgICAgIH0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXJ9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBjb25zdCB7ZW1haWwsIHBhc3N3b3JkIH09IHJlcS5ib2R5XG4gICAgICAgIC8vIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgZmluZFVzZXI9IGF3YWl0IGRiLmN1c3RvbWVyLmZpbmRPbmUoe3doZXJlOiB7ZW1haWx9fSlcbiAgICAgICAgY29uc29sZS5sb2coXCJlbWFpbFwiLCBlbWFpbClcbiAgICAgICAgY29uc29sZS5sb2coXCJmaW5kVXNlclwiLCBmaW5kVXNlcilcbiAgICAgICAgaWYoZmluZFVzZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmaW5kVXNlci5kYXRhVmFsdWVzLmlkKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdG9rZW4sIGZpbmRVc2VyIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgcm9vdFVzZXJDaGVjayhyZXEsIHJlcykge1xuICAgICAgICBpZiAodmFsaWRhdGVFbWFpbChyZXEuYm9keS5lbWFpbCkpIHtcbiAgICAgICAgICAgIGRiLnVzZXIuZmluZE9uZSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHJlcS5ib2R5LmVtYWlsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXIpIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHJlcS5ib2R5LmVtYWlsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBtc2c6IFwiSmFua3B1ciBHcm9jZXJyeSBhY2NvdW50IHdpdGggdGhhdCBzaWduLWluIGluZm9ybWF0aW9uIGRvZXMgbm90IGV4aXN0LiBUcnkgYWdhaW4gb3IgY3JlYXRlIGEgbmV3IGFjY291bnQuXCJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIHNlbmRSZXNldChyZXEsIHJlcykge1xuICAgICAgICBjb25zdCB7IGVtYWlsIH0gPSByZXEuYm9keTtcbiAgICAgICAgbWFpbGVyLnNlbmRSZXNldFBhc3N3b3JkKGVtYWlsKVxuICAgICAgICAgICAgLnRoZW4ociA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydFcnJvciBTZW5kaW5nIEVtYWlsISddIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGFzeW5jIHJlc2V0UGFzc3dvcmQocmVxLCByZXMpIHtcbiAgICAgICAgY29uc3QgeyBlbWFpbCwgdmVyaWZpY2F0aW9uQ29kZSwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgZW1haWw6IGVtYWlsLCB2ZXJmX2tleTogdmVyaWZpY2F0aW9uQ29kZSB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhc2ggPSBiY3J5cHQuaGFzaFN5bmMocGFzc3dvcmQpO1xuICAgICAgICAgICAgICAgICAgICBkYi51c2VyLnVwZGF0ZSh7IHBhc3N3b3JkOiBoYXNoLCB2ZXJmX2tleTogbnVsbCwgYXR0ZW1wdDogMCAsaXNWZXJpZnk6IDF9LCB7IHdoZXJlOiB7IGVtYWlsOiBlbWFpbCB9IH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydJbnZhbGlkIHZlcmlmaWNhdGlvbiBjb2RlISddIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydFcnJvciBVcGRhdGluZyBQYXNzd29yZCEnXSB9KTtcbiAgICAgICAgICAgIH0pXG5cbiAgICB9LFxuICAgIFxuICAgIGFzeW5jIGdldEFsbEN1c3RvbWVyKHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGRiLmN1c3RvbWVyLmZpbmRBbGwoKVxuICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTp1c2VyfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgYXN5bmMgZGVsZXRlQ3VzdG9tZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLmN1c3RvbWVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAgICAgICAudGhlbihjdXN0b21lciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGN1c3RvbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5jdXN0b21lci5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IGN1c3RvbWVyLmlkIH0gfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignQ3VzdG9tZXIgaXMgbm90IGZvdW5kJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsnbXNnJzonc3VjY2VzcycsJ3N0YXR1cyc6IFwiZGVsZXRlZCBDdXN0b21lciBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy9BcGkgY3VzdG9tZXIgdXBkYXRlIFxuICAgIGFzeW5jIGdldEN1c3RvbWVyVXBkYXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdHsgaWQsIGZpcnN0TmFtZSwgbGFzdE5hbWUsIHBob25lLCBnZW5kZXIgfT0gcmVxLmJvZHkuZGF0YTtcbiAgICAgICAgICAgIGRiLmN1c3RvbWVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogaWQgfSB9KVxuICAgICAgICAgICAgLnRoZW4oY3VzdG9tZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjdXN0b21lcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuY3VzdG9tZXIudXBkYXRlKHsgXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSwgbGFzdE5hbWU6IGxhc3ROYW1lLCBwaG9uZTogcGhvbmUsIGdlbmRlcjogZ2VuZGVyXG4gICAgICAgICAgICAgICAgICAgICB9LHt3aGVyZToge2lkOiBjdXN0b21lci5pZH19KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdDdXN0b21lciBpcyBub3QgZm91bmQnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeydtc2cnOidzdWNjZXNzJywnc3RhdHVzJzogXCJkZWxldGVkIEN1c3RvbWVyIFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0Vm91Y2hlckN1c3RvbWVyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcS51c2VyKVxuICAgICAgICBjb25zdCB7aWQgfT0gcmVxLmJvZHlcbiAgICAgICAgZGIudm91Y2hlcmN1c3RvbWVyLmZpbmRBbGwoe3doZXJlOiB7Y3VzdG9tZXJJZDogaWR9fSlcbiAgICAgICAgLnRoZW4oZGF0YT0+IHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZSwgZGF0YX0pKVxuICAgICAgICAuY2F0Y2goZT0+IG5leHQoZSkpXG4gICAgfSxcbiAgICBhc3luYyBnZXRWb3VjaGVyQ3VzdG9tZXIyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcS51c2VyKVxuICAgICAgICBjb25zdCB7dWlkIH0gPXJlcS51c2VyXG4gICAgICAgIGNvbnN0IHtlbWFpbCB9PSByZXEucXVlcnlcbiAgICAgICAgY29uc3QgZGF0YT0gYXdhaXQgZGIuc2VxdWVsaXplLnF1ZXJ5KGBTRUxFQ1Qgdm91Y2hlcnMuKiwgdm91Y2hlcmN1c3RvbWVycy5pc191c2UgQVMgaXNfdXNlIEZST00gdm91Y2hlcnMgSU5ORVIgSk9JTiB2b3VjaGVyY3VzdG9tZXJzIE9OIHZvdWNoZXJjdXN0b21lcnMudm91Y2hlcklkID0gdm91Y2hlcnMuaWQgSU5ORVIgSk9JTiBjdXN0b21lcnMgT04gY3VzdG9tZXJzLmlkID0gdm91Y2hlcmN1c3RvbWVycy5jdXN0b21lcklkIFdIRVJFIGN1c3RvbWVycy5pZD0gJHt1aWR9YClcbiAgICAgICAgLnRoZW4oZGF0YT0+IHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZSwgZGF0YX0pKVxuICAgICAgICAuY2F0Y2goZT0+IG5leHQoZSkpXG4gICAgfSxcbiAgICBhc3luYyBwb3N0Vm91Y2hlckN1c3RvbWVyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIGNvbnN0IHt1aWQgfT0gcmVxLnVzZXJcbiAgICAgICAgY29uc3Qge3ZvdWNoZXJJZCB9PSByZXEuYm9keVxuICAgICAgICBkYi52b3VjaGVyY3VzdG9tZXIuY3JlYXRlKHsuLi5yZXEuYm9keSwgY3VzdG9tZXJJZDogdWlkLCBpc191c2U6IGZhbHNlfSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZX0pXG4gICAgfSxcbiAgICBhc3luYyBwdXRWb3VjaGVyQ3VzdG9tZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3Qge3VpZCB9PSByZXEudXNlclxuICAgICAgICBjb25zdCB7dm91Y2hlcklkIH09IHJlcS5ib2R5XG4gICAgICAgIGRiLnZvdWNoZXJjdXN0b21lci51cGRhdGUoe2lzX3VzZTogdHJ1ZX0se3doZXJlOiB7XG4gICAgICAgICAgICB2b3VjaGVySWQsIGN1c3RvbWVySWQ6IHVpZFxuICAgICAgICB9fSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZX0pXG4gICAgfSxcbiAgICBcbiAgICBhc3luYyBkZWxldGVWb3VjaGVyQ3VzdG9tZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3Qge3VpZCB9PSByZXEudXNlciAgXG4gICAgICAgIGNvbnN0IHt2b3VjaGVySWQgfT0gcmVxLmJvZHlcbiAgICAgICAgZGIudm91Y2hlcmN1c3RvbWVyLmRlc3Ryb3koe3doZXJlOiB7XG4gICAgICAgICAgICAuLi5yZXEuYm9keSwgY3VzdG9tZXJJZDogdWlkXG4gICAgICAgIH19KVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe29rOiB0cnVlfSlcbiAgICB9XG59XG5cblxuXG5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLGFBQUEsR0FBQUMsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFHLE9BQUEsR0FBQUQsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFJLE9BQUEsR0FBQUYsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFLLGFBQUEsR0FBQUgsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFNLFVBQUEsR0FBQUosc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFPLFVBQUEsR0FBQVAsT0FBQTtBQUNBLElBQUFRLFVBQUEsR0FBQVIsT0FBQTtBQUFzQyxTQUFBUyxRQUFBQyxNQUFBLEVBQUFDLGNBQUEsUUFBQUMsSUFBQSxHQUFBQyxNQUFBLENBQUFELElBQUEsQ0FBQUYsTUFBQSxPQUFBRyxNQUFB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