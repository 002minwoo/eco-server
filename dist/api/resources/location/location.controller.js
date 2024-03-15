"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../../../models");
var _default = {
  /* Add user api start here................................*/index: function index(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _req$body, zipcode, name, status;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, zipcode = _req$body.zipcode, name = _req$body.name, status = _req$body.status;
            _models.db.location.findOne({
              where: {
                name: name
              }
            }).then(function (data) {
              if (data) {
                return _models.db.location.update({
                  zipcode: zipcode,
                  name: name,
                  status: parseInt(status) ? 'active' : 'inactive'
                }, {
                  where: {
                    id: data.id
                  }
                });
              }
              return _models.db.location.create({
                name: name,
                status: parseInt(status) ? 'active' : 'inactive'
              });
            }).then(function (location) {
              res.status(200).json({
                'success': true,
                msg: "Successfully inserted location"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context.next = 8;
            break;
          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 5]]);
    }))();
  },
  List: function List(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _models.db.location.findAll().then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context2.next = 7;
            break;
          case 4:
            _context2.prev = 4;
            _context2.t0 = _context2["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 4]]);
    }))();
  },
  getLocationDelete: function getLocationDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _models.db.location.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (location) {
              if (location) {
                return _models.db.location.destroy({
                  where: {
                    id: location.id
                  }
                });
              }
              throw new RequestError('location is not found');
            }).then(function (re) {
              return res.status(200).json({
                'msg': 'success',
                'status': "deleted location Seccessfully"
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
  },
  getLocationUpdate: function getLocationUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var _req$body2, id, zipcode, name, status;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body2 = req.body, id = _req$body2.id, zipcode = _req$body2.zipcode, name = _req$body2.name, status = _req$body2.status;
            _models.db.location.findOne({
              where: {
                id: parseInt(id)
              }
            }).then(function (location) {
              if (location) {
                return _models.db.location.update({
                  id: id,
                  zipcode: zipcode,
                  name: name,
                  status: parseInt(status) ? 'active' : 'inactive'
                }, {
                  where: {
                    id: location.id
                  }
                });
              }
              throw new RequestError('No data found');
            }).then(function (re) {
              return res.status(200).json({
                'msg': 'success',
                'status': "Update location Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context4.next = 8;
            break;
          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 5]]);
    }))();
  },
  //area list
  areaCreate: function areaCreate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var _req$body3, name, zipcode, locationId, status;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body3 = req.body, name = _req$body3.name, zipcode = _req$body3.zipcode, locationId = _req$body3.locationId, status = _req$body3.status;
            _models.db.area.findOne({
              where: {
                name: name
              }
            }).then(function (data) {
              if (data) {
                return _models.db.area.update({
                  locationId: locationId,
                  zipcode: zipcode,
                  name: name,
                  status: parseInt(status) ? 'active' : 'inactive'
                }, {
                  where: {
                    id: data.id
                  }
                });
              }
              return _models.db.area.create({
                locationId: locationId,
                zipcode: zipcode,
                name: name,
                status: parseInt(status) ? 'active' : 'inactive'
              });
            }).then(function (area) {
              res.status(200).json({
                'success': true,
                msg: "Successfully inserted area"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context5.next = 8;
            break;
          case 5:
            _context5.prev = 5;
            _context5.t0 = _context5["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 5]]);
    }))();
  },
  areaList: function areaList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _models.db.area.findAll({
              include: [{
                model: _models.db.location,
                attributes: ["id", "name"]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context6.next = 7;
            break;
          case 4:
            _context6.prev = 4;
            _context6.t0 = _context6["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 4]]);
    }))();
  },
  getAreaDeleteById: function getAreaDeleteById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _models.db.area.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (area) {
              if (area) {
                return _models.db.area.destroy({
                  where: {
                    id: area.id
                  }
                });
              }
              throw new RequestError('area is not found');
            }).then(function (re) {
              return res.status(200).json({
                'msg': 'success',
                'status': "deleted area Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context7.next = 7;
            break;
          case 4:
            _context7.prev = 4;
            _context7.t0 = _context7["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 4]]);
    }))();
  },
  getAreaUpdate: function getAreaUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var _req$body4, id, zipcode, name, locationId, status;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _req$body4 = req.body, id = _req$body4.id, zipcode = _req$body4.zipcode, name = _req$body4.name, locationId = _req$body4.locationId, status = _req$body4.status;
            _models.db.area.findOne({
              where: {
                id: parseInt(id)
              }
            }).then(function (area) {
              if (area) {
                return _models.db.area.update({
                  zipcode: zipcode,
                  name: name,
                  status: parseInt(status) ? 'active' : 'inactive',
                  locationId: locationId ? locationId : area.locationId
                }, {
                  where: {
                    id: area.id
                  }
                });
              }
              throw new RequestError('No data found');
            }).then(function (re) {
              return res.status(200).json({
                'msg': 'success',
                'status': "Update area Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context8.next = 8;
            break;
          case 5:
            _context8.prev = 5;
            _context8.t0 = _context8["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 5]]);
    }))();
  },
  getAreaList: function getAreaList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _models.db.area.findAll({
              where: {
                locationId: req.query.locationId
              },
              include: [{
                model: _models.db.location,
                attributes: ["id", "name"]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context9.next = 7;
            break;
          case 4:
            _context9.prev = 4;
            _context9.t0 = _context9["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 4]]);
    }))();
  },
  getAreaListById: function getAreaListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _models.db.area.findAll({
              where: {
                locationId: req.query.id
              },
              include: [{
                model: _models.db.location,
                attributes: ["id", "name"]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context10.next = 7;
            break;
          case 4:
            _context10.prev = 4;
            _context10.t0 = _context10["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 4]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9kZWZhdWx0IiwiaW5kZXgiLCJyZXEiLCJyZXMiLCJuZXh0IiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJfcmVxJGJvZHkiLCJ6aXBjb2RlIiwibmFtZSIsInN0YXR1cyIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsImJvZHkiLCJkYiIsImxvY2F0aW9uIiwiZmluZE9uZSIsIndoZXJlIiwidGhlbiIsImRhdGEiLCJ1cGRhdGUiLCJwYXJzZUludCIsImlkIiwiY3JlYXRlIiwianNvbiIsIm1zZyIsImVyciIsInQwIiwiUmVxdWVzdEVycm9yIiwic3RvcCIsIkxpc3QiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImZpbmRBbGwiLCJsaXN0IiwiZ2V0TG9jYXRpb25EZWxldGUiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInF1ZXJ5IiwiZGVzdHJveSIsInJlIiwiZ2V0TG9jYXRpb25VcGRhdGUiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJhcmVhQ3JlYXRlIiwiX2NhbGxlZTUiLCJfcmVxJGJvZHkzIiwibG9jYXRpb25JZCIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsImFyZWEiLCJhcmVhTGlzdCIsIl9jYWxsZWU2IiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiaW5jbHVkZSIsIm1vZGVsIiwiYXR0cmlidXRlcyIsImdldEFyZWFEZWxldGVCeUlkIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJnZXRBcmVhVXBkYXRlIiwiX2NhbGxlZTgiLCJfcmVxJGJvZHk0IiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwiZ2V0QXJlYUxpc3QiLCJfY2FsbGVlOSIsIl9jYWxsZWU5JCIsIl9jb250ZXh0OSIsImdldEFyZWFMaXN0QnlJZCIsIl9jYWxsZWUxMCIsIl9jYWxsZWUxMCQiLCJfY29udGV4dDEwIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2xvY2F0aW9uL2xvY2F0aW9uLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMnO1xuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgLyogQWRkIHVzZXIgYXBpIHN0YXJ0IGhlcmUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiovXG5cbiAgICBhc3luYyBpbmRleChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyB6aXBjb2RlLCBuYW1lLCBzdGF0dXMgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgZGIubG9jYXRpb24uZmluZE9uZSh7IHdoZXJlOiB7IG5hbWU6IG5hbWUgfSB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLmxvY2F0aW9uLnVwZGF0ZSh7IHppcGNvZGU6IHppcGNvZGUsIG5hbWU6bmFtZSAsc3RhdHVzOnBhcnNlSW50KHN0YXR1cyk/J2FjdGl2ZSc6J2luYWN0aXZlJyB9LCB7IHdoZXJlOiB7IGlkOiBkYXRhLmlkIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIubG9jYXRpb24uY3JlYXRlKHsgbmFtZTogbmFtZSwgc3RhdHVzOnBhcnNlSW50KHN0YXR1cyk/J2FjdGl2ZSc6J2luYWN0aXZlJ30pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihsb2NhdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIGxvY2F0aW9uXCIgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIExpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLmxvY2F0aW9uLmZpbmRBbGwoKVxuICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsZGF0YTpsaXN0fSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIGFzeW5jIGdldExvY2F0aW9uRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5sb2NhdGlvbi5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxuICAgICAgICAgICAgLnRoZW4obG9jYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIubG9jYXRpb24uZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBsb2NhdGlvbi5pZCB9IH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ2xvY2F0aW9uIGlzIG5vdCBmb3VuZCcpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7J21zZyc6J3N1Y2Nlc3MnLCdzdGF0dXMnOiBcImRlbGV0ZWQgbG9jYXRpb24gU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGdldExvY2F0aW9uVXBkYXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdHsgaWQsIHppcGNvZGUsIG5hbWUsIHN0YXR1c30gPSByZXEuYm9keVxuICAgICAgICAgICAgZGIubG9jYXRpb24uZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChpZCkgfSB9KVxuICAgICAgICAgICAgLnRoZW4obG9jYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIubG9jYXRpb24udXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZCwgemlwY29kZTogemlwY29kZSwgbmFtZTogbmFtZSwgc3RhdHVzOnBhcnNlSW50KHN0YXR1cyk/J2FjdGl2ZSc6J2luYWN0aXZlJyBcbiAgICAgICAgICAgICAgICAgICAgfSx7d2hlcmU6IHtpZDogbG9jYXRpb24uaWR9fSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignTm8gZGF0YSBmb3VuZCcpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7J21zZyc6J3N1Y2Nlc3MnLCdzdGF0dXMnOiBcIlVwZGF0ZSBsb2NhdGlvbiBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vYXJlYSBsaXN0XG4gICAgYXN5bmMgYXJlYUNyZWF0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBuYW1lLCB6aXBjb2RlLCBsb2NhdGlvbklkLCBzdGF0dXMgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgZGIuYXJlYS5maW5kT25lKHsgd2hlcmU6IHsgbmFtZTogbmFtZSB9IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuYXJlYS51cGRhdGUoeyBsb2NhdGlvbklkOiBsb2NhdGlvbklkLCB6aXBjb2RlOiB6aXBjb2RlLCBuYW1lOm5hbWUgLCBzdGF0dXM6cGFyc2VJbnQoc3RhdHVzKT8nYWN0aXZlJzonaW5hY3RpdmUnIH0sIHsgd2hlcmU6IHsgaWQ6IGRhdGEuaWQgfSB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5hcmVhLmNyZWF0ZSh7IGxvY2F0aW9uSWQ6IGxvY2F0aW9uSWQsIHppcGNvZGU6IHppcGNvZGUsIG5hbWU6IG5hbWUsIHN0YXR1czpwYXJzZUludChzdGF0dXMpPydhY3RpdmUnOidpbmFjdGl2ZSd9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oYXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIGFyZWFcIiB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgYXJlYUxpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLmFyZWEuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmxvY2F0aW9uLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0sIH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsZGF0YTpsaXN0fSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGdldEFyZWFEZWxldGVCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5hcmVhLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAgICAgICAudGhlbihhcmVhID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYXJlYSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuYXJlYS5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IGFyZWEuaWQgfSB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdhcmVhIGlzIG5vdCBmb3VuZCcpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7J21zZyc6J3N1Y2Nlc3MnLCdzdGF0dXMnOiBcImRlbGV0ZWQgYXJlYSBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGdldEFyZWFVcGRhdGUocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0eyBpZCwgemlwY29kZSwgbmFtZSwgbG9jYXRpb25JZCxzdGF0dXN9ID0gcmVxLmJvZHlcbiAgICAgICAgICAgIGRiLmFyZWEuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChpZCkgfSB9KVxuICAgICAgICAgICAgLnRoZW4oYXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZWEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLmFyZWEudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHppcGNvZGU6IHppcGNvZGUsIG5hbWU6IG5hbWUsIHN0YXR1czpwYXJzZUludChzdGF0dXMpPydhY3RpdmUnOidpbmFjdGl2ZScsIGxvY2F0aW9uSWQ6IGxvY2F0aW9uSWQ/IGxvY2F0aW9uSWQ6IGFyZWEubG9jYXRpb25JZCBcbiAgICAgICAgICAgICAgICAgICAgfSx7d2hlcmU6IHtpZDogYXJlYS5pZH19KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdObyBkYXRhIGZvdW5kJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsnbXNnJzonc3VjY2VzcycsJ3N0YXR1cyc6IFwiVXBkYXRlIGFyZWEgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBnZXRBcmVhTGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIuYXJlYS5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBsb2NhdGlvbklkOiByZXEucXVlcnkubG9jYXRpb25JZCB9LFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5sb2NhdGlvbiwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0QXJlYUxpc3RCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5hcmVhLmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGxvY2F0aW9uSWQ6IHJlcS5xdWVyeS5pZCB9LFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5sb2NhdGlvbiwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5l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