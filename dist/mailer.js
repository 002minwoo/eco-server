"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _config = _interopRequireDefault(require("./config"));
var _models = require("./models");
var _default = {
  sendEmployeePassword: function sendEmployeePassword(email, otp) {
    return new Promise(function (resolve, reject) {
      try {
        _models.db.customer.findOne({
          where: {
            email: email
          }
        }).then(function (user) {
          if (user) {
            var smtpTransport = _nodemailer["default"].createTransport({
              host: process.env.MAIL_HOST,
              port: process.env.MAIL_PORT,
              auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
              },
              tls: {
                rejectUnauthorized: false
              }
            });
            smtpTransport.sendMail({
              from: process.env.MAIL_FROM,
              to: email,
              subject: "Grocery blogging website",
              html: "Dear user,<br><br> Thank you for registering with Janakpur.<br> <br> <b>" + otp + "</b><br> <br> This link will expire in 30sec. <br> This is a system generated mail. Please do not reply to this email ID.<br>Warm Regards,<br> Customer Care<br> Grocerry"
              // html: "Hi <br>" + "Your One Time Password(OTP) for completing your registeration on KDMARC is  " + password + " .Please do not share OTP with anyone .<br> Best Regards, <br> Team KDMARC",
            }, function (error, info) {
              if (error) {
                return reject({
                  name: "GrocerryException",
                  msg: "Email Sending Failed"
                });
              }
              return resolve(true);
            });
          } else throw {
            name: "GrocerrryException",
            msg: "Email Body not available"
          };
        });
      } catch (err) {
        reject(err);
      }
    });
  },
  replyContact: function () {
    var _replyContact = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, content) {
      var transporter, mailOptions;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            transporter = _nodemailer["default"].createTransport({
              service: "gmail",
              auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
              }
            });
            mailOptions = {
              from: process.env.MAIL_USERNAME,
              to: email,
              subject: "Sending Email from FPT shop",
              text: content
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                throw error;
              } else {
                console.log('Email sent: ' + info.response);
                return 1;
              }
            });
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function replyContact(_x, _x2) {
      return _replyContact.apply(this, arguments);
    }
    return replyContact;
  }(),
  sendUserOrder: function () {
    var _sendUserOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, content) {
      var transporter, mailOptions;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            transporter = _nodemailer["default"].createTransport({
              service: "gmail",
              auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
              }
            });
            mailOptions = {
              from: process.env.MAIL_USERNAME,
              to: email,
              subject: "Sending Email from FPT shop",
              text: content
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                throw error;
              } else {
                console.log('Email sent: ' + info.response);
                return 1;
              }
            });
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function sendUserOrder(_x3, _x4) {
      return _sendUserOrder.apply(this, arguments);
    }
    return sendUserOrder;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbm9kZW1haWxlciIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2NvbmZpZyIsIl9tb2RlbHMiLCJfZGVmYXVsdCIsInNlbmRFbXBsb3llZVBhc3N3b3JkIiwiZW1haWwiLCJvdHAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRiIiwiY3VzdG9tZXIiLCJmaW5kT25lIiwid2hlcmUiLCJ0aGVuIiwidXNlciIsInNtdHBUcmFuc3BvcnQiLCJub2RlbWFpbGVyIiwiY3JlYXRlVHJhbnNwb3J0IiwiaG9zdCIsInByb2Nlc3MiLCJlbnYiLCJNQUlMX0hPU1QiLCJwb3J0IiwiTUFJTF9QT1JUIiwiYXV0aCIsIk1BSUxfVVNFUk5BTUUiLCJwYXNzIiwiTUFJTF9QQVNTV09SRCIsInRscyIsInJlamVjdFVuYXV0aG9yaXplZCIsInNlbmRNYWlsIiwiZnJvbSIsIk1BSUxfRlJPTSIsInRvIiwic3ViamVjdCIsImh0bWwiLCJlcnJvciIsImluZm8iLCJuYW1lIiwibXNnIiwiZXJyIiwicmVwbHlDb250YWN0IiwiX3JlcGx5Q29udGFjdCIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiY29udGVudCIsInRyYW5zcG9ydGVyIiwibWFpbE9wdGlvbnMiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0Iiwic2VydmljZSIsInRleHQiLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2UiLCJzdG9wIiwiX3giLCJfeDIiLCJhcHBseSIsImFyZ3VtZW50cyIsInNlbmRVc2VyT3JkZXIiLCJfc2VuZFVzZXJPcmRlciIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiX3gzIiwiX3g0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWlsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBkYiB9IGZyb20gXCIuL21vZGVsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNlbmRFbXBsb3llZVBhc3N3b3JkOiAoZW1haWwsIG90cCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBkYi5jdXN0b21lci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0gfSkudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICB2YXIgc210cFRyYW5zcG9ydCA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgICAgICAgICAgICAgaG9zdDogcHJvY2Vzcy5lbnYuTUFJTF9IT1NULFxuICAgICAgICAgICAgICBwb3J0OiBwcm9jZXNzLmVudi5NQUlMX1BPUlQsXG4gICAgICAgICAgICAgIGF1dGg6IHtcbiAgICAgICAgICAgICAgICB1c2VyOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLFxuICAgICAgICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52Lk1BSUxfUEFTU1dPUkQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRsczogeyByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNtdHBUcmFuc3BvcnQuc2VuZE1haWwoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX0ZST00sXG4gICAgICAgICAgICAgICAgdG86IGVtYWlsLFxuICAgICAgICAgICAgICAgIHN1YmplY3Q6IFwiR3JvY2VyeSBibG9nZ2luZyB3ZWJzaXRlXCIsXG4gICAgICAgICAgICAgICAgaHRtbDpcbiAgICAgICAgICAgICAgICAgIFwiRGVhciB1c2VyLDxicj48YnI+IFRoYW5rIHlvdSBmb3IgcmVnaXN0ZXJpbmcgd2l0aCBKYW5ha3B1ci48YnI+IDxicj4gPGI+XCIgK1xuICAgICAgICAgICAgICAgICAgb3RwICtcbiAgICAgICAgICAgICAgICAgIFwiPC9iPjxicj4gPGJyPiBUaGlzIGxpbmsgd2lsbCBleHBpcmUgaW4gMzBzZWMuIDxicj4gVGhpcyBpcyBhIHN5c3RlbSBnZW5lcmF0ZWQgbWFpbC4gUGxlYXNlIGRvIG5vdCByZXBseSB0byB0aGlzIGVtYWlsIElELjxicj5XYXJtIFJlZ2FyZHMsPGJyPiBDdXN0b21lciBDYXJlPGJyPiBHcm9jZXJyeVwiLFxuICAgICAgICAgICAgICAgIC8vIGh0bWw6IFwiSGkgPGJyPlwiICsgXCJZb3VyIE9uZSBUaW1lIFBhc3N3b3JkKE9UUCkgZm9yIGNvbXBsZXRpbmcgeW91ciByZWdpc3RlcmF0aW9uIG9uIEtETUFSQyBpcyAgXCIgKyBwYXNzd29yZCArIFwiIC5QbGVhc2UgZG8gbm90IHNoYXJlIE9UUCB3aXRoIGFueW9uZSAuPGJyPiBCZXN0IFJlZ2FyZHMsIDxicj4gVGVhbSBLRE1BUkNcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yLCBpbmZvKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJHcm9jZXJyeUV4Y2VwdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBtc2c6IFwiRW1haWwgU2VuZGluZyBGYWlsZWRcIixcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgICAgbmFtZTogXCJHcm9jZXJycnlFeGNlcHRpb25cIixcbiAgICAgICAgICAgICAgbXNnOiBcIkVtYWlsIEJvZHkgbm90IGF2YWlsYWJsZVwiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIHJlcGx5Q29udGFjdDogYXN5bmMgKGVtYWlsLCBjb250ZW50KSA9PiB7XG4gICAgdmFyIHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xuICAgICAgc2VydmljZTogXCJnbWFpbFwiLFxuICAgICAgYXV0aDoge1xuICAgICAgICB1c2VyOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLFxuICAgICAgICBwYXNzOiBwcm9jZXNzLmVudi5NQUlMX1BBU1NXT1JELFxuICAgICAgfSxcbiAgICB9KTtcbiAgICB2YXIgbWFpbE9wdGlvbnMgPSB7XG4gICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLFxuICAgICAgdG86IGVtYWlsLFxuICAgICAgc3ViamVjdDogXCJTZW5kaW5nIEVtYWlsIGZyb20gRlBUIHNob3BcIixcbiAgICAgIHRleHQ6IGNvbnRlbnQsXG4gICAgfTtcbiAgICB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucywgZnVuY3Rpb24oZXJyb3IsIGluZm8pe1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFbWFpbCBzZW50OiAnICsgaW5mby5yZXNwb25zZSk7XG4gICAgICAgIHJldHVybiAxXG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIHNlbmRVc2VyT3JkZXI6IGFzeW5jIChlbWFpbCwgY29udGVudCkgPT4ge1xuICAgIHZhciB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgICAgIHNlcnZpY2U6IFwiZ21haWxcIixcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgdXNlcjogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSxcbiAgICAgICAgcGFzczogcHJvY2Vzcy5lbnYuTUFJTF9QQVNTV09SRCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdmFyIG1haWxPcHRpb25zID0ge1xuICAgICAgZnJvbTogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSxcbiAgICAgIHRvOiBlbWFpbCxcbiAgICAgIHN1YmplY3Q6IFwiU2VuZGluZyBFbWFpbCBmcm9tIEZQVCBzaG9wXCIsXG4gICAgICB0ZXh0OiBjb250ZW50LFxuICAgIH07XG4gICAgdHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbE9wdGlvbnMsIGZ1bmN0aW9uKGVycm9yLCBpbmZvKXtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIHRocm93IGVycm9yXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnRW1haWwgc2VudDogJyArIGluZm8ucmVzcG9uc2UpO1xuICAgICAgICByZXR1cm4gMVxuICAgICAgfVxuICAgIH0pO1xuICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBQUEsV0FBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsT0FBQSxHQUFBRixzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUUsT0FBQSxHQUFBRixPQUFBO0FBQThCLElBQUFHLFFBQUEsR0FFZjtFQUNiQyxvQkFBb0IsRUFBRSxTQUFBQSxxQkFBQ0MsS0FBSyxFQUFFQyxHQUFHLEVBQUs7SUFDcEMsT0FBTyxJQUFJQyxPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFFQyxNQUFNLEVBQUs7TUFDdEMsSUFBSTtRQUNGQyxVQUFFLENBQUNDLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDO1VBQUVDLEtBQUssRUFBRTtZQUFFUixLQUFLLEVBQUVB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