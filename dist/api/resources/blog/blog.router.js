"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blogRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _blog = _interopRequireDefault(require("./blog.controller"));
var blogRouter = _express["default"].Router();
exports.blogRouter = blogRouter;
blogRouter.post("/", _blog["default"].addBlog);
blogRouter.put("/", _blog["default"].updateBlog);
blogRouter.get("/s/t", _blog["default"].getListSuggestBlog);
blogRouter.get("/", _blog["default"].getListBlog);
blogRouter.get("/t", _blog["default"].getListBlogCategory);
blogRouter.get("/d", _blog["default"].getBlogDetail);
blogRouter["delete"]("/", _blog["default"].deleteBlog);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2Jsb2ciLCJibG9nUm91dGVyIiwiZXhwcmVzcyIsIlJvdXRlciIsImV4cG9ydHMiLCJwb3N0IiwiYmxvZ0NvbnRyb2xsZXIiLCJhZGRCbG9nIiwicHV0IiwidXBkYXRlQmxvZyIsImdldCIsImdldExpc3RTdWdnZXN0QmxvZyIsImdldExpc3RCbG9nIiwiZ2V0TGlzdEJsb2dDYXRlZ29yeSIsImdldEJsb2dEZXRhaWwiLCJkZWxldGVCbG9nIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvYmxvZy9ibG9nLnJvdXRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiXG5pbXBvcnQgYmxvZ0NvbnRyb2xsZXIgZnJvbSBcIi4vYmxvZy5jb250cm9sbGVyXCI7XG5cblxuZXhwb3J0IGNvbnN0IGJsb2dSb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5ibG9nUm91dGVyLnBvc3QoXCIvXCIsIGJsb2dDb250cm9sbGVyLmFkZEJsb2cpXG5ibG9nUm91dGVyLnB1dChcIi9cIiwgYmxvZ0NvbnRyb2xsZXIudXBkYXRlQmxvZylcbmJsb2dSb3V0ZXIuZ2V0KFwiL3MvdFwiLCBibG9nQ29udHJvbGxlci5nZXRMaXN0U3VnZ2VzdEJsb2cpXG5ibG9nUm91dGVyLmdldChcIi9cIiwgYmxvZ0NvbnRyb2xsZXIuZ2V0TGlzdEJsb2cpXG5ibG9nUm91dGVyLmdldChcIi90XCIsIGJsb2dDb250cm9sbGVyLmdldExpc3RCbG9nQ2F0ZWdvcnkpXG5ibG9nUm91dGVyLmdldChcIi9kXCIsIGJsb2dDb250cm9sbGVyLmdldEJsb2dEZXRhaWwpXG5ibG9nUm91dGVyLmRlbGV0ZShcIi9cIiwgYmxvZ0NvbnRyb2xsZXIuZGVsZXRlQmxvZykiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFBQSxRQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxLQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFHTyxJQUFNRSxVQUFVLEdBQUdDLG1CQUFPLENBQUNDLE1BQU0sQ0FBQyxDQUFDO0FBQUNDLE9BQUEsQ0FBQUgsVUFBQSxHQUFBQSxVQUFBO0FBRTNDQSxVQUFVLENBQUNJLElBQUksQ0FBQyxHQUFHLEVBQUVDLGdCQUFjLENBQUNDLE9BQU8sQ0FBQztBQUM1Q04sVUFBVSxDQUFDTyxHQUFHLENBQUMsR0FBRyxFQUFFRixnQkFBYyxDQUFDRyxVQUFVLENBQUM7QUFDOUNSLFVBQVUsQ0FBQ1MsR0FBRyxDQUFDLE1BQU0sRUFBRUosZ0JBQWMsQ0FBQ0ssa0JBQWtCLENBQUM7QUFDekRWLFVBQVUsQ0FBQ1MsR0FBRyxDQUFDLEdBQUcsRUFBRUosZ0JBQWMsQ0FBQ00sV0FBVyxDQUFDO0FBQy9DWCxVQUFVLENBQUNTLEdBQUcsQ0FBQyxJQUFJLEVBQUVKLGdCQUFjLENBQUNPLG1CQUFtQixDQUFDO0FBQ3hEWixVQUFVLENBQUNTLEdBQUcsQ0FBQyxJQUFJLEVBQUVKLGdCQUFjLENBQUNRLGFBQWEsQ0FBQztBQUNsRGIsVUFBVSxVQUFPLENBQUMsR0FBRyxFQUFFSyxnQkFBYyxDQUFDUyxVQUFVLENBQUMifQ==