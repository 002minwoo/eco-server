"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _stackTrace = _interopRequireDefault(require("stack-trace"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
global.RequestError = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(RequestError, _Error);
  var _super = _createSuper(RequestError);
  function RequestError(message, code, realError) {
    var _this;
    (0, _classCallCheck2["default"])(this, RequestError);
    if (realError instanceof RequestError) {
      _this = _super.call(this, realError.message, realError.code);
      _this.copyObject(realError);
      return (0, _possibleConstructorReturn2["default"])(_this);
    }
    if (!code) code = 500;
    _this = _super.call(this, message, code);
    _this.status = code;
    _this.errorList = [];
    if (message instanceof Array) {
      for (var i = 0; i < message.length; i++) {
        _this.errorList.push(message[i]);
      }
    } else {
      _this.errorList.push(message);
    }
    var trace = _stackTrace["default"].get();
    var consoleMessage = message;
    if (realError) consoleMessage = realError;
    console.error('\x1b[31mRequestError\x1b[0m', '\x1b[35m' + trace[1].getFileName().replace(__dirname, '') + '\x1b[0m', '\x1b[32m' + trace[1].getLineNumber() + ':' + trace[1].getColumnNumber() + '\x1b[0m', consoleMessage);
    return (0, _possibleConstructorReturn2["default"])(_this);
  }
  (0, _createClass2["default"])(RequestError, [{
    key: "copyObject",
    value: function copyObject(requestError) {
      this.errorList = requestError.errorList;
    }
  }]);
  return RequestError;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfc3RhY2tUcmFjZSIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2NyZWF0ZVN1cGVyIiwiRGVyaXZlZCIsImhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QiLCJfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0IiwiX2NyZWF0ZVN1cGVySW50ZXJuYWwiLCJTdXBlciIsIl9nZXRQcm90b3R5cGVPZjIiLCJyZXN1bHQiLCJOZXdUYXJnZXQiLCJjb25zdHJ1Y3RvciIsIlJlZmxlY3QiLCJjb25zdHJ1Y3QiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiIsInNoYW0iLCJQcm94eSIsIkJvb2xlYW4iLCJwcm90b3R5cGUiLCJ2YWx1ZU9mIiwiY2FsbCIsImUiLCJnbG9iYWwiLCJSZXF1ZXN0RXJyb3IiLCJfRXJyb3IiLCJfaW5oZXJpdHMyIiwiX3N1cGVyIiwibWVzc2FnZSIsImNvZGUiLCJyZWFsRXJyb3IiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjazIiLCJjb3B5T2JqZWN0Iiwic3RhdHVzIiwiZXJyb3JMaXN0IiwiQXJyYXkiLCJpIiwibGVuZ3RoIiwicHVzaCIsInRyYWNlIiwic3RhY2tUcmFjZSIsImdldCIsImNvbnNvbGVNZXNzYWdlIiwiY29uc29sZSIsImVycm9yIiwiZ2V0RmlsZU5hbWUiLCJyZXBsYWNlIiwiX19kaXJuYW1lIiwiZ2V0TGluZU51bWJlciIsImdldENvbHVtbk51bWJlciIsIl9jcmVhdGVDbGFzczIiLCJrZXkiLCJ2YWx1ZSIsInJlcXVlc3RFcnJvciIsIl93cmFwTmF0aXZlU3VwZXIyIiwiRXJyb3IiXSwic291cmNlcyI6WyIuLi9zcmMvZXJyb3JzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdGFja1RyYWNlIGZyb20gJ3N0YWNrLXRyYWNlJztcblxuZ2xvYmFsLlJlcXVlc3RFcnJvciA9ICBjbGFzcyBSZXF1ZXN0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29weU9iamVjdChyZXF1ZXN0RXJyb3IpIHtcbiAgICAgICAgdGhpcy5lcnJvckxpc3QgPSByZXF1ZXN0RXJyb3IuZXJyb3JMaXN0O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGNvZGUsIHJlYWxFcnJvcikge1xuICAgICAgICBpZihyZWFsRXJyb3IgaW5zdGFuY2VvZiBSZXF1ZXN0RXJyb3Ipe1xuICAgICAgICAgICAgc3VwZXIocmVhbEVycm9yLm1lc3NhZ2UsIHJlYWxFcnJvci5jb2RlKVxuICAgICAgICAgICAgdGhpcy5jb3B5T2JqZWN0KHJlYWxFcnJvcilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighY29kZSlcbiAgICAgICAgICAgIGNvZGUgPSA1MDA7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsIGNvZGUpO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IGNvZGU7XG4gICAgICAgIHRoaXMuZXJyb3JMaXN0ID0gW107XG4gICAgICAgIGlmKG1lc3NhZ2UgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgICAgICBmb3IodmFyIGk9MDtpPG1lc3NhZ2UubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckxpc3QucHVzaChtZXNzYWdlW2ldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JMaXN0LnB1c2gobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRyYWNlID0gc3RhY2tUcmFjZS5nZXQoKTtcbiAgICAgICAgdmFyIGNvbnNvbGVNZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgaWYocmVhbEVycm9yKVxuICAgICAgICAgICAgY29uc29sZU1lc3NhZ2UgPSByZWFsRXJyb3I7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1xceDFiWzMxbVJlcXVlc3RFcnJvclxceDFiWzBtJywgJ1xceDFiWzM1bScrdHJhY2VbMV0uZ2V0RmlsZU5hbWUoKS5yZXBsYWNlKF9fZGlybmFtZSwgJycpKydcXHgxYlswbScsICdcXHgxYlszMm0nK3RyYWNlWzFdLmdldExpbmVOdW1iZXIoKSsnOicrdHJhY2VbMV0uZ2V0Q29sdW1uTnVtYmVyKCkrJ1xceDFiWzBtJywgY29uc29sZU1lc3NhZ2UpO1xuICAgIH1cbn07Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFBQSxXQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFBcUMsU0FBQUMsYUFBQUMsT0FBQSxRQUFBQyx5QkFBQSxHQUFBQyx5QkFBQSxvQkFBQUMscUJBQUEsUUFBQUMsS0FBQSxPQUFBQyxnQkFBQSxhQUFBTCxPQUFBLEdBQUFNLE1BQUEsTUFBQUwseUJBQUEsUUFBQU0sU0FBQSxPQUFBRixnQkFBQSxtQkFBQUcsV0FBQSxFQUFBRixNQUFBLEdBQUFHLE9BQUEsQ0FBQUMsU0FBQSxDQUFBTixLQUFBLEVBQUFPLFNBQUEsRUFBQUosU0FBQSxZQUFBRCxNQUFBLEdBQUFGLEtBQUEsQ0FBQVEsS0FBQSxPQUFBRCxTQUFBLGdCQUFBRSwyQkFBQSxtQkFBQVAsTUFBQTtBQUFBLFNBQUFKLDBCQUFBLGVBQUFPLE9BQUEscUJBQUFBLE9BQUEsQ0FBQUMsU0FBQSxvQkFBQUQsT0FBQSxDQUFBQyxTQUFBLENBQUFJLElBQUEsMkJBQUFDLEtBQUEsb0NBQUFDLE9BQUEsQ0FBQUMsU0FBQSxDQUFBQyxPQUFBLENBQUFDLElBQUEsQ0FBQVYsT0FBQSxDQUFBQyxTQUFBLENBQUFNLE9BQUEsOENBQUFJLENBQUE7QUFFckNDLE1BQU0sQ0FBQ0MsWUFBWSwwQkFBQUMsTUFBQTtFQUFBLElBQUFDLFVBQUEsYUFBQUYsWUFBQSxFQUFBQyxNQUFBO0VBQUEsSUFBQUUsTUFBQSxHQUFBMUIsWUFBQSxDQUFBdUIsWUFBQTtFQUtmLFNBQUFBLGFBQVlJLE9BQU8sRUFBRUMsSUFBSSxFQUFFQyxTQUFTLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQUEsSUFBQUMsZ0JBQUEsbUJBQUFSLFlBQUE7SUFDbEMsSUFBR00sU0FBUyxZQUFZTixZQUFZLEVBQUM7TUFDakNPLEtBQUEsR0FBQUosTUFBQSxDQUFBTixJQUFBLE9BQU1TLFNBQVMsQ0FBQ0YsT0FBTyxFQUFFRSxTQUFTLENBQUNELElBQUk7TUFDdkNFLEtBQUEsQ0FBS0UsVUFBVSxDQUFDSCxTQUFTLENBQUM7TUFDMUIsV0FBQWYsMkJBQUEsYUFBQWdCLEtBQUE7SUFDSjtJQUNBLElBQUcsQ0FBQ0YsSUFBSSxFQUNKQSxJQUFJLEdBQUcsR0FBRztJQUNkRSxLQUFBLEdBQUFKLE1BQUEsQ0FBQU4sSUFBQSxPQUFNTyxPQUFPLEVBQUVDLElBQUk7SUFDbkJFLEtBQUEsQ0FBS0csTUFBTSxHQUFHTCxJQUFJO0lBQ2xCRSxLQUFBLENBQUtJLFNBQVMsR0FBRyxFQUFFO0lBQ25CLElBQUdQLE9BQU8sWUFBWVEsS0FBSyxFQUFDO01BQ3hCLEtBQUksSUFBSUMsQ0FBQyxHQUFDLENBQUMsRUFBQ0EsQ0FBQyxHQUFDVCxPQUFPLENBQUNVLE1BQU0sRUFBQ0QsQ0FBQyxFQUFFLEVBQUM7UUFDN0JOLEtBQUEsQ0FBS0ksU0FBUyxDQUFDSSxJQUFJLENBQUNYLE9BQU8sQ0FBQ1MsQ0FBQyxDQUFDLENBQUM7TUFDbkM7SUFDSixDQUFDLE1BQUk7TUFDRE4sS0FBQSxDQUFLSSxTQUFTLENBQUNJLElBQUksQ0FBQ1gsT0FBTyxDQUFDO0lBQ2hDO0lBQ0EsSUFBSVksS0FBSyxHQUFHQyxzQkFBVSxDQUFDQyxHQUFHLENBQUMsQ0FBQztJQUM1QixJQUFJQyxjQUFjLEdBQUdmLE9BQU87SUFDNUIsSUFBR0UsU0FBUyxFQUNSYSxjQUFjLEdBQUdiLFNBQVM7SUFDOUJjLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLDZCQUE2QixFQUFFLFVBQVUsR0FBQ0wsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDTSxXQUFXLENBQUMsQ0FBQyxDQUFDQyxPQUFPLENBQUNDLFNBQVMsRUFBRSxFQUFFLENBQUMsR0FBQyxTQUFTLEVBQUUsVUFBVSxHQUFDUixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUNTLGFBQWEsQ0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFDVCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUNVLGVBQWUsQ0FBQyxDQUFDLEdBQUMsU0FBUyxFQUFFUCxjQUFjLENBQUM7SUFBQyxXQUFBNUIsMkJBQUEsYUFBQWdCLEtBQUE7RUFDbk47RUFBQyxJQUFBb0IsYUFBQSxhQUFBM0IsWUFBQTtJQUFBNEIsR0FBQTtJQUFBQyxLQUFBLEVBM0JELFNBQUFwQixXQUFXcUIsWUFBWSxFQUFFO01BQ3JCLElBQUksQ0FBQ25CLFNBQVMsR0FBR21CLFlBQVksQ0FBQ25CLFNBQVM7SUFDM0M7RUFBQztFQUFBLE9BQUFYLFlBQUE7QUFBQSxvQkFBQStCLGlCQUFBLGFBSDZDQyxLQUFLLEVBNkJ0RCJ9