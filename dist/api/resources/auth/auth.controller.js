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
      var _req$body3, email, password, deviceCode, findUser, token;
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
            if (!((findUser === null || findUser === void 0 ? void 0 : findUser.verify) === null)) {
              _context5.next = 8;
              break;
            }
            return _context5.abrupt("return", res.status(200).json({
              success: false
            }));
          case 8:
            if (!(findUser !== null && findUser !== void 0 && findUser.verify)) {
              _context5.next = 13;
              break;
            }
            token = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id
            }, process.env.JWT_SECRET || "123456");
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: token,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName)
            }));
          case 13:
            return _context5.abrupt("return", res.status(200).json({
              success: false
            }));
          case 14:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImxlbmd0aCIsImNoYXJhY3RlcnMiLCJyZXN1bHQiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiaSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlT3RwIiwidG9rZW4iLCJzcGVha2Vhc3kiLCJ0b3RwIiwic2VjcmV0IiwiT1RQX0tFWSIsImVuY29kaW5nIiwic3RlcCIsInZlcmlmeU90cCIsImV4cGlyeSIsInZlcmlmeSIsIndpbmRvdyIsIl9kZWZhdWx0IiwiYWRkVXNlciIsInJlcSIsInJlcyIsIm5leHQiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIl9yZXEkYm9keSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicGhvbmUiLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJwYXNzd29yZEhhc2giLCJvdHAiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwibWQ1IiwiY29uc29sZSIsImxvZyIsImRiIiwiZmluZE9uZSIsIndoZXJlIiwicGFyYW5vaWQiLCJ0aGVuIiwiZmluZCIsInN0YXR1cyIsImpzb24iLCJjcmVhdGUiLCJtYWlsZXIiLCJzZW5kRW1wbG95ZWVQYXNzd29yZCIsInN1Y2Nlc3MiLCJrZXkiLCJtc2ciLCJlcnIiLCJzdG9wIiwiZmluZFVzZXIiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImF0dHJpYnV0ZXMiLCJxdWVyeSIsInVzZXJfaWQiLCJkYXRhIiwib2siLCJnZXRBbGxVc2VyTGlzdCIsIl9jYWxsZWUzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiZmluZEFsbCIsInVzZXJVcGRhdGUiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJSZXF1ZXN0RXJyb3IiLCJ1cGRhdGUiLCJsb2dpbiIsIl9jYWxsZWU1IiwiX3JlcSRib2R5MyIsImRldmljZUNvZGUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJzZW50IiwiYWJydXB0IiwidWlkIiwiZGF0YVZhbHVlcyIsImF1aWQiLCJkZWxldGVVc2VyTGlzdCIsIl9jYWxsZWU2IiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiZGVzdHJveSIsInIiLCJyZSIsInZlcmlmeU1haWwiLCJfY2FsbGVlNyIsIl9yZXEkYm9keTQiLCJ0cmFuc3BvcnRlciIsIm1haWxPcHRpb25zIiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3Iiwibm9kZW1haWxlciIsImNyZWF0ZVRyYW5zcG9ydCIsInNlcnZpY2UiLCJhdXRoIiwiTUFJTF9VU0VSTkFNRSIsInBhc3MiLCJNQUlMX1BBU1NXT1JEIiwiZnJvbSIsInRvIiwic3ViamVjdCIsImh0bWwiLCJjb25jYXQiLCJVUkxfRlJPTlRFTkQiLCJzZW5kTWFpbCIsInQwIiwiZXJyb3IiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvYXV0aC9hdXRoLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMnO1xuaW1wb3J0IEpXVCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IG1haWxlciBmcm9tICcuLi8uLi8uLi9tYWlsZXInO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi8uLi9jb25maWcnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQtbm9kZWpzJztcbmltcG9ydCBzcGVha2Vhc3kgZnJvbSAnc3BlYWtlYXN5Jztcbi8vIGltcG9ydCB7IHZhbGlkYXRlRW1haWwgfSBmcm9tICcuLy4uLy4uLy4uL2Z1bmN0aW9ucydcbmltcG9ydCBtZDUgZnJvbSBcIm1kNVwiXG5pbXBvcnQgbm9kZW1haWxlciBmcm9tIFwibm9kZW1haWxlclwiXG5cbnZhciBKV1RTaWduID0gZnVuY3Rpb24gKHVzZXIsIGRhdGUpIHtcbiAgICByZXR1cm4gSldULnNpZ24oe1xuICAgICAgICBpc3M6IGNvbmZpZy5hcHAubmFtZSxcbiAgICAgICAgc3ViOiB1c2VyLmlkLFxuICAgICAgICBpYW0gOiB1c2VyLnR5cGUsXG4gICAgICAgIGlhdDogZGF0ZS5nZXRUaW1lKCksXG4gICAgICAgIGV4cDogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApXG4gICAgfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCBcIjEyMzQ1NlwiKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb21TdHJpbmcobGVuZ3RoKSB7XG4gICAgY29uc3QgY2hhcmFjdGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVPdHAoKSB7XG4gICAgbGV0IHRva2VuID0gc3BlYWtlYXN5LnRvdHAoe1xuICAgICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXG4gICAgICAgIGVuY29kaW5nOiAnYmFzZTMyJyxcbiAgICAgICAgc3RlcDogKDMwIC0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjAgJSAzMCkpKVxuICAgIH0pO1xuICAgIHJldHVybiB0b2tlbjtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5T3RwKHRva2VuKSB7XG4gICAgbGV0IGV4cGlyeSA9IHNwZWFrZWFzeS50b3RwLnZlcmlmeSh7XG4gICAgICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuT1RQX0tFWSxcbiAgICAgICAgZW5jb2Rpbmc6ICdiYXNlMzInLFxuICAgICAgICB0b2tlbjogdG9rZW4sXG4gICAgICAgIHN0ZXA6ICgzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wICUgMzApKSksXG4gICAgICAgIHdpbmRvdzogMFxuICAgIH0pO1xuICAgIHJldHVybiBleHBpcnlcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXN5bmMgYWRkVXNlcihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBjb25zdCB7IGZpcnN0TmFtZSwgbGFzdE5hbWUsIHBob25lLCBlbWFpbCwgYWRkcmVzcywgcGFzc3dvcmQsIHJvbGUsIHZlcmlmeSB9ID0gcmVxLmJvZHk7XG4gICAgICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQpO1xuICAgICAgICBjb25zb2xlLmxvZyhwYXNzd29yZEhhc2gpXG4gICAgICAgIHZhciB0b2tlbiA9IGdlbmVyYXRlT3RwKCk7XG4gICAgICAgIHZhciBvdHAgPSB2ZXJpZnlPdHAodG9rZW4pO1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBlbWFpbDogZW1haWwgfSwgcGFyYW5vaWQ6IGZhbHNlIH0pXG4gICAgICAgICAgICAudGhlbihmaW5kID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmluZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDkpLmpzb24oXCJFbWFpbCBpcyBhbHJlYWR5IGluIHVzZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRiLnVzZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogcGhvbmUsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEhhc2gsXG4gICAgICAgICAgICAgICAgICAgIHZlcmlmeTogdmVyaWZ5LFxuICAgICAgICAgICAgICAgICAgICByb2xlOiByb2xlXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIG1haWxlci5zZW5kRW1wbG95ZWVQYXNzd29yZChlbWFpbCwgdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBrZXk6IG90cCwgbXNnOiBcIk5ldyBSZWdpc3RyYXRpb24gYWRkZWQgYW5kIHBhc3N3b3JkIGhhcyBiZWVuIHNlbnQgdG8gXCIgKyBlbWFpbCArIFwiIC5cIiB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgfSxcblxuICAgIGFzeW5jIGZpbmRVc2VyKHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IGF0dHJpYnV0ZXM6W1wiZmlyc3ROYW1lXCIsXCJsYXN0TmFtZVwiLCBcImVtYWlsXCJdLCB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LnVzZXJfaWQgfX0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXIsIG9rOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgIGFzeW5jIGdldEFsbFVzZXJMaXN0KHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGRiLnVzZXIuZmluZEFsbCgpXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXJ9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAgYXN5bmMgdXNlclVwZGF0ZShyZXEscmVzLG5leHQpe1xuICAgICAgICBjb25zdCB7IGlkLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgYWRkcmVzcywgcGFzc3dvcmQsIHJvbGUsIHZlcmlmeSwgcGhvbmUsIHN0YXR1cyB9ID0gcmVxLmJvZHk7XG4gICAgICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQpO1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBlbWFpbDogZW1haWwgfSwgcGFyYW5vaWQ6IGZhbHNlIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignVXNlciBpcyBub3QgZm91bmQnLCA0MDkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSA/IGZpcnN0TmFtZTogdXNlci5maXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSA/IGxhc3ROYW1lOiB1c2VyLmxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQgPyBwYXNzd29yZEhhc2g6IHVzZXIucGFzc3dvcmRIYXNoLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IHVzZXIuYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZSA/IHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgdmVyaWZ5IDogc3RhdHVzPyBzdGF0dXM6IHVzZXIudmVyaWZ5LFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogcGhvbmUgPyBwaG9uZSA6IHVzZXIucGhvbmVcbiAgICAgICAgICAgICAgICB9LCB7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiVXNlciB1cGRhdGUgc3VjY2Vzc3NmdWxseVwifSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAvLyBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAgIC8vICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgLy8gICAgIHZhciB0b2tlbiA9IEpXVFNpZ24ocmVxLnVzZXIsIGRhdGUpO1xuICAgIC8vICAgICByZXMuY29va2llKCdYU1JGLXRva2VuJyx0b2tlbiwge1xuICAgIC8vICAgICAgICAgZXhwaXJlOiBuZXcgRGF0ZSgpLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyAzMCksXG4gICAgLy8gICAgICAgICBodHRwT25seTogdHJ1ZSwgc2VjdXJlOiBjb25maWcuYXBwLnNlY3VyZVxuICAgIC8vICAgICB9KTtcbiAgICAgICAgXG4gICAgLy8gICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgLHRva2VuLCByb2xlOiByZXEudXNlci5yb2xlfSk7XG4gICAgLy8gfSxcbiAgICBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBjb25zdCB7ZW1haWwsIHBhc3N3b3JkLCBkZXZpY2VDb2RlIH09IHJlcS5ib2R5XG4gICAgICAgIC8vIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGFzc3dvcmQpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCkpXG4gICAgICAgIGNvbnN0IGZpbmRVc2VyPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxuICAgICAgICBpZihmaW5kVXNlcj8udmVyaWZ5ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGZpbmRVc2VyPy52ZXJpZnkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgXCIxMjM0NTZcIilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHRva2VuLCBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgICBhc3luYyBkZWxldGVVc2VyTGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcmVxLmJvZHkuaWR9IH0pXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHJlcS5ib2R5LmlkIH0gfSkudGhlbihyID0+IFtyLCBkYXRhXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignVXNlciBpcyBub3QgZm91bmQnLCA0MDkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdGF0dXMnOiBcImRlbGV0ZWQgdXNlcmxpc3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSlcbiAgICB9LFxuICAgIGFzeW5jIHZlcmlmeU1haWwocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIE5o4bqtbiBlbWFpbCB04burIHJlcXVlc3QgYm9keVxuICAgICAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIGZpcnN0TmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgXG4gICAgICAgICAgICAvLyBU4bqhbyBt4buZdCBtw6MgeMOhYyB0aOG7sWMgbmfhuqt1IG5oacOqblxuICAgICAgICAgICBcbiAgICBcbiAgICAgICAgICAgIC8vIEPhuqV1IGjDrG5oIHRow7RuZyB0aW4gbWFpbCBzZXJ2ZXIgKGTDuW5nIEdtYWlsIGzDoG0gdsOtIGThu6UpXG4gICAgICAgICAgICBjb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiAnZ21haWwnLFxuICAgICAgICAgICAgICAgIGF1dGg6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSwgLy8gVGhheSBi4bqxbmcgxJHhu4thIGNo4buJIGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52Lk1BSUxfUEFTU1dPUkQgLy8gVGhheSBi4bqxbmcgbeG6rXQga2jhuql1IGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICAvLyBD4bqldSBow6xuaCBu4buZaSBkdW5nIGVtYWlsXG4gICAgICAgICAgICBjb25zdCBtYWlsT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgICAgICAgICB0bzogZW1haWwsIC8vIMSQ4buLYSBjaOG7iSBlbWFpbCBuZ8aw4budaSBkw7luZyBj4bqnbiB4w6FjIHRo4buxY1xuICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdFbWFpbCBWZXJpZmljYXRpb24nLCAvLyBUacOqdSDEkeG7gSBlbWFpbFxuICAgICAgICAgICAgICAgIGh0bWw6IGBcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7cHJvY2Vzcy5lbnYuVVJMX0ZST05URU5EfS9zaWdudXAvc3VjY2Vzc1wiIHN0eWxlPVwicGFkZGluZzogMTBweDsgYm9yZGVyLXJhZGl1czogMTBweDsgYmFja2dyb3VuZC1jb2xvcjogIzJlODlmZjsgY29sb3I6ICNmZmY7IHdpZHRoOiAxMDAlXCI+Q2xpY2sgaGVyZSB0byBjb21wbGV0ZSBzaW5ndXAgcHJvY2VzczwvYT5cbiAgICAgICAgICAgICAgICBgIC8vIE7hu5lpIGR1bmcgZW1haWwgY2jhu6lhIG3DoyB4w6FjIHRo4buxY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gR+G7rWkgZW1haWxcbiAgICAgICAgICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcbiAgICAgICAgICAgIC8vIFRy4bqjIHbhu4EgbcOjIHjDoWMgdGjhu7FjIMSR4buDIHPhu60gZOG7pW5nIHNhdSBuw6B5ICh2w60gZOG7pSDEkeG7gyBraeG7g20gdHJhIG3DoyBraGkgbmfGsOG7nWkgZMO5bmcgbmjhuq1wIHbDoG8pXG4gICAgICAgICAgICByZXMuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBY4butIGzDvSBs4buXaSBu4bq/dSBjw7NcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlbmRpbmcgdmVyaWZpY2F0aW9uIGVtYWlsOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRXJyb3Igc2VuZGluZyB2ZXJpZmljYXRpb24gZW1haWwnIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLGFBQUEsR0FBQUMsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFHLE9BQUEsR0FBQUQsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFJLE9BQUEsR0FBQUYs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