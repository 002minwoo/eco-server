"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../../../models");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _mailer = _interopRequireDefault(require("../../../mailer"));
var _config = _interopRequireDefault(require("../../../config"));
var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));
var _speakeasy = _interopRequireDefault(require("speakeasy"));
var _md = _interopRequireDefault(require("md5"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
// import { validateEmail } from './../../../functions'

var JWTSign = function JWTSign(user, date) {
  return _jsonwebtoken["default"].sign({
    iss: _config["default"].app.name,
    sub: user.id,
    iam: user.type,
    iat: date.getTime(),
    exp: new Date().setMinutes(date.getMinutes() + 30)
  }, process.env.JWT_SECRET || "123456");
};
function generateRandomString(length) {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
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
      var _req$body, firstName, lastName, phone, email, address, password, role, verify, passwordHash, token, otp;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, phone = _req$body.phone, email = _req$body.email, address = _req$body.address, password = _req$body.password, role = _req$body.role, verify = _req$body.verify;
            passwordHash = (0, _md["default"])(password);
            console.log(passwordHash);
            token = generateOtp();
            otp = verifyOtp(token);
            _models.db.user.findOne({
              where: {
                email: email
              },
              paranoid: false
            }).then(function (find) {
              if (find) {
                return res.status(409).json("Email is already in use");
              }
              return _models.db.user.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
                password: passwordHash,
                verify: verify,
                role: role
              });
            }).then(function (user) {
              if (user) {
                _mailer["default"].sendEmployeePassword(email, token);
                return res.status(200).json({
                  success: true,
                  key: otp,
                  msg: "New Registration added and password has been sent to " + email + " ."
                });
              } else res.status(500).json({
                'success': false
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
          case 6:
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
            _models.db.user.findOne({
              attributes: ["firstName", "lastName", "email"],
              where: {
                id: req.query.user_id
              }
            }).then(function (user) {
              if (user) {
                return res.status(200).json({
                  success: true,
                  data: user,
                  ok: true
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
  getAllUserList: function getAllUserList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _models.db.user.findAll().then(function (user) {
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
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  userUpdate: function userUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var _req$body2, id, firstName, lastName, email, address, password, role, verify, phone, status, passwordHash;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, id = _req$body2.id, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email, address = _req$body2.address, password = _req$body2.password, role = _req$body2.role, verify = _req$body2.verify, phone = _req$body2.phone, status = _req$body2.status;
            passwordHash = (0, _md["default"])(password);
            _models.db.user.findOne({
              where: {
                email: email
              },
              paranoid: false
            }).then(function (user) {
              if (!user) {
                throw new RequestError('User is not found', 409);
              }
              return _models.db.user.update({
                firstName: firstName ? firstName : user.firstName,
                lastName: lastName ? lastName : user.lastName,
                password: password ? passwordHash : user.passwordHash,
                address: address ? address : user.address,
                role: role ? role : user.role,
                verify: status ? status : user.verify,
                phone: phone ? phone : user.phone
              }, {
                where: {
                  id: id
                }
              });
            }).then(function (user) {
              if (user) {
                return res.status(200).json({
                  success: true,
                  msg: "User update successsfully"
                });
              } else res.status(500).json({
                'success': false
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
          case 3:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  },
  // async login(req, res, next) {
  //     var date = new Date();
  //     var token = JWTSign(req.user, date);
  //     res.cookie('XSRF-token',token, {
  //         expire: new Date().setMinutes(date.getMinutes() + 30),
  //         httpOnly: true, secure: config.app.secure
  //     });
  //     return res.status(200).json({ success: true ,token, role: req.user.role});
  // },
  login: function login(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var _req$body3, email, password, deviceCode, findUser, _findUser$device, _findUser$device2, _findUser$device3, _findUser$device4, _findUser$device5, _findUser$device6, _findUser$device7, _findUser$device8, device1Code, token, device2Code, _token, _device1Code, data, _token2, findUserdevice1, findUserdevice2, _token3;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password, deviceCode = _req$body3.deviceCode; // var date = new Date();
            // console.log(password)
            // console.log(bcrypt.hashSync(password))
            _context5.next = 3;
            return _models.db.user.findOne({
              where: {
                phone: email,
                password: (0, _md["default"])(password)
              }
            });
          case 3:
            findUser = _context5.sent;
            if (!(findUser.verify === null)) {
              _context5.next = 8;
              break;
            }
            return _context5.abrupt("return", res.status(200).json({
              success: false
            }));
          case 8:
            if (!findUser.verify) {
              _context5.next = 53;
              break;
            }
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device = findUser.device1) === null || _findUser$device === void 0 ? void 0 : _findUser$device.length) <= 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device2 = findUser.device2) === null || _findUser$device2 === void 0 ? void 0 : _findUser$device2.length) > 0)) {
              _context5.next = 17;
              break;
            }
            device1Code = generateRandomString(10);
            _context5.next = 13;
            return _models.db.user.update({
              device1: device1Code
            }, {
              where: {
                phone: email,
                password: (0, _md["default"])(password)
              }
            });
          case 13:
            token = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id
            }, process.env.JWT_SECRET || "123456");
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: token,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName),
              deviceCode: device1Code
            }));
          case 17:
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device3 = findUser.device2) === null || _findUser$device3 === void 0 ? void 0 : _findUser$device3.length) <= 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device4 = findUser.device1) === null || _findUser$device4 === void 0 ? void 0 : _findUser$device4.length) > 0)) {
              _context5.next = 25;
              break;
            }
            device2Code = generateRandomString(10);
            _context5.next = 21;
            return _models.db.user.update({
              device2: device2Code
            }, {
              where: {
                phone: email,
                password: (0, _md["default"])(password)
              }
            });
          case 21:
            _token = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id
            }, process.env.JWT_SECRET || "123456");
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: _token,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName),
              deviceCode: device2Code
            }));
          case 25:
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device5 = findUser.device1) === null || _findUser$device5 === void 0 ? void 0 : _findUser$device5.length) <= 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device6 = findUser.device2) === null || _findUser$device6 === void 0 ? void 0 : _findUser$device6.length) <= 0)) {
              _context5.next = 36;
              break;
            }
            _device1Code = generateRandomString(10);
            console.log(_device1Code);
            _context5.next = 30;
            return _models.db.user.update({
              device1: _device1Code
            }, {
              where: {
                phone: email,
                password: (0, _md["default"])(password)
              }
            });
          case 30:
            data = _context5.sent;
            console.log(data);
            _token2 = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id
            }, process.env.JWT_SECRET || "123456");
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: _token2,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName),
              deviceCode: _device1Code
            }));
          case 36:
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device7 = findUser.device2) === null || _findUser$device7 === void 0 ? void 0 : _findUser$device7.length) > 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device8 = findUser.device1) === null || _findUser$device8 === void 0 ? void 0 : _findUser$device8.length) > 0)) {
              _context5.next = 51;
              break;
            }
            _context5.next = 39;
            return _models.db.user.findOne({
              where: {
                phone: email,
                password: (0, _md["default"])(password),
                device1: deviceCode
              }
            });
          case 39:
            findUserdevice1 = _context5.sent;
            _context5.next = 42;
            return _models.db.user.findOne({
              where: {
                phone: email,
                password: (0, _md["default"])(password),
                device2: deviceCode
              }
            });
          case 42:
            findUserdevice2 = _context5.sent;
            _token3 = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id
            }, process.env.JWT_SECRET || "123456");
            if (!(findUserdevice1 !== null && findUserdevice1 !== void 0 && findUserdevice1.email || findUserdevice2 !== null && findUserdevice2 !== void 0 && findUserdevice2.email)) {
              _context5.next = 49;
              break;
            }
            console.log(5);
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: _token3,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName),
              deviceCode: deviceCode
            }));
          case 49:
            console.log(6);
            return _context5.abrupt("return", res.status(200).json({
              success: false,
              login: false,
              third: true
            }));
          case 51:
            _context5.next = 54;
            break;
          case 53:
            return _context5.abrupt("return", res.status(200).json({
              success: false
            }));
          case 54:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }))();
  },
  deleteUserList: function deleteUserList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _models.db.user.findOne({
              where: {
                id: req.body.id
              }
            }).then(function (data) {
              if (data) {
                return _models.db.user.destroy({
                  where: {
                    id: req.body.id
                  }
                }).then(function (r) {
                  return [r, data];
                });
              }
              throw new RequestError('User is not found', 409);
            }).then(function (re) {
              return res.status(200).json({
                'status': "deleted userlist Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }))();
  },
  verifyMail: function verifyMail(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var _req$body4, email, password, firstName, transporter, mailOptions;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            // Nhận email từ request body
            _req$body4 = req.body, email = _req$body4.email, password = _req$body4.password, firstName = _req$body4.firstName; // Tạo một mã xác thực ngẫu nhiên
            // Cấu hình thông tin mail server (dùng Gmail làm ví dụ)
            transporter = _nodemailer["default"].createTransport({
              service: 'gmail',
              auth: {
                user: process.env.MAIL_USERNAME,
                // Thay bằng địa chỉ email của bạn
                pass: process.env.MAIL_PASSWORD // Thay bằng mật khẩu email của bạn
              }
            }); // Cấu hình nội dung email
            mailOptions = {
              from: process.env.MAIL_USERNAME,
              // Thay bằng địa chỉ email của bạn
              to: email,
              // Địa chỉ email người dùng cần xác thực
              subject: 'Email Verification',
              // Tiêu đề email
              html: "\n                    <a href=\"".concat(process.env.URL_FRONTEND, "/signup/success\" style=\"padding: 10px; border-radius: 10px; background-color: #2e89ff; color: #fff; width: 100%\">Click here to complete singup process</a>\n                ") // Nội dung email chứa mã xác thực
            }; // Gửi email
            _context7.next = 6;
            return transporter.sendMail(mailOptions);
          case 6:
            // Trả về mã xác thực để sử dụng sau này (ví dụ để kiểm tra mã khi người dùng nhập vào)
            res.json({
              success: true
            });
            _context7.next = 13;
            break;
          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](0);
            // Xử lý lỗi nếu có
            console.error('Error sending verification email:', _context7.t0);
            res.status(500).json({
              success: false,
              error: 'Error sending verification email'
            });
          case 13:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 9]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImxlbmd0aCIsImNoYXJhY3RlcnMiLCJyZXN1bHQiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiaSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlT3RwIiwidG9rZW4iLCJzcGVha2Vhc3kiLCJ0b3RwIiwic2VjcmV0IiwiT1RQX0tFWSIsImVuY29kaW5nIiwic3RlcCIsInZlcmlmeU90cCIsImV4cGlyeSIsInZlcmlmeSIsIndpbmRvdyIsIl9kZWZhdWx0IiwiYWRkVXNlciIsInJlcSIsInJlcyIsIm5leHQiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIl9yZXEkYm9keSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicGhvbmUiLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJwYXNzd29yZEhhc2giLCJvdHAiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwibWQ1IiwiY29uc29sZSIsImxvZyIsImRiIiwiZmluZE9uZSIsIndoZXJlIiwicGFyYW5vaWQiLCJ0aGVuIiwiZmluZCIsInN0YXR1cyIsImpzb24iLCJjcmVhdGUiLCJtYWlsZXIiLCJzZW5kRW1wbG95ZWVQYXNzd29yZCIsInN1Y2Nlc3MiLCJrZXkiLCJtc2ciLCJlcnIiLCJzdG9wIiwiZmluZFVzZXIiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImF0dHJpYnV0ZXMiLCJxdWVyeSIsInVzZXJfaWQiLCJkYXRhIiwib2siLCJnZXRBbGxVc2VyTGlzdCIsIl9jYWxsZWUzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiZmluZEFsbCIsInVzZXJVcGRhdGUiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJSZXF1ZXN0RXJyb3IiLCJ1cGRhdGUiLCJsb2dpbiIsIl9jYWxsZWU1IiwiX3JlcSRib2R5MyIsImRldmljZUNvZGUiLCJfZmluZFVzZXIkZGV2aWNlIiwiX2ZpbmRVc2VyJGRldmljZTIiLCJfZmluZFVzZXIkZGV2aWNlMyIsIl9maW5kVXNlciRkZXZpY2U0IiwiX2ZpbmRVc2VyJGRldmljZTUiLCJfZmluZFVzZXIkZGV2aWNlNiIsIl9maW5kVXNlciRkZXZpY2U3IiwiX2ZpbmRVc2VyJGRldmljZTgiLCJkZXZpY2UxQ29kZSIsImRldmljZTJDb2RlIiwiX3Rva2VuIiwiX2RldmljZTFDb2RlIiwiX3Rva2VuMiIsImZpbmRVc2VyZGV2aWNlMSIsImZpbmRVc2VyZGV2aWNlMiIsIl90b2tlbjMiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJzZW50IiwiYWJydXB0IiwiZGV2aWNlMSIsImRldmljZTIiLCJ1aWQiLCJkYXRhVmFsdWVzIiwiYXVpZCIsInRoaXJkIiwiZGVsZXRlVXNlckxpc3QiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRlc3Ryb3kiLCJyIiwicmUiLCJ2ZXJpZnlNYWlsIiwiX2NhbGxlZTciLCJfcmVxJGJvZHk0IiwidHJhbnNwb3J0ZXIiLCJtYWlsT3B0aW9ucyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsIm5vZGVtYWlsZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJzZXJ2aWNlIiwiYXV0aCIsIk1BSUxfVVNFUk5BTUUiLCJwYXNzIiwiTUFJTF9QQVNTV09SRCIsImZyb20iLCJ0byIsInN1YmplY3QiLCJodG1sIiwiY29uY2F0IiwiVVJMX0ZST05URU5EIiwic2VuZE1haWwiLCJ0MCIsImVycm9yIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2F1dGgvYXV0aC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzJztcbmltcG9ydCBKV1QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBtYWlsZXIgZnJvbSAnLi4vLi4vLi4vbWFpbGVyJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vY29uZmlnJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0LW5vZGVqcyc7XG5pbXBvcnQgc3BlYWtlYXN5IGZyb20gJ3NwZWFrZWFzeSc7XG4vLyBpbXBvcnQgeyB2YWxpZGF0ZUVtYWlsIH0gZnJvbSAnLi8uLi8uLi8uLi9mdW5jdGlvbnMnXG5pbXBvcnQgbWQ1IGZyb20gXCJtZDVcIlxuaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIlxuXG52YXIgSldUU2lnbiA9IGZ1bmN0aW9uICh1c2VyLCBkYXRlKSB7XG4gICAgcmV0dXJuIEpXVC5zaWduKHtcbiAgICAgICAgaXNzOiBjb25maWcuYXBwLm5hbWUsXG4gICAgICAgIHN1YjogdXNlci5pZCxcbiAgICAgICAgaWFtIDogdXNlci50eXBlLFxuICAgICAgICBpYXQ6IGRhdGUuZ2V0VGltZSgpLFxuICAgICAgICBleHA6IG5ldyBEYXRlKCkuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIDMwKVxuICAgIH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgXCIxMjM0NTZcIik7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUmFuZG9tU3RyaW5nKGxlbmd0aCkge1xuICAgIGNvbnN0IGNoYXJhY3RlcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICAgIGxldCByZXN1bHQgPSAnJztcbiAgICBjb25zdCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlT3RwKCkge1xuICAgIGxldCB0b2tlbiA9IHNwZWFrZWFzeS50b3RwKHtcbiAgICAgICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxuICAgICAgICBlbmNvZGluZzogJ2Jhc2UzMicsXG4gICAgICAgIHN0ZXA6ICgzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wICUgMzApKSlcbiAgICB9KTtcbiAgICByZXR1cm4gdG9rZW47XG59XG5cbmZ1bmN0aW9uIHZlcmlmeU90cCh0b2tlbikge1xuICAgIGxldCBleHBpcnkgPSBzcGVha2Vhc3kudG90cC52ZXJpZnkoe1xuICAgICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXG4gICAgICAgIGVuY29kaW5nOiAnYmFzZTMyJyxcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICBzdGVwOiAoMzAgLSBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCAlIDMwKSkpLFxuICAgICAgICB3aW5kb3c6IDBcbiAgICB9KTtcbiAgICByZXR1cm4gZXhwaXJ5XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzeW5jIGFkZFVzZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgZW1haWwsIGFkZHJlc3MsIHBhc3N3b3JkLCByb2xlLCB2ZXJpZnkgfSA9IHJlcS5ib2R5O1xuICAgICAgICB2YXIgcGFzc3dvcmRIYXNoID0gbWQ1KHBhc3N3b3JkKTtcbiAgICAgICAgY29uc29sZS5sb2cocGFzc3dvcmRIYXNoKVxuICAgICAgICB2YXIgdG9rZW4gPSBnZW5lcmF0ZU90cCgpO1xuICAgICAgICB2YXIgb3RwID0gdmVyaWZ5T3RwKHRva2VuKTtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxuICAgICAgICAgICAgLnRoZW4oZmluZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA5KS5qc29uKFwiRW1haWwgaXMgYWxyZWFkeSBpbiB1c2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYi51c2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHBob25lLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRIYXNoLFxuICAgICAgICAgICAgICAgICAgICB2ZXJpZnk6IHZlcmlmeSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICBtYWlsZXIuc2VuZEVtcGxveWVlUGFzc3dvcmQoZW1haWwsIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwga2V5OiBvdHAsIG1zZzogXCJOZXcgUmVnaXN0cmF0aW9uIGFkZGVkIGFuZCBwYXNzd29yZCBoYXMgYmVlbiBzZW50IHRvIFwiICsgZW1haWwgKyBcIiAuXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBhc3luYyBmaW5kVXNlcihyZXEscmVzLG5leHQpe1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyBhdHRyaWJ1dGVzOltcImZpcnN0TmFtZVwiLFwibGFzdE5hbWVcIiwgXCJlbWFpbFwiXSwgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS51c2VyX2lkIH19KVxuICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTp1c2VyLCBvazogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgICBhc3luYyBnZXRBbGxVc2VyTGlzdChyZXEscmVzLG5leHQpe1xuICAgICAgICBkYi51c2VyLmZpbmRBbGwoKVxuICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTp1c2VyfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgIGFzeW5jIHVzZXJVcGRhdGUocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgY29uc3QgeyBpZCwgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIGFkZHJlc3MsIHBhc3N3b3JkLCByb2xlLCB2ZXJpZnksIHBob25lLCBzdGF0dXMgfSA9IHJlcS5ib2R5O1xuICAgICAgICB2YXIgcGFzc3dvcmRIYXNoID0gbWQ1KHBhc3N3b3JkKTtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ1VzZXIgaXMgbm90IGZvdW5kJywgNDA5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRiLnVzZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUgPyBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUgPyBsYXN0TmFtZTogdXNlci5sYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkID8gcGFzc3dvcmRIYXNoOiB1c2VyLnBhc3N3b3JkSGFzaCxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyA/IGFkZHJlc3MgOiB1c2VyLmFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHJvbGUgPyByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIHZlcmlmeSA6IHN0YXR1cz8gc3RhdHVzOiB1c2VyLnZlcmlmeSxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHBob25lID8gcGhvbmUgOiB1c2VyLnBob25lXG4gICAgICAgICAgICAgICAgfSwgeyB3aGVyZTogeyBpZDogaWQgfSB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlVzZXIgdXBkYXRlIHN1Y2Nlc3NzZnVsbHlcIn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgLy8gYXN5bmMgbG9naW4ocmVxLCByZXMsIG5leHQpIHtcbiAgICAvLyAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIC8vICAgICB2YXIgdG9rZW4gPSBKV1RTaWduKHJlcS51c2VyLCBkYXRlKTtcbiAgICAvLyAgICAgcmVzLmNvb2tpZSgnWFNSRi10b2tlbicsdG9rZW4sIHtcbiAgICAvLyAgICAgICAgIGV4cGlyZTogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApLFxuICAgIC8vICAgICAgICAgaHR0cE9ubHk6IHRydWUsIHNlY3VyZTogY29uZmlnLmFwcC5zZWN1cmVcbiAgICAvLyAgICAgfSk7XG4gICAgICAgIFxuICAgIC8vICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlICx0b2tlbiwgcm9sZTogcmVxLnVzZXIucm9sZX0pO1xuICAgIC8vIH0sXG4gICAgYXN5bmMgbG9naW4ocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3Qge2VtYWlsLCBwYXNzd29yZCwgZGV2aWNlQ29kZSB9PSByZXEuYm9keVxuICAgICAgICAvLyB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBhc3N3b3JkKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhiY3J5cHQuaGFzaFN5bmMocGFzc3dvcmQpKVxuICAgICAgICBjb25zdCBmaW5kVXNlcj0gYXdhaXQgZGIudXNlci5maW5kT25lKHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCl9fSlcbiAgICAgICAgaWYoZmluZFVzZXIudmVyaWZ5ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGZpbmRVc2VyLnZlcmlmeSkge1xuICAgICAgICAgICAgaWYoZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA8PSAwICYmIGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV2aWNlMUNvZGU9IGdlbmVyYXRlUmFuZG9tU3RyaW5nKDEwKVxuICAgICAgICAgICAgICAgIGF3YWl0IGRiLnVzZXIudXBkYXRlKHtkZXZpY2UxOiBkZXZpY2UxQ29kZX0sIHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCl9fSlcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbj0gSldULnNpZ24oe3VpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWR9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIHx8IFwiMTIzNDU2XCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdG9rZW4sIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSwgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLCBkZXZpY2VDb2RlOiBkZXZpY2UxQ29kZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA8PSAwICYmIGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkZXZpY2UyQ29kZT0gZ2VuZXJhdGVSYW5kb21TdHJpbmcoMTApXG4gICAgICAgICAgICAgICAgYXdhaXQgZGIudXNlci51cGRhdGUoe2RldmljZTI6IGRldmljZTJDb2RlfSwge3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgXCIxMjM0NTZcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB0b2tlbiwgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLCBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsIGRldmljZUNvZGU6IGRldmljZTJDb2RlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoIDw9IDAgJiYgZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV2aWNlMUNvZGU9IGdlbmVyYXRlUmFuZG9tU3RyaW5nKDEwKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRldmljZTFDb2RlKVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGE9IGF3YWl0IGRiLnVzZXIudXBkYXRlKHtkZXZpY2UxOiBkZXZpY2UxQ29kZX0sIHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCl9fSlcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgXCIxMjM0NTZcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB0b2tlbiwgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLCBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsIGRldmljZUNvZGU6IGRldmljZTFDb2RlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoID4gMCAmJiBmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbmRVc2VyZGV2aWNlMT0gYXdhaXQgZGIudXNlci5maW5kT25lKHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCksIGRldmljZTE6IGRldmljZUNvZGV9fSlcbiAgICAgICAgICAgICAgICBjb25zdCBmaW5kVXNlcmRldmljZTI9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpLCBkZXZpY2UyOiBkZXZpY2VDb2RlfX0pXG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW49IEpXVC5zaWduKHt1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCBcIjEyMzQ1NlwiKVxuICAgICAgICAgICAgICAgIGlmKGZpbmRVc2VyZGV2aWNlMT8uZW1haWwgfHwgZmluZFVzZXJkZXZpY2UyPy5lbWFpbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyg1KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB0b2tlbiwgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLCBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsIGRldmljZUNvZGUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyg2KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBsb2dpbjogZmFsc2UsIHRoaXJkOiB0cnVlfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgICBhc3luYyBkZWxldGVVc2VyTGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcmVxLmJvZHkuaWR9IH0pXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHJlcS5ib2R5LmlkIH0gfSkudGhlbihyID0+IFtyLCBkYXRhXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignVXNlciBpcyBub3QgZm91bmQnLCA0MDkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdGF0dXMnOiBcImRlbGV0ZWQgdXNlcmxpc3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSlcbiAgICB9LFxuICAgIGFzeW5jIHZlcmlmeU1haWwocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIE5o4bqtbiBlbWFpbCB04burIHJlcXVlc3QgYm9keVxuICAgICAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIGZpcnN0TmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgXG4gICAgICAgICAgICAvLyBU4bqhbyBt4buZdCBtw6MgeMOhYyB0aOG7sWMgbmfhuqt1IG5oacOqblxuICAgICAgICAgICBcbiAgICBcbiAgICAgICAgICAgIC8vIEPhuqV1IGjDrG5oIHRow7RuZyB0aW4gbWFpbCBzZXJ2ZXIgKGTDuW5nIEdtYWlsIGzDoG0gdsOtIGThu6UpXG4gICAgICAgICAgICBjb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiAnZ21haWwnLFxuICAgICAgICAgICAgICAgIGF1dGg6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSwgLy8gVGhheSBi4bqxbmcgxJHhu4thIGNo4buJIGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52Lk1BSUxfUEFTU1dPUkQgLy8gVGhheSBi4bqxbmcgbeG6rXQga2jhuql1IGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICAvLyBD4bqldSBow6xuaCBu4buZaSBkdW5nIGVtYWlsXG4gICAgICAgICAgICBjb25zdCBtYWlsT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgICAgICAgICB0bzogZW1haWwsIC8vIMSQ4buLYSBjaOG7iSBlbWFpbCBuZ8aw4budaSBkw7luZyBj4bqnbiB4w6FjIHRo4buxY1xuICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdFbWFpbCBWZXJpZmljYXRpb24nLCAvLyBUacOqdSDEkeG7gSBlbWFpbFxuICAgICAgICAgICAgICAgIGh0bWw6IGBcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7cHJvY2Vzcy5lbnYuVVJMX0ZST05URU5EfS9zaWdudXAvc3VjY2Vzc1wiIHN0eWxlPVwicGFkZGluZzogMTBweDsgYm9yZGVyLXJhZGl1czogMTBweDsgYmFja2dyb3VuZC1jb2xvcjogIzJlODlmZjsgY29sb3I6ICNmZmY7IHdpZHRoOiAxMDAlXCI+Q2xpY2sgaGVyZSB0byBjb21wbGV0ZSBzaW5ndXAgcHJvY2VzczwvYT5cbiAgICAgICAgICAgICAgICBgIC8vIE7hu5lpIGR1bmcgZW1haWwgY2jhu6lhIG3DoyB4w6FjIHRo4buxY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gR+G7rWkgZW1haWxcbiAgICAgICAgICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcbiAgICAgICAgICAgIC8vIFRy4bqjIHbhu4EgbcOjIHjDoWMgdGjhu7FjIMSR4buDIHPhu60gZOG7pW5nIHNhdSBuw6B5ICh2w60gZOG7pSDEkeG7gyBraeG7g20gdHJhIG3DoyBraGkgbmfGsOG7nWkgZMO5bmcgbmjhuq1wIHbDoG8pXG4gICAgICAgICAgICByZXMuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBY4butIGzDvSBs4buXaSBu4bq/dSBjw7NcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlbmRpbmcgdmVyaWZpY2F0aW9uIGVtYWlsOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRXJyb3Igc2VuZGluZyB2ZXJpZmljYXRpb24gZW1haWwnIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLGFBQUEsR0FBQUMsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFHLE9BQUEsR0FBQUQsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFJLE9BQUEsR0FBQUYsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFLLGFBQUEsR0FBQUgsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFNLFVBQUEsR0FBQUosc0JBQUEsQ0FBQUYsT0FBQTtBQUVBLElBQUFPLEdBQUEsR0FBQUwsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFRLFdBQUEsR0FBQU4sc0JBQUEsQ0FBQUYsT0FBQTtBQUZBOztBQUlBLElBQUlTLE9BQU8sR0FBRyxTQUFWQSxPQUFPQSxDQUFhQyxJQUFJLEVBQUVDLElBQUksRUFBRTtFQUNoQyxPQUFPQyx3QkFBRyxDQUFDQyxJQUFJLENBQUM7SUFDWkMsR0FBRyxFQUFFQyxrQkFBTSxDQUFDQyxHQUFHLENBQUNDLElBQUk7SUFDcEJDLEdBQUcsRUFBRVIsSUFBSSxDQUFDUyxFQUFFO0lBQ1pDLEdBQUcsRUFBR1YsSUFBSSxDQUFDVyxJQUFJO0lBQ2ZDLEdBQUcsRUFBRVgsSUFBSSxDQUFDWSxPQUFPLENBQUMsQ0FBQztJQUNuQkMsR0FBRyxFQUFFLElBQUlDLElBQUksQ0FBQyxDQUFDLENBQUNDLFVBQVUsQ0FBQ2YsSUFBSSxDQUFDZ0IsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFO0VBQ3JELENBQUMsRUFBRUMsT0FBTyxDQUFDQyxHQUFHLENBQUNDLFVBQVUsSUFBSSxRQUFRLENBQUM7QUFDMUMsQ0FBQztBQUVELFNBQVNDLG9CQUFvQkEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ2xDLElB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