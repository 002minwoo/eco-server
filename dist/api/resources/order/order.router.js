"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _order = _interopRequireDefault(require("./order.controller"));
var _strategy = require("../../../middleware/strategy");
var _sanitizer = require("../../../middleware/sanitizer");
// import { validateBody, schemas } from '../../../middleware/validator';

var orderRouter = _express["default"].Router();
exports.orderRouter = orderRouter;
orderRouter.route('/create').post(_order["default"].index);
orderRouter.route('/list').get(_order["default"].getAllOrderList);
orderRouter.route('/status/update').post(_order["default"].statusUpdate);
orderRouter.route('/list').post(_order["default"].getAllOrderListById);
orderRouter.route('/status').post(_order["default"].getAllOrderStatus);
orderRouter.route('/count').get(_order["default"].getAllOrderCount);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX29yZGVyIiwiX3N0cmF0ZWd5IiwiX3Nhbml0aXplciIsIm9yZGVyUm91dGVyIiwiZXhwcmVzcyIsIlJvdXRlciIsImV4cG9ydHMiLCJyb3V0ZSIsInBvc3QiLCJvcmRlckNvbnRyb2xsZXIiLCJpbmRleCIsImdldCIsImdldEFsbE9yZGVyTGlzdCIsInN0YXR1c1VwZGF0ZSIsImdldEFsbE9yZGVyTGlzdEJ5SWQiLCJnZXRBbGxPcmRlclN0YXR1cyIsImdldEFsbE9yZGVyQ291bnQiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9vcmRlci9vcmRlci5yb3V0ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgb3JkZXJDb250cm9sbGVyIGZyb20gJy4vb3JkZXIuY29udHJvbGxlcic7XG5pbXBvcnQgeyBqd3RTdHJhdGVneSB9IGZyb20gJy4uLy4uLy4uL21pZGRsZXdhcmUvc3RyYXRlZ3knO1xuaW1wb3J0IHsgc2FuaXRpemUgfSBmcm9tICcuLi8uLi8uLi9taWRkbGV3YXJlL3Nhbml0aXplcic7XG4vLyBpbXBvcnQgeyB2YWxpZGF0ZUJvZHksIHNjaGVtYXMgfSBmcm9tICcuLi8uLi8uLi9taWRkbGV3YXJlL3ZhbGlkYXRvcic7XG5cbmV4cG9ydCBjb25zdCBvcmRlclJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5vcmRlclJvdXRlci5yb3V0ZSgnL2NyZWF0ZScpLnBvc3Qob3JkZXJDb250cm9sbGVyLmluZGV4KTtcbm9yZGVyUm91dGVyLnJvdXRlKCcvbGlzdCcpLmdldChvcmRlckNvbnRyb2xsZXIuZ2V0QWxsT3JkZXJMaXN0KTtcbm9yZGVyUm91dGVyLnJvdXRlKCcvc3RhdHVzL3VwZGF0ZScpLnBvc3Qob3JkZXJDb250cm9sbGVyLnN0YXR1c1VwZGF0ZSk7XG5vcmRlclJvdXRlci5yb3V0ZSgnL2xpc3QnKS5wb3N0KG9yZGVyQ29udHJvbGxlci5nZXRBbGxPcmRlckxpc3RCeUlkKTtcbm9yZGVyUm91dGVyLnJvdXRlKCcvc3RhdHVzJykucG9zdChvcmRlckNvbnRyb2xsZXIuZ2V0QWxsT3JkZXJTdGF0dXMpO1xub3JkZXJSb3V0ZXIucm91dGUoJy9jb3VudCcpLmdldChvcmRlckNvbnRyb2xsZXIuZ2V0QWxsT3JkZXJDb3VudCk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQUFBLFFBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLE1BQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFFLFNBQUEsR0FBQUYsT0FBQTtBQUNBLElBQUFHLFVBQUEsR0FBQUgsT0FBQTtBQUNBOztBQUVPLElBQU1JLFdBQVcsR0FBR0MsbUJBQU8sQ0FBQ0MsTUFBTSxDQUFDLENBQUM7QUFBQ0MsT0FBQSxDQUFBSCxXQUFBLEdBQUFBLFdBQUE7QUFDNUNBLFdBQVcsQ0FBQ0ksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDQyxJQUFJLENBQUNDLGlCQUFlLENBQUNDLEtBQUssQ0FBQztBQUN4RFAsV0FBVyxDQUFDSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUNJLEdBQUcsQ0FBQ0YsaUJBQWUsQ0FBQ0csZUFBZSxDQUFDO0FBQy9EVCxXQUFXLENBQUNJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDQyxJQUFJLENBQUNDLGlCQUFlLENBQUNJLFlBQVksQ0FBQztBQUN0RVYsV0FBVyxDQUFDSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUNDLElBQUksQ0FBQ0MsaUJBQWUsQ0FBQ0ssbUJBQW1CLENBQUM7QUFDcEVYLFdBQVcsQ0FBQ0ksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDQyxJQUFJLENBQUNDLGlCQUFlLENBQUNNLGlCQUFpQixDQUFDO0FBQ3BFWixXQUFXLENBQUNJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQ0ksR0FBRyxDQUFDRixpQkFBZSxDQUFDTyxnQkFBZ0IsQ0FBQyJ9