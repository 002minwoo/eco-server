"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var Jimp = require("jimp");
var ORIGINAL_IMAGE = __dirname + "/cau-rong-da-nang.jpeg";
var LOGO = __dirname + "/React-icon.svg.png";

//save image name
var FILENAME = "create-project-laravel5_8-using-composer-01.jpg";
var main = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(a) {
    var _yield$Promise$all, _yield$Promise$all2, image, logo, desiredLogoWidth, desiredLogoHeight, logoX, logoY;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Promise.all([Jimp.read(a), Jimp.read(LOGO)]);
        case 2:
          _yield$Promise$all = _context.sent;
          _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
          image = _yield$Promise$all2[0];
          logo = _yield$Promise$all2[1];
          // Resize logo
          desiredLogoWidth = 100; // Độ rộng mong muốn của logo (đơn vị pixel)
          desiredLogoHeight = Jimp.AUTO; // Để tự động tính toán chiều cao dựa trên tỷ lệ của hình ảnh
          logo.resize(desiredLogoWidth, desiredLogoHeight);

          // Tính toán vị trí của logo (ở trên cùng bên phải)
          logoX = image.bitmap.width - logo.bitmap.width - 10; // Độ lệch từ mép phải của hình ảnh
          logoY = 10; // Độ lệch từ mép trên của hình ảnh
          return _context.abrupt("return", image.composite(logo, logoX, logoY, [{
            mode: Jimp.BLEND_SCREEN,
            opacitySource: 0.1,
            opacityDest: 1
          }]));
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function main(_x) {
    return _ref.apply(this, arguments);
  };
}();
main(ORIGINAL_IMAGE).then(function (image) {
  return image.write(FILENAME);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJKaW1wIiwicmVxdWlyZSIsIk9SSUdJTkFMX0lNQUdFIiwiX19kaXJuYW1lIiwiTE9HTyIsIkZJTEVOQU1FIiwibWFpbiIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsImEiLCJfeWllbGQkUHJvbWlzZSRhbGwiLCJfeWllbGQkUHJvbWlzZSRhbGwyIiwiaW1hZ2UiLCJsb2dvIiwiZGVzaXJlZExvZ29XaWR0aCIsImRlc2lyZWRMb2dvSGVpZ2h0IiwibG9nb1giLCJsb2dvWSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJQcm9taXNlIiwiYWxsIiwicmVhZCIsInNlbnQiLCJfc2xpY2VkVG9BcnJheTIiLCJBVVRPIiwicmVzaXplIiwiYml0bWFwIiwid2lkdGgiLCJhYnJ1cHQiLCJjb21wb3NpdGUiLCJtb2RlIiwiQkxFTkRfU0NSRUVOIiwib3BhY2l0eVNvdXJjZSIsIm9wYWNpdHlEZXN0Iiwic3RvcCIsIl94IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ0aGVuIiwid3JpdGUiXSwic291cmNlcyI6WyIuLi9zcmMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEppbXAgPSByZXF1aXJlKFwiamltcFwiKTtcblxuY29uc3QgT1JJR0lOQUxfSU1BR0UgPSBfX2Rpcm5hbWUgKyBcIi9jYXUtcm9uZy1kYS1uYW5nLmpwZWdcIjtcblxuY29uc3QgTE9HTyA9IF9fZGlybmFtZSArIFwiL1JlYWN0LWljb24uc3ZnLnBuZ1wiO1xuXG4vL3NhdmUgaW1hZ2UgbmFtZVxuY29uc3QgRklMRU5BTUUgPSBcImNyZWF0ZS1wcm9qZWN0LWxhcmF2ZWw1XzgtdXNpbmctY29tcG9zZXItMDEuanBnXCI7XG5cbmNvbnN0IG1haW4gPSBhc3luYyAoYSkgPT4ge1xuXG4gICAgY29uc3QgW2ltYWdlLCBsb2dvXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgSmltcC5yZWFkKGEpLFxuICAgICAgICBKaW1wLnJlYWQoTE9HTylcbiAgICBdKTtcblxuICAgIC8vIFJlc2l6ZSBsb2dvXG4gICAgY29uc3QgZGVzaXJlZExvZ29XaWR0aCA9IDEwMDsgLy8gxJDhu5kgcuG7mW5nIG1vbmcgbXXhu5FuIGPhu6dhIGxvZ28gKMSRxqFuIHbhu4sgcGl4ZWwpXG4gICAgY29uc3QgZGVzaXJlZExvZ29IZWlnaHQgPSBKaW1wLkFVVE87IC8vIMSQ4buDIHThu7EgxJHhu5luZyB0w61uaCB0b8OhbiBjaGnhu4F1IGNhbyBk4buxYSB0csOqbiB04bu3IGzhu4cgY+G7p2EgaMOsbmgg4bqjbmhcbiAgICBsb2dvLnJlc2l6ZShkZXNpcmVkTG9nb1dpZHRoLCBkZXNpcmVkTG9nb0hlaWdodCk7XG5cbiAgICAvLyBUw61uaCB0b8OhbiB24buLIHRyw60gY+G7p2EgbG9nbyAo4bufIHRyw6puIGPDuW5nIGLDqm4gcGjhuqNpKVxuICAgIGNvbnN0IGxvZ29YID0gaW1hZ2UuYml0bWFwLndpZHRoIC0gbG9nby5iaXRtYXAud2lkdGggLSAxMDsgLy8gxJDhu5kgbOG7h2NoIHThu6sgbcOpcCBwaOG6o2kgY+G7p2EgaMOsbmgg4bqjbmhcbiAgICBjb25zdCBsb2dvWSA9IDEwOyAvLyDEkOG7mSBs4buHY2ggdOG7qyBtw6lwIHRyw6puIGPhu6dhIGjDrG5oIOG6o25oXG5cbiAgICByZXR1cm4gaW1hZ2UuY29tcG9zaXRlKGxvZ28sIGxvZ29YLCBsb2dvWSwgW1xuICAgICAgICB7XG4gICAgICAgICAgICBtb2RlOiBKaW1wLkJMRU5EX1NDUkVFTixcbiAgICAgICAgICAgIG9wYWNpdHlTb3VyY2U6IDAuMSxcbiAgICAgICAgICAgIG9wYWNpdHlEZXN0OiAxXG4gICAgICAgIH1cbiAgICBdKTtcbn07XG5cbm1haW4oT1JJR0lOQUxfSU1BR0UpLnRoZW4oaW1hZ2UgPT4gaW1hZ2Uud3JpdGUoRklMRU5BTUUpKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBRTVCLElBQU1DLGNBQWMsR0FBR0MsU0FBUyxHQUFHLHdCQUF3QjtBQUUzRCxJQUFNQyxJQUFJLEdBQUdELFNBQVMsR0FBRyxxQkFBcUI7O0FBRTlDO0FBQ0EsSUFBTUUsUUFBUSxHQUFHLGlEQUFpRDtBQUVsRSxJQUFNQyxJQUFJO0VBQUEsSUFBQUMsSUFBQSxPQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLENBQUcsU0FBQUMsUUFBT0MsQ0FBQztJQUFBLElBQUFDLGtCQUFBLEVBQUFDLG1CQUFBLEVBQUFDLEtBQUEsRUFBQUMsSUFBQSxFQUFBQyxnQkFBQSxFQUFBQyxpQkFBQSxFQUFBQyxLQUFBLEVBQUFDLEtBQUE7SUFBQSxPQUFBWCxZQUFBLFlBQUFZLElBQUEsVUFBQUMsU0FBQUMsUUFBQTtNQUFBLGtCQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQUQsUUFBQSxDQUFBRSxJQUFBO1FBQUE7VUFBQUYsUUFBQSxDQUFBRSxJQUFBO1VBQUEsT0FFV0MsT0FBTyxDQUFDQyxHQUFHLENBQUMsQ0FDcEMzQixJQUFJLENBQUM0QixJQUFJLENBQUNoQixDQUFDLENBQUMsRUFDWlosSUFBSSxDQUFDNEIsSUFBSSxDQUFDeEIsSUFBSSxDQUFDLENBQ2xCLENBQUM7UUFBQTtVQUFBUyxrQkFBQSxHQUFBVSxRQUFBLENBQUFNLElBQUE7VUFBQWYsbUJBQUEsT0FBQWdCLGVBQUEsYUFBQWpCLGtCQUFBO1VBSEtFLEtBQUssR0FBQUQsbUJBQUE7VUFBRUUsSUFBSSxHQUFBRixtQkFBQTtVQUtsQjtVQUNNRyxnQkFBZ0IsR0FBRyxHQUFHLEVBQUU7VUFDeEJDLGlCQUFpQixHQUFHbEIsSUFBSSxDQUFDK0IsSUFBSSxFQUFFO1VBQ3JDZixJQUFJLENBQUNnQixNQUFNLENBQUNmLGdCQUFnQixFQUFFQyxpQkFBaUIsQ0FBQzs7VUFFaEQ7VUFDTUMsS0FBSyxHQUFHSixLQUFLLENBQUNrQixNQUFNLENBQUNDLEtBQUssR0FBR2xCLElBQUksQ0FBQ2lCLE1BQU0sQ0FBQ0MsS0FBSyxHQUFHLEVBQUUsRUFBRTtVQUNyRGQsS0FBSyxHQUFHLEVBQUUsRUFBRTtVQUFBLE9BQUFHLFFBQUEsQ0FBQVksTUFBQSxXQUVYcEIsS0FBSyxDQUFDcUIsU0FBUyxDQUFDcEIsSUFBSSxFQUFFRyxLQUFLLEVBQUVDLEtBQUssRUFBRSxDQUN2QztZQUNJaUIsSUFBSSxFQUFFckMsSUFBSSxDQUFDc0MsWUFBWTtZQUN2QkMsYUFBYSxFQUFFLEdBQUc7WUFDbEJDLFdBQVcsRUFBRTtVQUNqQixDQUFDLENBQ0osQ0FBQztRQUFBO1FBQUE7VUFBQSxPQUFBakIsUUFBQSxDQUFBa0IsSUFBQTtNQUFBO0lBQUEsR0FBQTlCLE9BQUE7RUFBQSxDQUNMO0VBQUEsZ0JBdkJLTCxJQUFJQSxDQUFBb0MsRUFBQTtJQUFBLE9BQUFuQyxJQUFBLENBQUFvQyxLQUFBLE9BQUFDLFNBQUE7RUFBQTtBQUFBLEdBdUJUO0FBRUR0QyxJQUFJLENBQUNKLGNBQWMsQ0FBQyxDQUFDMkMsSUFBSSxDQUFDLFVBQUE5QixLQUFLO0VBQUEsT0FBSUEsS0FBSyxDQUFDK0IsS0FBSyxDQUFDekMsUUFBUSxDQUFDO0FBQUEsRUFBQyJ9