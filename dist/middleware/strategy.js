"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localStrategy = exports.jwtStrategy = exports.customerStrategy = void 0;
var _passport = _interopRequireDefault(require("passport"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("../config"));
var JWTSign = function JWTSign(iss, user, date) {
  return _jsonwebtoken["default"].sign({
    iss: iss,
    sub: user.id,
    iam: user.type,
    iat: date.getTime(),
    exp: new Date().setMinutes(date.getMinutes() + 30)
  }, _config["default"].app.secret);
};
var jwtStrategy = function jwtStrategy(req, res, next) {
  _passport["default"].authenticate('user-jwt', {
    session: false
  }, function (err, user, info) {
    var contype = req.headers['content-type'];
    var json = !(!contype || contype.indexOf('application/json') !== 0);
    if (err && err == 'expired') {
      return json ? res.status(500).json({
        errors: ['Session is expired']
      }) : res.redirect('/auth/login');
    }
    if (err && err == 'invalid') {
      return json ? res.status(500).json({
        errors: ['Invalid token recieved']
      }) : res.redirect('/logout');
    }
    if (err && err == 'user') {
      return json ? res.status(500).json({
        errors: ['Invalid user recieved']
      }) : res.redirect('/logout');
    }
    if (err && Object.keys(err).length) {
      return res.status(500).json({
        errors: [err]
      });
    }
    if (err) {
      return res.status(500).json({
        errors: ['Invalid user recieved']
      });
    }
    if (!user) {
      return json ? res.status(500).json({
        errors: ['Invalid user recieved']
      }) : res.redirect('/logout');
    }
    req.user = user;
    next();
  })(req, res, next);
};
exports.jwtStrategy = jwtStrategy;
var localStrategy = function localStrategy(req, res, next) {
  _passport["default"].authenticate('user-local', {
    session: false
  }, function (err, user, info) {
    console.log(err);
    if (err && err == 'invalid') {
      return res.status(500).json({
        errors: ['Email Id not verified']
      });
    }
    if (err && err == 'attempt') {
      return res.status(500).json({
        errors: ['Too many invalid attempts. Please reset your password.']
      });
    }
    if (err && err.startsWith('attempt:')) {
      return res.status(500).json({
        errors: ['Invalid Credentials (' + err.split(':')[1] + ' Attempt(s) Left)']
      });
    }
    if (err) {
      return res.status(500).json({
        errors: [err]
      });
    }
    if (!user) {
      return res.status(500).json({
        errors: ['Invalid Credentials']
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
exports.localStrategy = localStrategy;
var customerStrategy = function customerStrategy(req, res, next) {
  _passport["default"].authenticate('customer-local', {
    session: false
  }, function (err, user, info) {
    if (err && err == 'invalid') {
      return res.status(500).json({
        errors: ['Email Id not verified']
      });
    }
    if (err && err == 'attempt') {
      return res.status(500).json({
        errors: ['Too many invalid attempts. Please reset your password.']
      });
    }
    if (err && err.startsWith('attempt:')) {
      return res.status(500).json({
        errors: ['Invalid Credentials (' + err.split(':')[1] + ' Attempt(s) Left)']
      });
    }
    if (err) {
      return res.status(500).json({
        errors: [err]
      });
    }
    if (!user) {
      return res.status(500).json({
        errors: ['Invalid Credentials']
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
exports.customerStrategy = customerStrategy;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcGFzc3BvcnQiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfY29uZmlnIiwiSldUU2lnbiIsImlzcyIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsInN1YiIsImlkIiwiaWFtIiwidHlwZSIsImlhdCIsImdldFRpbWUiLCJleHAiLCJEYXRlIiwic2V0TWludXRlcyIsImdldE1pbnV0ZXMiLCJjb25maWciLCJhcHAiLCJzZWNyZXQiLCJqd3RTdHJhdGVneSIsInJlcSIsInJlcyIsIm5leHQiLCJwYXNzcG9ydCIsImF1dGhlbnRpY2F0ZSIsInNlc3Npb24iLCJlcnIiLCJpbmZvIiwiY29udHlwZSIsImhlYWRlcnMiLCJqc29uIiwiaW5kZXhPZiIsInN0YXR1cyIsImVycm9ycyIsInJlZGlyZWN0IiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImV4cG9ydHMiLCJsb2NhbFN0cmF0ZWd5IiwiY29uc29sZSIsImxvZyIsInN0YXJ0c1dpdGgiLCJzcGxpdCIsImN1c3RvbWVyU3RyYXRlZ3kiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZS9zdHJhdGVneS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGFzc3BvcnQgZnJvbSAncGFzc3BvcnQnO1xuaW1wb3J0IEpXVCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xuXG5jb25zdCBKV1RTaWduID0gZnVuY3Rpb24oaXNzLCB1c2VyLCBkYXRlKXtcbiAgICByZXR1cm4gSldULnNpZ24oe1xuICAgICAgICBpc3MgOiBpc3MsXG4gICAgICAgIHN1YiA6IHVzZXIuaWQsXG4gICAgICAgIGlhbSA6IHVzZXIudHlwZSxcbiAgICAgICAgaWF0IDogZGF0ZS5nZXRUaW1lKCksXG4gICAgICAgIGV4cCA6IG5ldyBEYXRlKCkuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIDMwKVxuICAgIH0sIGNvbmZpZy5hcHAuc2VjcmV0KTtcbn1cblxuZXhwb3J0IGNvbnN0IGp3dFN0cmF0ZWd5ID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgcGFzc3BvcnQuYXV0aGVudGljYXRlKCd1c2VyLWp3dCcsIHtzZXNzaW9uOiBmYWxzZX0sIChlcnIsIHVzZXIsIGluZm8pID0+IHsgXG4gICAgICAgIGxldCBjb250eXBlID0gcmVxLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddO1xuICAgICAgICB2YXIganNvbiA9ICEoIWNvbnR5cGUgfHwgY29udHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgIT09IDApO1xuICAgICAgICBpZiAoZXJyICYmIGVyciA9PSAnZXhwaXJlZCcpeyByZXR1cm4ganNvbj9yZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydTZXNzaW9uIGlzIGV4cGlyZWQnXX0pOnJlcy5yZWRpcmVjdCgnL2F1dGgvbG9naW4nKTsgfVxuICAgICAgICBpZiAoZXJyICYmIGVyciA9PSAnaW52YWxpZCcpeyByZXR1cm4ganNvbj9yZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydJbnZhbGlkIHRva2VuIHJlY2lldmVkJ119KTpyZXMucmVkaXJlY3QoJy9sb2dvdXQnKTsgfVxuICAgICAgICBpZiAoZXJyICYmIGVyciA9PSAndXNlcicpeyByZXR1cm4ganNvbj9yZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydJbnZhbGlkIHVzZXIgcmVjaWV2ZWQnXX0pOnJlcy5yZWRpcmVjdCgnL2xvZ291dCcpOyB9XG4gICAgICAgIGlmIChlcnIgJiYgT2JqZWN0LmtleXMoZXJyKS5sZW5ndGgpIHsgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbIGVyciBdfSk7IH1cbiAgICAgICAgaWYgKGVycikgeyByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsgJ0ludmFsaWQgdXNlciByZWNpZXZlZCcgXX0pOyB9XG4gICAgICAgIGlmICghdXNlcikgeyByZXR1cm4ganNvbj9yZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydJbnZhbGlkIHVzZXIgcmVjaWV2ZWQnXX0pOnJlcy5yZWRpcmVjdCgnL2xvZ291dCcpOyB9XG4gICAgICAgIHJlcS51c2VyID0gdXNlcjtcbiAgICAgICAgbmV4dCgpO1xuICAgIH0pKHJlcSwgcmVzLCBuZXh0KTtcbn07XG5cbmV4cG9ydCB2YXIgbG9jYWxTdHJhdGVneSA9IChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgndXNlci1sb2NhbCcsIHtzZXNzaW9uOiBmYWxzZX0sIChlcnIsIHVzZXIsIGluZm8pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICBpZiAoZXJyICYmIGVyciA9PSAnaW52YWxpZCcpIHsgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbJ0VtYWlsIElkIG5vdCB2ZXJpZmllZCddfSk7IH1cbiAgICAgICAgaWYgKGVyciAmJiBlcnIgPT0gJ2F0dGVtcHQnKSB7IHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydUb28gbWFueSBpbnZhbGlkIGF0dGVtcHRzLiBQbGVhc2UgcmVzZXQgeW91ciBwYXNzd29yZC4nXX0pOyB9XG4gICAgICAgIGlmIChlcnIgJiYgZXJyLnN0YXJ0c1dpdGgoJ2F0dGVtcHQ6JykpIHsgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbJ0ludmFsaWQgQ3JlZGVudGlhbHMgKCcgKyBlcnIuc3BsaXQoJzonKVsxXSsnIEF0dGVtcHQocykgTGVmdCknXX0pOyB9XG4gICAgICAgIGlmIChlcnIpIHsgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbIGVyciBdfSk7IH1cbiAgICAgICAgaWYgKCF1c2VyKSB7IHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydJbnZhbGlkIENyZWRlbnRpYWxzJ119KTsgfVxuICAgICAgICByZXEudXNlciA9IHVzZXI7XG4gICAgICAgIG5leHQoKTtcbiAgICB9KShyZXEsIHJlcywgbmV4dCk7XG59O1xuXG5leHBvcnQgdmFyIGN1c3RvbWVyU3RyYXRlZ3kgPSAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICBwYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2N1c3RvbWVyLWxvY2FsJywge3Nlc3Npb246IGZhbHNlfSwgKGVyciwgdXNlciwgaW5mbykgPT4ge1xuICAgICAgICBpZiAoZXJyICYmIGVyciA9PSAnaW52YWxpZCcpIHsgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbJ0VtYWlsIElkIG5vdCB2ZXJpZmllZCddfSk7IH1cbiAgICAgICAgaWYgKGVyciAmJiBlcnIgPT0gJ2F0dGVtcHQnKSB7IHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydUb28gbWFueSBpbnZhbGlkIGF0dGVtcHRzLiBQbGVhc2UgcmVzZXQgeW91ciBwYXNzd29yZC4nXX0pOyB9XG4gICAgICAgIGlmIChlcnIgJiYgZXJyLnN0YXJ0c1dpdGgoJ2F0dGVtcHQ6JykpIHsgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbJ0ludmFsaWQgQ3JlZGVudGlhbHMgKCcgKyBlcnIuc3BsaXQoJzonKVsxXSsnIEF0dGVtcHQocykgTGVmdCknXX0pOyB9XG4gICAgICAgIGlmIChlcnIpIHsgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbIGVyciBdfSk7IH1cbiAgICAgICAgaWYgKCF1c2VyKSB7IHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydJbnZhbGlkIENyZWRlbnRpYWxzJ119KTsgfVxuICAgICAgICByZXEudXNlciA9IHVzZXI7XG4gICAgICAgIG5leHQoKTtcbiAgICB9KShyZXEsIHJlcywgbmV4dCk7XG59OyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQUFBLFNBQUEs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