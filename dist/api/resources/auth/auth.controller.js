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
            }, process.env.JWT_SECRET);
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
            }, process.env.JWT_SECRET);
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
            }, process.env.JWT_SECRET);
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
            }, process.env.JWT_SECRET);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImxlbmd0aCIsImNoYXJhY3RlcnMiLCJyZXN1bHQiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiaSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlT3RwIiwidG9rZW4iLCJzcGVha2Vhc3kiLCJ0b3RwIiwic2VjcmV0IiwiT1RQX0tFWSIsImVuY29kaW5nIiwic3RlcCIsInZlcmlmeU90cCIsImV4cGlyeSIsInZlcmlmeSIsIndpbmRvdyIsIl9kZWZhdWx0IiwiYWRkVXNlciIsInJlcSIsInJlcyIsIm5leHQiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIl9yZXEkYm9keSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicGhvbmUiLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJwYXNzd29yZEhhc2giLCJvdHAiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwibWQ1IiwiY29uc29sZSIsImxvZyIsImRiIiwiZmluZE9uZSIsIndoZXJlIiwicGFyYW5vaWQiLCJ0aGVuIiwiZmluZCIsInN0YXR1cyIsImpzb24iLCJjcmVhdGUiLCJtYWlsZXIiLCJzZW5kRW1wbG95ZWVQYXNzd29yZCIsInN1Y2Nlc3MiLCJrZXkiLCJtc2ciLCJlcnIiLCJzdG9wIiwiZmluZFVzZXIiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImF0dHJpYnV0ZXMiLCJxdWVyeSIsInVzZXJfaWQiLCJkYXRhIiwib2siLCJnZXRBbGxVc2VyTGlzdCIsIl9jYWxsZWUzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiZmluZEFsbCIsInVzZXJVcGRhdGUiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJSZXF1ZXN0RXJyb3IiLCJ1cGRhdGUiLCJsb2dpbiIsIl9jYWxsZWU1IiwiX3JlcSRib2R5MyIsImRldmljZUNvZGUiLCJfZmluZFVzZXIkZGV2aWNlIiwiX2ZpbmRVc2VyJGRldmljZTIiLCJfZmluZFVzZXIkZGV2aWNlMyIsIl9maW5kVXNlciRkZXZpY2U0IiwiX2ZpbmRVc2VyJGRldmljZTUiLCJfZmluZFVzZXIkZGV2aWNlNiIsIl9maW5kVXNlciRkZXZpY2U3IiwiX2ZpbmRVc2VyJGRldmljZTgiLCJkZXZpY2UxQ29kZSIsImRldmljZTJDb2RlIiwiX3Rva2VuIiwiX2RldmljZTFDb2RlIiwiX3Rva2VuMiIsImZpbmRVc2VyZGV2aWNlMSIsImZpbmRVc2VyZGV2aWNlMiIsIl90b2tlbjMiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJzZW50IiwiYWJydXB0IiwiZGV2aWNlMSIsImRldmljZTIiLCJ1aWQiLCJkYXRhVmFsdWVzIiwiYXVpZCIsInRoaXJkIiwiZGVsZXRlVXNlckxpc3QiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRlc3Ryb3kiLCJyIiwicmUiLCJ2ZXJpZnlNYWlsIiwiX2NhbGxlZTciLCJfcmVxJGJvZHk0IiwidHJhbnNwb3J0ZXIiLCJtYWlsT3B0aW9ucyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsIm5vZGVtYWlsZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJzZXJ2aWNlIiwiYXV0aCIsIk1BSUxfVVNFUk5BTUUiLCJwYXNzIiwiTUFJTF9QQVNTV09SRCIsImZyb20iLCJ0byIsInN1YmplY3QiLCJodG1sIiwiY29uY2F0IiwiVVJMX0ZST05URU5EIiwic2VuZE1haWwiLCJ0MCIsImVycm9yIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2F1dGgvYXV0aC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzJztcbmltcG9ydCBKV1QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBtYWlsZXIgZnJvbSAnLi4vLi4vLi4vbWFpbGVyJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vY29uZmlnJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0LW5vZGVqcyc7XG5pbXBvcnQgc3BlYWtlYXN5IGZyb20gJ3NwZWFrZWFzeSc7XG4vLyBpbXBvcnQgeyB2YWxpZGF0ZUVtYWlsIH0gZnJvbSAnLi8uLi8uLi8uLi9mdW5jdGlvbnMnXG5pbXBvcnQgbWQ1IGZyb20gXCJtZDVcIlxuaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIlxuXG52YXIgSldUU2lnbiA9IGZ1bmN0aW9uICh1c2VyLCBkYXRlKSB7XG4gICAgcmV0dXJuIEpXVC5zaWduKHtcbiAgICAgICAgaXNzOiBjb25maWcuYXBwLm5hbWUsXG4gICAgICAgIHN1YjogdXNlci5pZCxcbiAgICAgICAgaWFtIDogdXNlci50eXBlLFxuICAgICAgICBpYXQ6IGRhdGUuZ2V0VGltZSgpLFxuICAgICAgICBleHA6IG5ldyBEYXRlKCkuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIDMwKVxuICAgIH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgXCIxMjM0NTZcIik7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUmFuZG9tU3RyaW5nKGxlbmd0aCkge1xuICAgIGNvbnN0IGNoYXJhY3RlcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICAgIGxldCByZXN1bHQgPSAnJztcbiAgICBjb25zdCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlT3RwKCkge1xuICAgIGxldCB0b2tlbiA9IHNwZWFrZWFzeS50b3RwKHtcbiAgICAgICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxuICAgICAgICBlbmNvZGluZzogJ2Jhc2UzMicsXG4gICAgICAgIHN0ZXA6ICgzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wICUgMzApKSlcbiAgICB9KTtcbiAgICByZXR1cm4gdG9rZW47XG59XG5cbmZ1bmN0aW9uIHZlcmlmeU90cCh0b2tlbikge1xuICAgIGxldCBleHBpcnkgPSBzcGVha2Vhc3kudG90cC52ZXJpZnkoe1xuICAgICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXG4gICAgICAgIGVuY29kaW5nOiAnYmFzZTMyJyxcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICBzdGVwOiAoMzAgLSBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCAlIDMwKSkpLFxuICAgICAgICB3aW5kb3c6IDBcbiAgICB9KTtcbiAgICByZXR1cm4gZXhwaXJ5XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzeW5jIGFkZFVzZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgZW1haWwsIGFkZHJlc3MsIHBhc3N3b3JkLCByb2xlLCB2ZXJpZnkgfSA9IHJlcS5ib2R5O1xuICAgICAgICB2YXIgcGFzc3dvcmRIYXNoID0gbWQ1KHBhc3N3b3JkKTtcbiAgICAgICAgY29uc29sZS5sb2cocGFzc3dvcmRIYXNoKVxuICAgICAgICB2YXIgdG9rZW4gPSBnZW5lcmF0ZU90cCgpO1xuICAgICAgICB2YXIgb3RwID0gdmVyaWZ5T3RwKHRva2VuKTtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxuICAgICAgICAgICAgLnRoZW4oZmluZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA5KS5qc29uKFwiRW1haWwgaXMgYWxyZWFkeSBpbiB1c2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYi51c2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHBob25lLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRIYXNoLFxuICAgICAgICAgICAgICAgICAgICB2ZXJpZnk6IHZlcmlmeSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICBtYWlsZXIuc2VuZEVtcGxveWVlUGFzc3dvcmQoZW1haWwsIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwga2V5OiBvdHAsIG1zZzogXCJOZXcgUmVnaXN0cmF0aW9uIGFkZGVkIGFuZCBwYXNzd29yZCBoYXMgYmVlbiBzZW50IHRvIFwiICsgZW1haWwgKyBcIiAuXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBhc3luYyBmaW5kVXNlcihyZXEscmVzLG5leHQpe1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyBhdHRyaWJ1dGVzOltcImZpcnN0TmFtZVwiLFwibGFzdE5hbWVcIiwgXCJlbWFpbFwiXSwgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS51c2VyX2lkIH19KVxuICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTp1c2VyLCBvazogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgICBhc3luYyBnZXRBbGxVc2VyTGlzdChyZXEscmVzLG5leHQpe1xuICAgICAgICBkYi51c2VyLmZpbmRBbGwoKVxuICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTp1c2VyfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgIGFzeW5jIHVzZXJVcGRhdGUocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgY29uc3QgeyBpZCwgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIGFkZHJlc3MsIHBhc3N3b3JkLCByb2xlLCB2ZXJpZnksIHBob25lLCBzdGF0dXMgfSA9IHJlcS5ib2R5O1xuICAgICAgICB2YXIgcGFzc3dvcmRIYXNoID0gbWQ1KHBhc3N3b3JkKTtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ1VzZXIgaXMgbm90IGZvdW5kJywgNDA5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRiLnVzZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUgPyBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUgPyBsYXN0TmFtZTogdXNlci5sYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkID8gcGFzc3dvcmRIYXNoOiB1c2VyLnBhc3N3b3JkSGFzaCxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyA/IGFkZHJlc3MgOiB1c2VyLmFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHJvbGUgPyByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIHZlcmlmeSA6IHN0YXR1cz8gc3RhdHVzOiB1c2VyLnZlcmlmeSxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHBob25lID8gcGhvbmUgOiB1c2VyLnBob25lXG4gICAgICAgICAgICAgICAgfSwgeyB3aGVyZTogeyBpZDogaWQgfSB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlVzZXIgdXBkYXRlIHN1Y2Nlc3NzZnVsbHlcIn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgLy8gYXN5bmMgbG9naW4ocmVxLCByZXMsIG5leHQpIHtcbiAgICAvLyAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIC8vICAgICB2YXIgdG9rZW4gPSBKV1RTaWduKHJlcS51c2VyLCBkYXRlKTtcbiAgICAvLyAgICAgcmVzLmNvb2tpZSgnWFNSRi10b2tlbicsdG9rZW4sIHtcbiAgICAvLyAgICAgICAgIGV4cGlyZTogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApLFxuICAgIC8vICAgICAgICAgaHR0cE9ubHk6IHRydWUsIHNlY3VyZTogY29uZmlnLmFwcC5zZWN1cmVcbiAgICAvLyAgICAgfSk7XG4gICAgICAgIFxuICAgIC8vICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlICx0b2tlbiwgcm9sZTogcmVxLnVzZXIucm9sZX0pO1xuICAgIC8vIH0sXG4gICAgYXN5bmMgbG9naW4ocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3Qge2VtYWlsLCBwYXNzd29yZCwgZGV2aWNlQ29kZSB9PSByZXEuYm9keVxuICAgICAgICAvLyB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBhc3N3b3JkKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhiY3J5cHQuaGFzaFN5bmMocGFzc3dvcmQpKVxuICAgICAgICBjb25zdCBmaW5kVXNlcj0gYXdhaXQgZGIudXNlci5maW5kT25lKHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCl9fSlcbiAgICAgICAgaWYoZmluZFVzZXIudmVyaWZ5ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGZpbmRVc2VyLnZlcmlmeSkge1xuICAgICAgICAgICAgaWYoZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA8PSAwICYmIGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV2aWNlMUNvZGU9IGdlbmVyYXRlUmFuZG9tU3RyaW5nKDEwKVxuICAgICAgICAgICAgICAgIGF3YWl0IGRiLnVzZXIudXBkYXRlKHtkZXZpY2UxOiBkZXZpY2UxQ29kZX0sIHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCl9fSlcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbj0gSldULnNpZ24oe3VpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWR9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHRva2VuLCBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSwgZGV2aWNlQ29kZTogZGV2aWNlMUNvZGUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPD0gMCAmJiBmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGV2aWNlMkNvZGU9IGdlbmVyYXRlUmFuZG9tU3RyaW5nKDEwKVxuICAgICAgICAgICAgICAgIGF3YWl0IGRiLnVzZXIudXBkYXRlKHtkZXZpY2UyOiBkZXZpY2UyQ29kZX0sIHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCl9fSlcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbj0gSldULnNpZ24oe3VpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWR9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHRva2VuLCBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSwgZGV2aWNlQ29kZTogZGV2aWNlMkNvZGUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPD0gMCAmJiBmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZXZpY2UxQ29kZT0gZ2VuZXJhdGVSYW5kb21TdHJpbmcoMTApXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGV2aWNlMUNvZGUpXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YT0gYXdhaXQgZGIudXNlci51cGRhdGUoe2RldmljZTE6IGRldmljZTFDb2RlfSwge3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW49IEpXVC5zaWduKHt1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB0b2tlbiwgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLCBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsIGRldmljZUNvZGU6IGRldmljZTFDb2RlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoID4gMCAmJiBmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbmRVc2VyZGV2aWNlMT0gYXdhaXQgZGIudXNlci5maW5kT25lKHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCksIGRldmljZTE6IGRldmljZUNvZGV9fSlcbiAgICAgICAgICAgICAgICBjb25zdCBmaW5kVXNlcmRldmljZTI9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpLCBkZXZpY2UyOiBkZXZpY2VDb2RlfX0pXG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW49IEpXVC5zaWduKHt1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVClcbiAgICAgICAgICAgICAgICBpZihmaW5kVXNlcmRldmljZTE/LmVtYWlsIHx8IGZpbmRVc2VyZGV2aWNlMj8uZW1haWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coNSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdG9rZW4sIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSwgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLCBkZXZpY2VDb2RlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coNilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbG9naW46IGZhbHNlLCB0aGlyZDogdHJ1ZX0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAgYXN5bmMgZGVsZXRlVXNlckxpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHJlcS5ib2R5LmlkfSB9KVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnVzZXIuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5pZCB9IH0pLnRoZW4ociA9PiBbciwgZGF0YV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ1VzZXIgaXMgbm90IGZvdW5kJywgNDA5KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3RhdHVzJzogXCJkZWxldGVkIHVzZXJsaXN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgIH0pXG4gICAgfSxcbiAgICBhc3luYyB2ZXJpZnlNYWlsKHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBOaOG6rW4gZW1haWwgdOG7qyByZXF1ZXN0IGJvZHlcbiAgICAgICAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkLCBmaXJzdE5hbWUgfSA9IHJlcS5ib2R5O1xuICAgIFxuICAgICAgICAgICAgLy8gVOG6oW8gbeG7mXQgbcOjIHjDoWMgdGjhu7FjIG5n4bqrdSBuaGnDqm5cbiAgICAgICAgICAgXG4gICAgXG4gICAgICAgICAgICAvLyBD4bqldSBow6xuaCB0aMO0bmcgdGluIG1haWwgc2VydmVyIChkw7luZyBHbWFpbCBsw6BtIHbDrSBk4bulKVxuICAgICAgICAgICAgY29uc3QgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XG4gICAgICAgICAgICAgICAgc2VydmljZTogJ2dtYWlsJyxcbiAgICAgICAgICAgICAgICBhdXRoOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IHByb2Nlc3MuZW52Lk1BSUxfVVNFUk5BTUUsIC8vIFRoYXkgYuG6sW5nIMSR4buLYSBjaOG7iSBlbWFpbCBj4bunYSBi4bqhblxuICAgICAgICAgICAgICAgICAgICBwYXNzOiBwcm9jZXNzLmVudi5NQUlMX1BBU1NXT1JEIC8vIFRoYXkgYuG6sW5nIG3huq10IGto4bqpdSBlbWFpbCBj4bunYSBi4bqhblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgLy8gQ+G6pXUgaMOsbmggbuG7mWkgZHVuZyBlbWFpbFxuICAgICAgICAgICAgY29uc3QgbWFpbE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgZnJvbTogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSwgLy8gVGhheSBi4bqxbmcgxJHhu4thIGNo4buJIGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgdG86IGVtYWlsLCAvLyDEkOG7i2EgY2jhu4kgZW1haWwgbmfGsOG7nWkgZMO5bmcgY+G6p24geMOhYyB0aOG7sWNcbiAgICAgICAgICAgICAgICBzdWJqZWN0OiAnRW1haWwgVmVyaWZpY2F0aW9uJywgLy8gVGnDqnUgxJHhu4EgZW1haWxcbiAgICAgICAgICAgICAgICBodG1sOiBgXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke3Byb2Nlc3MuZW52LlVSTF9GUk9OVEVORH0vc2lnbnVwL3N1Y2Nlc3NcIiBzdHlsZT1cInBhZGRpbmc6IDEwcHg7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGJhY2tncm91bmQtY29sb3I6ICMyZTg5ZmY7IGNvbG9yOiAjZmZmOyB3aWR0aDogMTAwJVwiPkNsaWNrIGhlcmUgdG8gY29tcGxldGUgc2luZ3VwIHByb2Nlc3M8L2E+XG4gICAgICAgICAgICAgICAgYCAvLyBO4buZaSBkdW5nIGVtYWlsIGNo4bupYSBtw6MgeMOhYyB0aOG7sWNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEfhu61pIGVtYWlsXG4gICAgICAgICAgICBhd2FpdCB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucyk7XG4gICAgICAgICAgICAvLyBUcuG6oyB24buBIG3DoyB4w6FjIHRo4buxYyDEkeG7gyBz4butIGThu6VuZyBzYXUgbsOgeSAodsOtIGThu6UgxJHhu4Mga2nhu4NtIHRyYSBtw6Mga2hpIG5nxrDhu51pIGTDuW5nIG5o4bqtcCB2w6BvKVxuICAgICAgICAgICAgcmVzLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gWOG7rSBsw70gbOG7l2kgbuG6v3UgY8OzXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzZW5kaW5nIHZlcmlmaWNhdGlvbiBlbWFpbDonLCBlcnJvcik7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0Vycm9yIHNlbmRpbmcgdmVyaWZpY2F0aW9uIGVtYWlsJyB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cblxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFDQSxJQUFBQyxhQUFBLEdBQUFDLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBRyxPQUFBLEdBQUFELHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBSSxPQUFBLEdBQUFGLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBSyxhQUFBLEdBQUFILHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBTSxVQUFBLEdBQUFKLHNCQUFBLENBQUFGLE9BQUE7QUFFQSxJQUFBTyxHQUFBLEdBQUFMLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBUSxXQUFBLEdBQUFOLHNCQUFBLENBQUFGLE9BQUE7QUFGQTs7QUFJQSxJQUFJUyxPQUFPLEdBQUcsU0FBVkEsT0FBT0EsQ0FBYUMsSUFBSSxFQUFFQyxJQUFJLEVBQUU7RUFDaEMsT0FBT0Msd0JBQUcsQ0FBQ0MsSUFBSSxDQUFDO0lBQ1pDLEdBQUcsRUFBRUMsa0JBQU0sQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJO0lBQ3BCQyxHQUFHLEVBQUVSLElBQUksQ0FBQ1MsRUFBRTtJQUNaQyxHQUFHLEVBQUdWLElBQUksQ0FBQ1csSUFBSTtJQUNmQyxHQUFHLEVBQUVYLElBQUksQ0FBQ1ksT0FBTyxDQUFDLENBQUM7SUFDbkJDLEdBQUcsRUFBRSxJQUFJQyxJQUFJLENBQUMsQ0FBQyxDQUFDQyxVQUFVLENBQUNmLElBQUksQ0FBQ2dCLFVBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBRTtFQUNyRCxDQUFDLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVLElBQUksUUFBUSxDQUFDO0FBQzFDLENBQUM7QUFFRCxTQUFTQyxvQkFBb0JBLENBQUNDLE1BQU0sRUFBRTtFQUNsQyxJQUFNQyxVQUFVLEdBQUcsZ0VBQWdFO0VBQ25GLElBQUlDLE1BQU0sR0FBRyxFQUFFO0VBQ2YsSUFB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